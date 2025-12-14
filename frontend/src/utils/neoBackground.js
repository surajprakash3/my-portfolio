/*
  Futuristic minimal Three.js background
  - Abstract wireframe lines + subtle particles
  - Neon palette (blue/purple/cyan)
  - Gentle parallax via mouse/touch
  - Responsive + low GPU/CPU
  Usage: const destroy = initNeoBackground(containerEl, { preset: 'corporate' });
*/

export function initNeoBackground(el, opts = {}) {
  const cfg = {
    preset: opts.preset || 'corporate', // 'corporate' | 'cyber' | 'lightweight'
    // Colors in hex
    colors: {
      baseBg: 0x0a0a1a,
      neon1: 0x61dafb, // cyan
      neon2: 0x7c3aed, // purple
      neon3: 0x22d3ee, // light cyan
    },
    gridDensity: opts.gridDensity || 18, // corporate symmetry
    lineCount: opts.lineCount || 160,
    particleCount: opts.particleCount || 450,
    motionSpeed: opts.motionSpeed || 0.08,
    parallax: opts.parallax || 0.04,
    dprCap: opts.dprCap || 1.5,
  };

  if (!el) return () => {};
  const THREE = window.THREE;
  if (!THREE) {
    console.warn('THREE not available (CDN blocked).');
    return () => {};
  }

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, cfg.dprCap);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(el.clientWidth, el.clientHeight);
  renderer.setClearColor(cfg.colors.baseBg, 1);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.zIndex = '0';
  el.prepend(renderer.domElement);

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 22);

  // Lighting (soft ambient)
  const ambient = new THREE.AmbientLight(0xffffff, 0.12);
  scene.add(ambient);

  // Wireframe lines (abstract geometry)
  const lineMaterial = new THREE.LineBasicMaterial({
    color: cfg.colors.neon1,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });

  const lineGeom = new THREE.BufferGeometry();
  const maxSegments = cfg.lineCount * 2; // start + end per segment
  const positions = new Float32Array(maxSegments * 3);
  const speeds = new Float32Array(cfg.lineCount);
  for (let i = 0; i < cfg.lineCount; i++) {
    // Random start/end positions within a cube
    const sx = (Math.random() - 0.5) * 30;
    const sy = (Math.random() - 0.5) * 18;
    const sz = (Math.random() - 0.5) * 20;
    const ex = sx + (Math.random() - 0.5) * 4;
    const ey = sy + (Math.random() - 0.5) * 3;
    const ez = sz + (Math.random() - 0.5) * 4;
    const idx = i * 6;
    positions[idx + 0] = sx; positions[idx + 1] = sy; positions[idx + 2] = sz;
    positions[idx + 3] = ex; positions[idx + 4] = ey; positions[idx + 5] = ez;
    speeds[i] = 0.4 + Math.random() * 0.8;
  }
  lineGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const lineSegments = new THREE.LineSegments(lineGeom, lineMaterial);
  scene.add(lineSegments);

  // Neon accent lines (second color)
  const lineMaterial2 = lineMaterial.clone();
  lineMaterial2.color = new THREE.Color(cfg.colors.neon2);
  const positions2 = positions.slice();
  const lineGeom2 = new THREE.BufferGeometry();
  lineGeom2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
  const lineSegments2 = new THREE.LineSegments(lineGeom2, lineMaterial2);
  lineSegments2.position.z = -2;
  scene.add(lineSegments2);

  // Subtle particles
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(cfg.particleCount * 3);
  const particleSizes = new Float32Array(cfg.particleCount);
  for (let i = 0; i < cfg.particleCount; i++) {
    particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 32;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 22;
    particleSizes[i] = 1 + Math.random() * 2;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: cfg.colors.neon3,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  scene.add(particles);

  // Optional grid for corporate symmetry
  if (cfg.preset === 'corporate') {
    const grid = new THREE.GridHelper(60, cfg.gridDensity, cfg.colors.neon2, cfg.colors.neon1);
    grid.material.transparent = true;
    grid.material.opacity = 0.1;
    grid.position.y = -12;
    scene.add(grid);
  }

  // Motion control
  let mouseX = 0, mouseY = 0;
  const onPointerMove = (e) => {
    const x = (e.clientX || (e.touches && e.touches[0].clientX) || 0) / window.innerWidth;
    const y = (e.clientY || (e.touches && e.touches[0].clientY) || 0) / window.innerHeight;
    mouseX = (x - 0.5) * 2; // [-1, 1]
    mouseY = (y - 0.5) * 2;
  };
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });

  // Resize handling
  const onResize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  // Animation loop
  let rafId = null;
  const animate = () => {
    // Parallax camera
    camera.position.x += (mouseX * cfg.parallax - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * cfg.parallax - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Drift line endpoints for subtle motion
    const pos = lineGeom.attributes.position.array;
    for (let i = 0; i < cfg.lineCount; i++) {
      const idx = i * 6;
      const s = speeds[i] * cfg.motionSpeed;
      pos[idx + 0] += (Math.sin(i + performance.now() * 0.0003) * 0.008) * s;
      pos[idx + 1] += (Math.cos(i + performance.now() * 0.00025) * 0.007) * s;
      pos[idx + 3] += (Math.sin(i * 1.3 + performance.now() * 0.00028) * 0.006) * s;
      pos[idx + 4] += (Math.cos(i * 1.2 + performance.now() * 0.00022) * 0.006) * s;
    }
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom2.attributes.position.needsUpdate = true;

    // Particle twinkle + slow drift
    const p = particleGeom.attributes.position.array;
    for (let i = 0; i < cfg.particleCount; i++) {
      p[i * 3 + 1] += Math.sin(i + performance.now() * 0.0002) * 0.002;
    }
    particleGeom.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };
  animate();

  // Public destroy
  const destroy = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    if (renderer.domElement && renderer.domElement.parentNode === el) {
      el.removeChild(renderer.domElement);
    }
  };

  return destroy;
}
