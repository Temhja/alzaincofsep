/* ============================================
   ZAIN WATER HEATERS - IRAQ
   Main JavaScript
   ============================================ */

'use strict';

// ===================== LOADER =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); }
  }, 2200);
});

// ===================== CUSTOM CURSOR =====================
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .category-card, .product-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'; }
    if (cursorRing) { cursorRing.style.width = '54px'; cursorRing.style.height = '54px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; }
    if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; }
  });
});

// ===================== NAVBAR =====================
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = mobileMenu?.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = mobileMenu?.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = mobileMenu?.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===================== HERO BACKGROUND: THERMAL FLOW =====================
// Replaces the old static gradient slideshow + flat particle dots with:
// 1) Slowly-drifting blurred "heat" blobs (cyan/gold/white) for depth
// 2) Rising ember/steam particles with glow, drifting like heat off a tank
// 3) A soft horizontal scan-line sweep for a "live equipment" feel
(function initHeroBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, DPR;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- Blobs ----
  const BLOB_COLORS = ['rgba(212,175,55,0.20)', 'rgba(255,255,255,0.08)', 'rgba(201,201,209,0.10)', 'rgba(212,175,55,0.12)'];
  class Blob {
    constructor(i) {
      this.baseX = Math.random();
      this.baseY = Math.random();
      this.r = 180 + Math.random() * 220;
      this.color = BLOB_COLORS[i % BLOB_COLORS.length];
      this.speed = 0.04 + Math.random() * 0.05;
      this.angle = Math.random() * Math.PI * 2;
      this.orbit = 60 + Math.random() * 90;
    }
    draw(t) {
      const x = this.baseX * W + Math.cos(t * this.speed + this.angle) * this.orbit;
      const y = this.baseY * H + Math.sin(t * this.speed * 0.8 + this.angle) * this.orbit;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, this.r);
      grd.addColorStop(0, this.color);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }
  }
  const blobs = [0, 1, 2, 3, 4].map(i => new Blob(i));

  // ---- Rising ember particles ----
  let particles = [];
  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 1.6 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = -(Math.random() * 0.6 + 0.15);
      this.opacity = Math.random() * 0.5 + 0.15;
      this.hue = Math.random() > 0.5 ? 45 : 0; // gold or white
      this.sat = this.hue === 45 ? 75 : 0;
      this.light = this.hue === 45 ? 60 : 95;
      this.drift = Math.random() * 0.02;
      this.phase = Math.random() * Math.PI * 2;
    }
    update(t) {
      this.x += this.speedX + Math.sin(t * this.drift + this.phase) * 0.3;
      this.y += this.speedY;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `hsl(${this.hue}, ${this.sat}%, ${this.light}%)`;
      ctx.shadowBlur = 7;
      ctx.shadowColor = `hsl(${this.hue}, ${this.sat}%, ${this.light}%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 85) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 85) * 0.07;
          ctx.strokeStyle = '#d4af37';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  let scanY = 0;
  function drawScanline(t) {
    scanY = (t * 40) % (H + 200) - 100;
    const grd = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    grd.addColorStop(0, 'transparent');
    grd.addColorStop(0.5, 'rgba(212,175,55,0.05)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, scanY - 60, W, 120);
  }

  let start = null;
  function animate(ts) {
    if (!start) start = ts;
    const t = (ts - start) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(10,10,10,1)';
    ctx.fillRect(0, 0, W, H);
    blobs.forEach(b => b.draw(t));
    drawScanline(t);
    particles.forEach(p => { p.update(t); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ===================== SCROLL REVEAL =====================
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(i => obs.observe(i));
})();

// ===================== HERO SLIDER =====================
// 4 ad images, real 16:9. All slides sit in a flex row; the track
// translates horizontally for a real sliding-carousel motion (not a
// crossfade/zoom). Autoplay + arrows + dots + swipe, pauses on
// hover/touch. Drop real images in img/slides/ (see index.html comment).
(function initHeroSlider() {
  const track = document.getElementById('slider-track');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('#slider-dots .slider-dot'));
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 4200;

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  render();

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  nextBtn && nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

  const slider = document.getElementById('hero-slider');
  // Pointer Events (not mouseenter/mouseleave) so real mouse hover pauses
  // autoplay, but a phantom "synthetic mouse" event some mobile browsers
  // fire ~300ms after a touch does NOT - that was killing autoplay
  // permanently after the very first tap (no real mouse ever leaves to
  // resume it). e.pointerType tells them apart reliably.
  slider.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') stopAutoplay(); });
  slider.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') startAutoplay(); });

  // Live drag: the track follows the finger in real time (like a native
  // app carousel), not just a start/end delta check. Velocity decides
  // whether a quick flick advances even with little distance, otherwise
  // it snaps back if the drag didn't pass the distance threshold.
  let dragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let dragStartTime = 0;
  let sliderWidth = 0;

  function onDragStart(clientX) {
    dragging = true;
    dragStartX = clientX;
    dragDeltaX = 0;
    dragStartTime = performance.now();
    sliderWidth = slider.getBoundingClientRect().width || 1;
    track.classList.add('dragging');
    stopAutoplay();
  }
  function onDragMove(clientX) {
    if (!dragging) return;
    dragDeltaX = clientX - dragStartX;
    // Rubber-band resistance past the first/last slide instead of
    // dragging freely into empty space.
    let resisted = dragDeltaX;
    if ((current === 0 && dragDeltaX > 0) || (current === slides.length - 1 && dragDeltaX < 0)) {
      resisted = dragDeltaX * 0.35;
    }
    const percent = (resisted / sliderWidth) * 100;
    track.style.transform = `translateX(calc(-${current * 100}% + ${percent}%))`;
  }
  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('dragging');
    const elapsed = Math.max(performance.now() - dragStartTime, 1);
    const velocity = Math.abs(dragDeltaX) / elapsed; // px/ms
    const passedDistance = Math.abs(dragDeltaX) > sliderWidth * 0.18;
    const passedFlick = velocity > 0.5 && Math.abs(dragDeltaX) > 24;
    if (passedDistance || passedFlick) {
      dragDeltaX > 0 ? prev() : next();
    } else {
      render(); // snap back to the current slide
    }
    startAutoplay();
  }

  slider.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  slider.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), { passive: true });
  slider.addEventListener('touchend', onDragEnd, { passive: true });
  slider.addEventListener('touchcancel', onDragEnd, { passive: true });

  // Mouse drag too (desktop click-and-drag), gated to real mouse only.
  slider.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    onDragStart(e.clientX);
    const onMove = ev => onDragMove(ev.clientX);
    const onUp = () => {
      onDragEnd();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  });

  startAutoplay();
})();

// ===================== HEATER 3D CANVAS (Hero) =====================
(function initHeater3D() {
  const container = document.getElementById('heater-3d-canvas-wrap');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.width = 360; canvas.height = 580;
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let t = 0;

  function drawHeater3D(progress, floatY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const baseY = canvas.height * 0.88 + floatY;
    const tankH = canvas.height * 0.60;
    const tankW = canvas.width * 0.38;
    const topY = baseY - tankH;

    // Global transparency based on progress
    ctx.globalAlpha = progress;

    // ---- GLOW ----
    const grd = ctx.createRadialGradient(cx, baseY - tankH / 2, 20, cx, baseY - tankH / 2, tankW * 1.8);
    grd.addColorStop(0, 'rgba(212,175,55,0.15)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ---- LEGS ----
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.5)';
    ctx.lineWidth = 3;
    const legW = tankW * 0.55;
    // Left leg
    ctx.beginPath(); ctx.moveTo(cx - legW * 0.5, baseY - 8); ctx.lineTo(cx - legW * 0.7, baseY + 40); ctx.stroke();
    // Right leg
    ctx.beginPath(); ctx.moveTo(cx + legW * 0.5, baseY - 8); ctx.lineTo(cx + legW * 0.7, baseY + 40); ctx.stroke();
    // Cross bar
    ctx.beginPath(); ctx.moveTo(cx - legW * 0.7, baseY + 25); ctx.lineTo(cx + legW * 0.7, baseY + 25); ctx.stroke();
    ctx.restore();

    // ---- TANK BODY ----
    // Main cylinder with isometric tilt
    const tiltX = -8; // slight perspective tilt
    ctx.save();

    // Side face (right side darker)
    ctx.beginPath();
    ctx.moveTo(cx + tankW / 2 + tiltX, topY + 20);
    ctx.lineTo(cx + tankW / 2 + tiltX + 14, topY + 30);
    ctx.lineTo(cx + tankW / 2 + 14, baseY - 20);
    ctx.lineTo(cx + tankW / 2, baseY - 10);
    ctx.closePath();
    const sideFill = ctx.createLinearGradient(cx + tankW / 2, topY, cx + tankW / 2 + 14, baseY);
    sideFill.addColorStop(0, 'rgba(0,80,120,0.5)');
    sideFill.addColorStop(1, 'rgba(0,30,60,0.6)');
    ctx.fillStyle = sideFill;
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main front face
    ctx.beginPath();
    ctx.ellipse(cx + tiltX / 2, topY + 22, tankW / 2, 22, 0, 0, Math.PI * 2);
    ctx.moveTo(cx - tankW / 2 + tiltX, topY + 22);
    ctx.lineTo(cx - tankW / 2, baseY - 10);
    ctx.ellipse(cx, baseY - 10, tankW / 2, 18, 0, 0, Math.PI);
    ctx.lineTo(cx + tankW / 2 + tiltX, topY + 22);
    ctx.closePath();

    const bodyGrad = ctx.createLinearGradient(cx - tankW / 2, 0, cx + tankW / 2, 0);
    bodyGrad.addColorStop(0, 'rgba(10, 40, 80, 0.85)');
    bodyGrad.addColorStop(0.35, 'rgba(0, 100, 160, 0.75)');
    bodyGrad.addColorStop(0.65, 'rgba(0, 180, 240, 0.7)');
    bodyGrad.addColorStop(1, 'rgba(10, 40, 80, 0.85)');
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Outline
    ctx.strokeStyle = 'rgba(212,175,55,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Top ellipse cap
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx + tiltX / 2, topY + 22, tankW / 2, 22, 0, 0, Math.PI * 2);
    const topGrad = ctx.createRadialGradient(cx + tiltX / 2, topY + 22, 4, cx + tiltX / 2, topY + 22, tankW / 2);
    topGrad.addColorStop(0, 'rgba(212,175,55,0.5)');
    topGrad.addColorStop(1, 'rgba(0,80,140,0.6)');
    ctx.fillStyle = topGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // ---- TOP PIPE / DOME ----
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.5)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx + tiltX / 2, topY + 2); ctx.lineTo(cx + tiltX / 2, topY - 35); ctx.stroke();
    // Dome top
    ctx.beginPath();
    ctx.arc(cx + tiltX / 2, topY - 35, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212,175,55,0.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // ---- HORIZONTAL RIBS ----
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.25)';
    ctx.lineWidth = 1;
    for (let r = 0; r < 5; r++) {
      const ry = topY + 45 + r * ((tankH - 55) / 5);
      const rw = tankW * 0.5 * (0.96 + Math.sin(r * 0.5) * 0.04);
      ctx.beginPath();
      ctx.ellipse(cx + tiltX * (1 - r / 5), ry, rw, 16, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // ---- CONTROL PANEL ----
    ctx.save();
    const panelW = tankW * 0.45, panelH = 55;
    const panelX = cx - panelW / 2 - 4, panelY = topY + (tankH * 0.25);
    ctx.fillStyle = 'rgba(0,30,60,0.8)';
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.lineWidth = 1;
    ctx.fillRect(panelX, panelY, panelW, panelH);
    ctx.strokeRect(panelX, panelY, panelW, panelH);
    // LED dot
    const ledPulse = 0.5 + 0.5 * Math.sin(t * 3);
    ctx.fillStyle = `rgba(0, 255, 150, ${0.6 + ledPulse * 0.4})`;
    ctx.shadowBlur = 8 * ledPulse;
    ctx.shadowColor = '#00ff96';
    ctx.beginPath();
    ctx.arc(panelX + 14, panelY + 15, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Temp lines
    ctx.strokeStyle = 'rgba(212,175,55,0.3)';
    ctx.lineWidth = 0.8;
    for (let line = 0; line < 3; line++) {
      ctx.beginPath();
      ctx.moveTo(panelX + 8, panelY + 30 + line * 8);
      ctx.lineTo(panelX + panelW - 8, panelY + 30 + line * 8);
      ctx.stroke();
    }
    ctx.restore();

    // ---- BOTTOM PIPE ----
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.45)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - tankW * 0.25, baseY - 10); ctx.lineTo(cx - tankW * 0.25, baseY + 15); ctx.stroke();
    ctx.restore();

    // ---- WATER HEAT AURA ----
    ctx.save();
    const auraR = tankW * 0.7 + Math.sin(t * 2) * 8;
    const aura = ctx.createRadialGradient(cx, baseY - tankH * 0.3, 0, cx, baseY - tankH * 0.3, auraR);
    aura.addColorStop(0, 'transparent');
    aura.addColorStop(0.7, 'transparent');
    aura.addColorStop(0.85, `rgba(212,175,55,${0.04 + Math.sin(t * 1.5) * 0.02})`);
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // ---- SCAN LINE ----
    const scanY = topY + ((t * 60) % (tankH - 40));
    ctx.save();
    ctx.globalAlpha = 0.15;
    const scanGrd = ctx.createLinearGradient(cx - tankW / 2, scanY - 8, cx + tankW / 2, scanY + 8);
    scanGrd.addColorStop(0, 'transparent');
    scanGrd.addColorStop(0.3, 'rgba(212,175,55,0.8)');
    scanGrd.addColorStop(0.7, 'rgba(212,175,55,0.8)');
    scanGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrd;
    ctx.fillRect(cx - tankW / 2 + tiltX, scanY - 2, tankW, 4);
    ctx.restore();

    ctx.globalAlpha = 1;
  }

  let startTime = null;
  function loop(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    t = elapsed;
    const progress = Math.min(1, elapsed / 2.5);
    const floatY = Math.sin(elapsed * 0.8) * 14;
    drawHeater3D(progress, floatY);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// ===================== PRODUCT DATA =====================
// price: set to a number (IQD) once you have real pricing — leave null to show "Price on request".
// image: set to a real product photo path/URL (e.g. 'images/zain-v-50.jpg') — leave null to keep the generated SVG icon.
const PRODUCTS = [
  // ZAIN — Vertical
  { id: 'z-v-50',  brand: 'zain', orientation: 'vertical',   size: 50,  price: null, image: null },
  { id: 'z-v-80',  brand: 'zain', orientation: 'vertical',   size: 80,  price: null, image: null },
  { id: 'z-v-100', brand: 'zain', orientation: 'vertical',   size: 100, price: null, image: null },
  { id: 'z-v-120', brand: 'zain', orientation: 'vertical',   size: 120, price: null, image: null },
  { id: 'z-v-160', brand: 'zain', orientation: 'vertical',   size: 160, price: null, image: null },
  { id: 'z-v-200', brand: 'zain', orientation: 'vertical',   size: 200, price: null, image: null },
  { id: 'z-v-250', brand: 'zain', orientation: 'vertical',   size: 250, price: null, image: null },
  // ZAIN — Horizontal (wall)
  { id: 'z-h-50',  brand: 'zain', orientation: 'horizontal', size: 50,  price: null, image: null },
  { id: 'z-h-80',  brand: 'zain', orientation: 'horizontal', size: 80,  price: null, image: null },
  { id: 'z-h-100', brand: 'zain', orientation: 'horizontal', size: 100, price: null, image: null },
  // { id: 'z-h-120', brand: 'zain', orientation: 'horizontal', size: 120, price: null, image: null },
  // { id: 'z-h-160', brand: 'zain', orientation: 'horizontal', size: 160, price: null, image: null },
  // { id: 'z-h-200', brand: 'zain', orientation: 'horizontal', size: 200, price: null, image: null },
  // { id: 'z-h-250', brand: 'zain', orientation: 'horizontal', size: 250, price: null, image: null },
  // GROHEE — Vertical
  { id: 'g-v-50',  brand: 'grohee', orientation: 'vertical',  size: 50,  price: null, image: null },
  { id: 'g-v-80',  brand: 'grohee', orientation: 'vertical',  size: 80,  price: null, image: null },
  { id: 'g-v-100', brand: 'grohee', orientation: 'vertical',  size: 100, price: null, image: null },
  // GROHEE — Horizontal
  { id: 'g-h-50',  brand: 'grohee', orientation: 'horizontal', size: 50,  price: null, image: null },
  { id: 'g-h-80',  brand: 'grohee', orientation: 'horizontal', size: 80,  price: null, image: null },
  { id: 'g-h-100', brand: 'grohee', orientation: 'horizontal', size: 100, price: null, image: null },
  // GROHEE — Ceiling
  { id: 'g-c-50',  brand: 'grohee', orientation: 'ceiling', size: 50,  price: null, image: null },
  // { id: 'g-c-80',  brand: 'grohee', orientation: 'ceiling', size: 80,  price: null, image: null },
  // { id: 'g-c-100', brand: 'grohee', orientation: 'ceiling', size: 100, price: null, image: null },
];

// Derives translated display name / type / features from the current language
function productMeta(p) {
  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
  const brandName = BRAND_NAME[lang][p.brand];
  const type = BRAND_TYPE[lang][p.brand];
  const orientLabel = ORIENT_LABEL[lang][p.orientation];
  const mountLabel = MOUNT_LABEL[lang][p.orientation];
  const featureSet = (FEATURE_SETS[p.brand][p.orientation] || FEATURE_SETS[p.brand].vertical)[lang];
  const name = lang === 'en'
    ? `${brandName} ${orientLabel} ${p.size}L`
    : `${brandName} ${orientLabel} ${p.size} ${I18N[lang].litre}`;
  return { brandName, type, orientLabel, mountLabel, features: featureSet, name };
}

function formatPrice(p) {
  if (p.price === null || p.price === undefined) return t('price_on_request');
  return `${p.price.toLocaleString()} ${currentLang === 'en' ? 'IQD' : 'د.ع'}`;
}

// ===================== BUILD PRODUCT CARDS =====================
function buildProductCards() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PRODUCTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `product-card reveal reveal-delay-${(i % 4) + 1}`;
    card.dataset.brand = p.brand;
    card.dataset.orientation = p.orientation;
    card.dataset.size = p.size;

    const meta = productMeta(p);
    // Real photo if provided, otherwise the generated SVG icon
    // const visual = p.image
    //   ? `<img src="${p.image}" alt="${meta.name}" loading="lazy"/>`
    //   : `<div class="img-heater">${buildHeaterSVG(p.brand, p.orientation, p.size)}</div>`;
    const visual = `<img src="img/${p.brand}/${p.brand}-${p.orientation}-${p.size}.png" class="img-heater" alt="${meta.name}" loading="lazy"/>`;

    card.innerHTML = `
      <div class="product-img-wrap">
        <div class="product-img-bg"></div>
        ${visual}
        <div class="product-badge badge-${p.brand}">${meta.brandName}</div>
        <div class="orientation-badge">${meta.orientLabel}</div>
      </div>
      <div class="product-info">
        <div class="product-brand brand-${p.brand}">● ${meta.brandName} — ${meta.type}</div>
        <div class="product-name">${meta.name}</div>
        <div class="product-specs">
          <div class="spec"><span class="spec-label">${t('spec_capacity')}</span><span class="spec-value">${p.size}L</span></div>
          <div class="spec"><span class="spec-label">${t('spec_type')}</span><span class="spec-value">${meta.type}</span></div>
          <div class="spec"><span class="spec-label">${t('spec_mount')}</span><span class="spec-value">${meta.mountLabel}</span></div>
        </div>
        <div class="product-price">${formatPrice(p)}</div>
      </div>
      <div class="product-card-footer">
        <button class="product-detail-btn" data-id="${p.id}">${t('view_details')} <span class="arrow">→</span></button>
      </div>
    `;

    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });

  // Re-init scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===================== SVG HEATER RENDERER =====================
function buildHeaterSVG(brand, orientation, size) {
  const color = brand === 'zain' ? '#d4af37' : '#c9c9d1';
  const darkColor = brand === 'zain' ? '#004070' : '#005040';

  if (orientation === 'vertical') {
    return `<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" style="width:80px;height:140px">
      <defs>
        <linearGradient id="vg_${brand}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${darkColor}" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${darkColor}" stop-opacity="0.9"/>
        </linearGradient>
        <radialGradient id="vt_${brand}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${darkColor}" stop-opacity="0.7"/>
        </radialGradient>
        <filter id="glow_v_${brand}">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Legs -->
      <line x1="38" y1="138" x2="30" y2="155" stroke="${color}" stroke-width="2.5" opacity="0.6" stroke-linecap="round"/>
      <line x1="62" y1="138" x2="70" y2="155" stroke="${color}" stroke-width="2.5" opacity="0.6" stroke-linecap="round"/>
      <line x1="30" y1="150" x2="70" y2="150" stroke="${color}" stroke-width="2" opacity="0.5"/>
      <!-- Body -->
      <rect x="22" y="28" width="56" height="110" rx="28" fill="url(#vg_${brand})" stroke="${color}" stroke-width="1.2" opacity="0.85" filter="url(#glow_v_${brand})"/>
      <!-- Ribs -->
      <ellipse cx="50" cy="55" rx="27" ry="5" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.35"/>
      <ellipse cx="50" cy="80" rx="27" ry="5" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.35"/>
      <ellipse cx="50" cy="105" rx="27" ry="5" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.35"/>
      <!-- Top cap -->
      <ellipse cx="50" cy="28" rx="28" ry="10" fill="url(#vt_${brand})" stroke="${color}" stroke-width="1" opacity="0.8"/>
      <!-- Top pipe -->
      <line x1="50" y1="18" x2="50" y2="5" stroke="${color}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
      <circle cx="50" cy="5" r="5" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="1"/>
      <!-- Panel -->
      <rect x="34" y="58" width="32" height="28" rx="2" fill="rgba(0,0,0,0.7)" stroke="${color}" stroke-width="0.8" opacity="0.8"/>
      <circle cx="42" cy="66" r="3" fill="${color}" opacity="0.8"/>
      <line x1="36" y1="74" x2="64" y2="74" stroke="${color}" stroke-width="0.7" opacity="0.4"/>
      <line x1="36" y1="79" x2="64" y2="79" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <!-- Size label -->
      <text x="50" y="120" text-anchor="middle" font-size="11" fill="${color}" opacity="0.9" font-family="Rajdhani,sans-serif" font-weight="700">${size}L</text>
    </svg>`;
  }

  if (orientation === 'horizontal') {
    return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" style="width:140px;height:80px">
      <defs>
        <linearGradient id="hg_${brand}${size}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.4"/>
          <stop offset="50%" stop-color="${darkColor}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${darkColor}" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <!-- Wall brackets -->
      <rect x="18" y="20" width="8" height="20" rx="2" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="0.8"/>
      <rect x="174" y="20" width="8" height="20" rx="2" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="0.8"/>
      <!-- Body -->
      <rect x="25" y="18" width="150" height="55" rx="27" fill="url(#hg_${brand}${size})" stroke="${color}" stroke-width="1.2" opacity="0.9"/>
      <!-- Side caps -->
      <ellipse cx="25" cy="45" rx="9" ry="27" fill="${darkColor}" opacity="0.7" stroke="${color}" stroke-width="1"/>
      <ellipse cx="175" cy="45" rx="9" ry="27" fill="${darkColor}" opacity="0.7" stroke="${color}" stroke-width="1"/>
      <!-- Ribs -->
      <line x1="70" y1="20" x2="70" y2="73" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="100" y1="18" x2="100" y2="73" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="130" y1="20" x2="130" y2="73" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <!-- Panel -->
      <rect x="78" y="28" width="44" height="28" rx="2" fill="rgba(0,0,0,0.7)" stroke="${color}" stroke-width="0.8" opacity="0.85"/>
      <circle cx="89" cy="36" r="3" fill="${color}" opacity="0.8"/>
      <!-- Size label -->
      <text x="100" y="58" text-anchor="middle" font-size="10" fill="${color}" opacity="0.9" font-family="Rajdhani,sans-serif" font-weight="700">${size}L</text>
      <!-- Pipes -->
      <line x1="50" y1="73" x2="50" y2="85" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      <line x1="150" y1="73" x2="150" y2="85" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    </svg>`;
  }

  // Ceiling
  return `<svg viewBox="0 0 100 170" xmlns="http://www.w3.org/2000/svg" style="width:70px;height:120px">
    <defs>
      <linearGradient id="cg_${brand}${size}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${darkColor}" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="${color}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${darkColor}" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <!-- Ceiling mount -->
    <rect x="35" y="2" width="30" height="10" rx="3" fill="${color}" opacity="0.4" stroke="${color}" stroke-width="0.8"/>
    <!-- Hanging chain/pipe -->
    <line x1="50" y1="12" x2="50" y2="28" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.7" stroke-dasharray="3,3"/>
    <!-- Body -->
    <rect x="16" y="28" width="68" height="120" rx="34" fill="url(#cg_${brand}${size})" stroke="${color}" stroke-width="1.2" opacity="0.88"/>
    <!-- Caps -->
    <ellipse cx="50" cy="28" rx="34" ry="11" fill="${darkColor}" opacity="0.8" stroke="${color}" stroke-width="1"/>
    <ellipse cx="50" cy="148" rx="34" ry="11" fill="${darkColor}" opacity="0.8" stroke="${color}" stroke-width="1"/>
    <!-- Ribs -->
    <ellipse cx="50" cy="60" rx="33" ry="6" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
    <ellipse cx="50" cy="88" rx="33" ry="6" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
    <ellipse cx="50" cy="116" rx="33" ry="6" fill="none" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
    <!-- Panel -->
    <rect x="32" y="62" width="36" height="30" rx="2" fill="rgba(0,0,0,0.75)" stroke="${color}" stroke-width="0.8"/>
    <circle cx="41" cy="71" r="3" fill="${color}" opacity="0.8"/>
    <text x="50" y="126" text-anchor="middle" font-size="11" fill="${color}" opacity="0.9" font-family="Rajdhani,sans-serif" font-weight="700">${size}L</text>
  </svg>`;
}

