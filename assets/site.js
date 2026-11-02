(function () {
  var c = window.KASYA || {};
  document.querySelectorAll("[data-version]").forEach(function (e) { e.textContent = c.version; });
  document.querySelectorAll("[data-size]").forEach(function (e) { e.textContent = c.size; });
  document.querySelectorAll("[data-sha]").forEach(function (e) { e.textContent = c.sha256; });
  ["download-btn-2"].forEach(function (id) {
    var a = document.getElementById(id);
    if (a) { a.href = c.apkUrl; a.setAttribute("download", ""); }
  });
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // QR: drawn locally from the APK link, no external service involved.
  var canvas = document.getElementById("qr");
  var fb = document.getElementById("qr-fallback");
  if (canvas && typeof qrcode === "function") {
    var qr = qrcode(0, "M");
    qr.addData(c.apkUrl);
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
})();
