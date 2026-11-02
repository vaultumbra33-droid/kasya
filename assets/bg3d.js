// Fondo 3D: red de nodos P2P en rotación lenta + cubo de malla (marca). Canvas 2D, sin dependencias.
(function () {
  var cv = document.createElement('canvas');
  cv.id = 'bg3d'; cv.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(cv, document.body.firstChild);
  var ctx = cv.getContext('2d'); if (!ctx) return;
  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var W, H, dpr, nodes = [], rot = 0, mx = 0, my = 0, tx = 0, ty = 0, raf = 0, color = '56,189,248';
  var CUBE = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  var EDGES = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

  function theme() {
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    color = light ? '10,102,194' : '56,189,248';
  }
  function build() {
    var n = W < 700 ? 38 : 70; nodes = [];
    for (var i = 0; i < n; i++) {
      var u = Math.random() * 2 - 1, a = Math.random() * 6.283, r = 0.55 + Math.random() * 0.55, s = Math.sqrt(1 - u * u);
      nodes.push([r * s * Math.cos(a), r * u, r * s * Math.sin(a)]);
    }
  }
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); build();
  }
  function project(p, ax, ay, scale, cx, cy) {
    var cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);
    var x = p[0] * cosY - p[2] * sinY, z = p[0] * sinY + p[2] * cosY;
    var y = p[1] * cosX - z * sinX; z = p[1] * sinX + z * cosX;
    var f = 2.6 / (2.6 + z);
    return [cx + x * scale * f, cy + y * scale * f, f, z];
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    var sc = Math.min(W, H) * 0.62, cx = W * (W < 700 ? 0.5 : 0.68), cy = H * 0.5 - Math.min(scrollY, H) * 0.12;
    var ay = rot + mx * 0.5, ax = 0.35 + my * 0.3, pts = [], i, j;
    for (i = 0; i < nodes.length; i++) pts.push(project(nodes[i], ax, ay, sc, cx, cy));
    ctx.lineWidth = 1;
    for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) {
      var dx = nodes[i][0] - nodes[j][0], dy = nodes[i][1] - nodes[j][1], dz = nodes[i][2] - nodes[j][2], d = dx * dx + dy * dy + dz * dz;
      if (d < 0.32) {
        ctx.strokeStyle = 'rgba(' + color + ',' + ((1 - d / 0.32) * 0.28 * (pts[i][2] + pts[j][2]) / 2).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[j][0], pts[j][1]); ctx.stroke();
      }
    }
    for (i = 0; i < pts.length; i++) {
      ctx.fillStyle = 'rgba(' + color + ',' + Math.min(0.85, pts[i][2] * 0.55).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(pts[i][0], pts[i][1], 1.2 + pts[i][2] * 1.6, 0, 6.283); ctx.fill();
    }
    var cp = CUBE.map(function (p) { return project([p[0] * 0.38, p[1] * 0.38, p[2] * 0.38], ax + 0.3, -ay * 1.4, sc, cx, cy); });
    ctx.strokeStyle = 'rgba(' + color + ',0.5)'; ctx.lineWidth = 1.4; ctx.beginPath();
    EDGES.forEach(function (e) { ctx.moveTo(cp[e[0]][0], cp[e[0]][1]); ctx.lineTo(cp[e[1]][0], cp[e[1]][1]); });
    ctx.stroke();
  }
  function loop() { rot += 0.0017; frame(); raf = requestAnimationFrame(loop); }
  function start() { if (reduce || raf) return; raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  size(); theme(); frame(); start();
  addEventListener('resize', function () { size(); frame(); });
  addEventListener('pointermove', function (e) { tx = e.clientX / W - 0.5; ty = e.clientY / H - 0.5; }, { passive: true });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  new MutationObserver(function () { theme(); if (!raf) frame(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (reduce) addEventListener('scroll', function () { frame(); }, { passive: true });
})();