// ===================== LOCATIONS =====================
// Fill in real branches here. Each location needs a name + address translated per language, plus a real phone number.
// Duplicate the object below for every additional showroom/branch.
const LOCATIONS = [
  {
    name: { en: 'Baghdad Main Showroom', ar: 'صالة بغداد الرئيسية', ku: 'شوورومی سەرەکی بەغدا' },
    address: { en: 'Baghdad, Iraq — campsarah', ar: 'بغداد، العراق — كمب سارة مجمع المال التجاري', ku: 'بەغدا، عێراق — كمب سارة مجمع المال التجاري' },
    phone: '+964 783 789 9973',
    hours: { en: 'Sat–Thu: 8:00 AM – 6:00 PM', ar: 'السبت–الخميس: 8:00ص – 6:00م', ku: 'شەممە–پێنجشەممە: 8:00ی بەیانی – 6:00ی ئێوارە' },
    comingSoon: false,
  },
  {
    // Matches the "New branch coming soon — Baghdad, Karkh" post. Fill in the exact address/phone once confirmed.
    name: { en: 'alameriya — Baghdad, Karkh', ar: 'العامرية — بغداد، الكرخ', ku: 'العامرية — بەغدا، کەرخ' },
    address: { en: 'Baghdad, Karkh — alameriya', ar: 'بغداد، الكرخ — كمب سارة مجمع المال التجاري', ku: 'بەغدا، کەرخ — كمب سارة مجمع المال التجاري' },
    phone: '+964 783 789 9973',
    hours: { en: 'Opening soon', ar: 'الافتتاح قريباً', ku: 'بەم زووانە دەکرێتەوە' },
    comingSoon: true,
  },
];

