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
