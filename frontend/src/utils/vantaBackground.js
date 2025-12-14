// Lightweight wrapper to initialize Vanta NET background
// Returns a Promise resolving to a destroy() function
export function initVantaNet(el, options = {}) {
  if (!el) return Promise.resolve(() => {});

  const ensureScript = (src, id) =>
    new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        const existing = document.getElementById(id);
        if (existing.getAttribute('data-loaded') === 'true') return resolve();
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
      };
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
    });

  const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
  const VANTA_NET_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';

  const config = {
    el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xff3f81, // neon magenta lines (screenshot style)
    backgroundColor: 0x0a0a1a, // deep dark bg
    points: 12.0,
    maxDistance: 24.0,
    spacing: 16.0,
    showDots: true,
    ...options,
  };

  return ensureScript(THREE_CDN, 'threejs-cdn')
    .then(() => ensureScript(VANTA_NET_CDN, 'vanta-net-cdn'))
    .then(() => {
      if (!window.VANTA || !window.VANTA.NET) return () => {};
      const effect = window.VANTA.NET(config);
      return () => {
        try { effect && effect.destroy && effect.destroy(); } catch (_) {}
      };
    })
    .catch(() => Promise.resolve(() => {}));
}
