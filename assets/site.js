(function () {
  var c = window.KASYA || {};
  document.querySelectorAll("[data-version]").forEach(function (e) { e.textContent = c.version; });
  document.querySelectorAll("[data-size]").forEach(function (e) { e.textContent = c.size; });
  document.querySelectorAll("[data-sha]").forEach(function (e) { e.textContent = c.sha256; });
  ["download-btn-2"].forEach(function (id) {
    var a = document.getElementById(id);
    if (a) { a.href = c.apkUrl; a.setAttribute("download", ""); }
  });
  var mb = document.getElementById("menu-btn"), menu = document.getElementById("menu");
  if (mb && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      mb.setAttribute("aria-expanded", open ? "true" : "false");
      mb.textContent = open ? "✕" : "☰";
    };
    mb.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  }
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // QR: drawn locally from the APK link, no external service involved.
  function drawQr(canvas, text, fb) {
    if (canvas && typeof qrcode === "function") {
      var qr = qrcode(0, "M");
      qr.addData(text);
      qr.make();
      var n = qr.getModuleCount(), quiet = 4, size = canvas.width;
      var cell = Math.floor(size / (n + quiet * 2));
      var off = Math.floor((size - cell * n) / 2);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#0b1020";
      for (var r = 0; r < n; r++)
        for (var k = 0; k < n; k++)
          if (qr.isDark(r, k)) ctx.fillRect(off + k * cell, off + r * cell, cell, cell);
    } else if (canvas) {
      canvas.hidden = true;
      if (fb) fb.hidden = false;
    }
  }
  drawQr(document.getElementById("qr"), c.apkUrl, document.getElementById("qr-fallback"));
  var vt = document.getElementById("qr-vt");
  if (vt) drawQr(vt, vt.getAttribute("data-url"));
})();

// Aparicion al hacer scroll
(function () {
  var targets = document.querySelectorAll(
    "main section:not(.hero) h2, main section:not(.hero) .eyebrow, main section:not(.hero) .lead, .card, .journey li, .steps li, .gloss > div, .diagram, .vt, .compare, .chips, .ticks li, h3.sub"
  );
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(function (el) {
    if (el.closest(".hero")) return;
    var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty("--d", Math.min(sibs, 5) * 70 + "ms");
    el.classList.add("reveal");
    io.observe(el);
  });
})();

// Modo oscuro / claro
(function () {
  var btn = document.getElementById("theme-btn");
  if (!btn) return;
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(t) {
    root.setAttribute("data-theme", t);
    btn.textContent = t === "light" ? "☾" : "☀";
    btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    if (meta) meta.setAttribute("content", t === "light" ? "#f4f7fd" : "#0b1020");
    try { localStorage.setItem("kasya-theme", t); } catch (e) {}
  }
  btn.textContent = root.getAttribute("data-theme") === "light" ? "☾" : "☀";
  btn.addEventListener("click", function () {
    apply(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
})();