function renderLocations() {
  const grid = document.getElementById('locations-grid');
  if (!grid) return;
  grid.innerHTML = LOCATIONS.map(loc => `
    <div class="location-card reveal">
      ${loc.comingSoon ? `<div class="coming-soon-badge">${t('coming_soon')}</div>` : ''}
      <div class="contact-item">
        <div class="contact-icon">📍</div>
        <div class="contact-text">
          <h4>${loc.name[currentLang]}</h4>
          <p>${loc.address[currentLang]}</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">📞</div>
        <div class="contact-text">
          <h4>${t('loc_phone')}</h4>
          <p><a href="tel:${loc.phone.replace(/\s+/g, '')}" class="location-phone-link">${loc.phone}</a></p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">⏰</div>
        <div class="contact-text">
          <h4>${t('loc_hours')}</h4>
          <p>${loc.hours[currentLang]}</p>
        </div>
      </div>
    </div>
  `).join('');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===================== WHATSAPP FLOATING BUTTON =====================
// Real number from the Location section. Change here if the business
// WhatsApp line differs from the showroom phone number.
const WHATSAPP_NUMBER = '9647837899973';

function updateWhatsAppLink() {
  const fab = document.getElementById('whatsapp-fab');
  if (!fab) return;
  const message = encodeURIComponent(t('whatsapp_message'));
  fab.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ===================== CATEGORY "STARTING FROM" PRICING =====================
// Set these once you have real starting prices per line (in IQD). Leave null for "Price on request".
const PRICE_FROM = { zain: null, grohee: null };

function formatPriceFrom(brand) {
  const val = PRICE_FROM[brand];
  if (val === null || val === undefined) return t('price_on_request');
  return `${t('price_starts_from')} ${val.toLocaleString()} ${currentLang === 'en' ? 'IQD' : 'د.ع'}`;
}

function renderCategoryPrices() {
  const zainEl = document.getElementById('cat1-price-from');
  const groheeEl = document.getElementById('cat2-price-from');
  if (zainEl) zainEl.textContent = formatPriceFrom('zain');
  if (groheeEl) groheeEl.textContent = formatPriceFrom('grohee');
}

// ===================== FILTER =====================
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active', 'grohee-active'));
      btn.classList.add('active');

      const f = btn.dataset.filter;
      document.querySelectorAll('.product-card').forEach(card => {
        let show = true;
        if (f === 'zain') show = card.dataset.brand === 'zain';
        else if (f === 'grohee') show = card.dataset.brand === 'grohee';
        else if (f === 'vertical') show = card.dataset.orientation === 'vertical';
        else if (f === 'horizontal') show = card.dataset.orientation === 'horizontal';
        else if (f === 'ceiling') show = card.dataset.orientation === 'ceiling';
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ===================== MODAL =====================
let modalCanvasAnim = null;

function openModal(p) {
  const modal = document.getElementById('product-modal');
  const overlay = document.getElementById('modal-overlay');
  if (!modal || !overlay) return;

  const color = p.brand === 'zain' ? '#d4af37' : '#c9c9d1';
  const meta = productMeta(p);

  modal.querySelector('.modal-brand').style.color = color;
  modal.querySelector('.modal-brand').textContent = `⬡ ${meta.brandName} — ${meta.type}`;
  modal.querySelector('.modal-title').textContent = meta.name;
  modal.querySelector('.modal-price').textContent = formatPrice(p);
  modal.querySelector('.modal-price').style.color = color;

  const specsEl = modal.querySelector('.modal-specs-grid');
  specsEl.innerHTML = `
    <div class="modal-spec-item"><div class="modal-spec-label">${t('spec_capacity')}</div><div class="modal-spec-value" style="color:${color}">${p.size} ${t('litre')}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">${t('spec_type')}</div><div class="modal-spec-value">${meta.type}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">${t('spec_mounting')}</div><div class="modal-spec-value">${meta.orientLabel}</div></div>
    <div class="modal-spec-item"><div class="modal-spec-label">${t('spec_brand')}</div><div class="modal-spec-value">${meta.brandName}</div></div>
  `;

  const featuresEl = modal.querySelector('.modal-features');
  featuresEl.innerHTML = meta.features.map(f => `
    <div class="modal-feature-item">
      <div class="feature-dot feature-dot-${p.brand}"></div>
      <span>${f}</span>
    </div>
  `).join('');

  // Render real photo if provided, otherwise the big 3D SVG heater
  // const visEl = modal.querySelector('.modal-visual');
  // if (p.image) {
  //   visEl.innerHTML = `<img src="${p.image}" alt="${meta.name}" style="width:100%;height:100%;object-fit:cover;"/><div class="modal-glow"></div>`;
  // } else {
  //   visEl.innerHTML = `<div id="modal-heater-canvas" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:20px"></div><div class="modal-glow"></div>`;
  //   const wrap = document.getElementById('modal-heater-canvas');
  //   wrap.innerHTML = buildHeaterSVGLarge(p.brand, p.orientation, p.size);
  // }
  const visEl = modal.querySelector('.modal-visual');
  const imgSrc = `img/${p.brand}/${p.brand}-${p.orientation}-${p.size}.png`;
  visEl.innerHTML = `<img src="${imgSrc}" alt="${meta.name}" style="width:100%;height:100%;object-fit:contain;"/><div class="modal-glow"></div>`;

  const visitBtn = modal.querySelector('.modal-cta .btn-primary');
  const backBtn = modal.querySelector('.modal-cta .btn-secondary');
  if (visitBtn) visitBtn.textContent = '📍 ' + t('modal_visit');
  if (backBtn) backBtn.textContent = '← ' + t('modal_back');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildHeaterSVGLarge(brand, orientation, size) {
  const color = brand === 'zain' ? '#d4af37' : '#c9c9d1';
  const dark = brand === 'zain' ? '#003050' : '#003830';

  if (orientation === 'vertical') {
    return `<svg viewBox="0 0 140 240" xmlns="http://www.w3.org/2000/svg" style="width:140px;height:240px;animation:heaterFloat 4s ease-in-out infinite;filter:drop-shadow(0 20px 40px ${color}55)">
      <defs>
        <linearGradient id="mlvg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${dark}" stop-opacity="0.95"/>
          <stop offset="40%" stop-color="${color}" stop-opacity="0.4"/>
          <stop offset="60%" stop-color="${color}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="mlvt" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.65"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.8"/>
        </radialGradient>
      </defs>
      <line x1="54" y1="208" x2="42" y2="232" stroke="${color}" stroke-width="3.5" opacity="0.6" stroke-linecap="round"/>
      <line x1="86" y1="208" x2="98" y2="232" stroke="${color}" stroke-width="3.5" opacity="0.6" stroke-linecap="round"/>
      <line x1="40" y1="224" x2="100" y2="224" stroke="${color}" stroke-width="2.5" opacity="0.5"/>
      <rect x="28" y="38" width="84" height="170" rx="42" fill="url(#mlvg)" stroke="${color}" stroke-width="1.8" opacity="0.92"/>
      <ellipse cx="70" cy="78" rx="41" ry="7" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
      <ellipse cx="70" cy="118" rx="41" ry="7" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
      <ellipse cx="70" cy="158" rx="41" ry="7" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
      <ellipse cx="70" cy="38" rx="42" ry="15" fill="url(#mlvt)" stroke="${color}" stroke-width="1.5" opacity="0.88"/>
      <line x1="70" y1="23" x2="70" y2="6" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
      <circle cx="70" cy="6" r="8" fill="${color}" opacity="0.25" stroke="${color}" stroke-width="1.5"/>
      <rect x="46" y="86" width="48" height="44" rx="3" fill="rgba(0,0,0,0.8)" stroke="${color}" stroke-width="1.2" opacity="0.9"/>
      <circle cx="58" cy="100" r="5" fill="${color}" opacity="0.85"/>
      <line x1="49" y1="112" x2="93" y2="112" stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="49" y1="120" x2="93" y2="120" stroke="${color}" stroke-width="1" opacity="0.3"/>
      <text x="70" y="186" text-anchor="middle" font-size="16" fill="${color}" opacity="0.95" font-family="Bebas Neue,sans-serif" letter-spacing="1">${size}L</text>
      <line x1="46" y1="208" x2="46" y2="220" stroke="${color}" stroke-width="4.5" stroke-linecap="round" opacity="0.55"/>
    </svg>`;
  }

  if (orientation === 'horizontal') {
    return `<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg" style="width:240px;height:120px;animation:heaterFloat 4s ease-in-out infinite;filter:drop-shadow(0 15px 35px ${color}55)">
      <defs>
        <linearGradient id="mlhg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="${dark}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect x="22" y="28" width="14" height="26" rx="3" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="1"/>
      <rect x="244" y="28" width="14" height="26" rx="3" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="1"/>
      <rect x="34" y="22" width="212" height="78" rx="39" fill="url(#mlhg)" stroke="${color}" stroke-width="1.8" opacity="0.92"/>
      <ellipse cx="34" cy="61" rx="14" ry="39" fill="${dark}" opacity="0.8" stroke="${color}" stroke-width="1.2"/>
      <ellipse cx="246" cy="61" rx="14" ry="39" fill="${dark}" opacity="0.8" stroke="${color}" stroke-width="1.2"/>
      <line x1="100" y1="24" x2="100" y2="99" stroke="${color}" stroke-width="1" opacity="0.25"/>
      <line x1="140" y1="22" x2="140" y2="100" stroke="${color}" stroke-width="1" opacity="0.25"/>
      <line x1="180" y1="24" x2="180" y2="99" stroke="${color}" stroke-width="1" opacity="0.25"/>
      <rect x="110" y="38" width="60" height="40" rx="3" fill="rgba(0,0,0,0.8)" stroke="${color}" stroke-width="1.2" opacity="0.9"/>
      <circle cx="124" cy="52" r="5" fill="${color}" opacity="0.85"/>
      <line x1="112" y1="66" x2="168" y2="66" stroke="${color}" stroke-width="1" opacity="0.35"/>
      <text x="140" y="86" text-anchor="middle" font-size="13" fill="${color}" opacity="0.95" font-family="Bebas Neue,sans-serif" letter-spacing="1">${size}L</text>
      <line x1="70" y1="100" x2="70" y2="118" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
      <line x1="210" y1="100" x2="210" y2="118" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
    </svg>`;
  }

  return `<svg viewBox="0 0 140 230" xmlns="http://www.w3.org/2000/svg" style="width:120px;height:210px;animation:heaterFloat 4s ease-in-out infinite;filter:drop-shadow(0 20px 40px ${color}55)">
    <defs>
      <linearGradient id="mlcg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${dark}" stop-opacity="0.95"/>
        <stop offset="50%" stop-color="${color}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${dark}" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect x="46" y="2" width="48" height="14" rx="5" fill="${color}" opacity="0.4" stroke="${color}" stroke-width="1"/>
    <line x1="70" y1="16" x2="70" y2="38" stroke="${color}" stroke-width="3.5" stroke-linecap="round" opacity="0.7" stroke-dasharray="5,4"/>
    <rect x="20" y="38" width="100" height="168" rx="50" fill="url(#mlcg)" stroke="${color}" stroke-width="1.8" opacity="0.9"/>
    <ellipse cx="70" cy="38" rx="50" ry="16" fill="${dark}" opacity="0.8" stroke="${color}" stroke-width="1.2"/>
    <ellipse cx="70" cy="206" rx="50" ry="16" fill="${dark}" opacity="0.8" stroke="${color}" stroke-width="1.2"/>
    <ellipse cx="70" cy="86" rx="48" ry="9" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
    <ellipse cx="70" cy="122" rx="48" ry="9" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
    <ellipse cx="70" cy="158" rx="48" ry="9" fill="none" stroke="${color}" stroke-width="1" opacity="0.3"/>
    <rect x="46" y="92" width="48" height="44" rx="3" fill="rgba(0,0,0,0.8)" stroke="${color}" stroke-width="1.2" opacity="0.9"/>
    <circle cx="58" cy="106" r="5" fill="${color}" opacity="0.85"/>
    <text x="70" y="172" text-anchor="middle" font-size="14" fill="${color}" opacity="0.95" font-family="Bebas Neue,sans-serif" letter-spacing="1">${size}L</text>
  </svg>`;
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

// ===================== COUNTER ANIMATION =====================
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 25);
  });
}

const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
}, { threshold: 0.3 });
const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObs.observe(statsSection);

// ===================== CATEGORY SCROLL =====================
document.querySelectorAll('[data-scroll-to]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(el.dataset.scrollTo);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    // Activate filter if specified
    const filter = el.dataset.filter;
    if (filter) {
      const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
      if (btn) { btn.click(); }
    }
  });
});

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  buildProductCards();
  renderLocations();
  renderCategoryPrices();
  updateWhatsAppLink();
  initFilters();

  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
