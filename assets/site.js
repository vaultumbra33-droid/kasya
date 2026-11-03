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

// Capturas de la app: carrusel (se muestra solo si hay en config.js)
(function () {
  var en = document.documentElement.lang === "en", base = document.documentElement.getAttribute("data-base") || "";
  var list = ((window.KASYA && window.KASYA.shots) || []).filter(function (s) { return !(en && s.es_only); });
  var box = document.getElementById("shots"), sec = document.getElementById("capturas");
  if (!box || !sec || !list.length) return;
  var slides = [], dots = [], cur = 0;
  var capOf = function (s, n) { return (n + 1) + ". " + (((en && s.caption_en) || s.caption || "").replace(/^d+.s*/, "")); };
  var altOf = function (s) { return (en && s.alt_en) || s.alt || capOf(s) || "KASYA"; };
  var cap = document.getElementById("shots-cap"), dotBox = document.getElementById("shots-dots");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  list.forEach(function (s, n) {
    var f = document.createElement("figure"); f.className = "shot";
    var i = document.createElement("img"); i.src = base + ((en && s.src_en) || s.src); i.alt = altOf(s); i.loading = "lazy"; i.draggable = false;
    f.appendChild(i); box.appendChild(f); slides.push(f);
    f.addEventListener("click", function () { go(n); });
    var d = document.createElement("button"); d.type = "button"; d.className = "shots-dot"; d.setAttribute("aria-label", (en ? "Screenshot " : "Captura ") + (n + 1));
    d.addEventListener("click", function () { go(n); }); dotBox.appendChild(d); dots.push(d);
  });
  function mark(n) {
    cur = n;
    slides.forEach(function (f, k) { f.classList.toggle("on", k === n); });
    dots.forEach(function (d, k) { d.classList.toggle("on", k === n); d.setAttribute("aria-current", k === n ? "true" : "false"); });
    cap.textContent = capOf(list[n], n);
  }
  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    var f = slides[n];
    box.scrollTo({ left: f.offsetLeft - (box.clientWidth - f.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    mark(n);
  }
  var t;
  box.addEventListener("scroll", function () {
    clearTimeout(t);
    t = setTimeout(function () {
      var mid = box.scrollLeft + box.clientWidth / 2, best = 0, bd = 1e9;
      slides.forEach(function (f, k) { var d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = k; } });
      mark(best);
    }, 60);
  }, { passive: true });
  document.getElementById("shots-prev").addEventListener("click", function () { go(cur - 1); });
  document.getElementById("shots-next").addEventListener("click", function () { go(cur + 1); });
  box.tabIndex = 0;
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
  });
  sec.hidden = false;
  mark(0);
  requestAnimationFrame(function () { box.scrollLeft = 0; go(0); });
})();

// Recordar el idioma elegido con el botón ES / EN
document.querySelectorAll(".lang-btn").forEach(function (a) {
  a.addEventListener("click", function () { try { localStorage.setItem("kasya-lang", a.getAttribute("hreflang")); } catch (e) {} });
});

(function () {
  var box = document.getElementById("changelog"), K = window.KASYA;
  if (!box || !K || !K.changelog) return;
  var en = document.documentElement.lang === "en";
  K.changelog.forEach(function (r, i) {
    var d = document.createElement("details");
    if (i === 0) d.open = true;
    var s = document.createElement("summary");
    s.textContent = "KASYA " + r.version + " · " + r.date + (i === 0 ? (en ? " (latest)" : " (la más reciente)") : "");
    d.appendChild(s);
    var ul = document.createElement("ul");
    (en ? r.en : r.es).forEach(function (t) { var li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    d.appendChild(ul);
    box.appendChild(d);
  });
})();
