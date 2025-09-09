
"use client";

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Simple noise function to create pseudo-random patterns
const createNoise = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const imageData = ctx.createImageData(512, 512);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.floor(Math.random() * 255);
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  return new THREE.CanvasTexture(canvas);
}


export default function ContactBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  const texture = useMemo(() => createNoise(), []);

  useEffect(() => {
    if (!mountRef.current || !texture) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Planet
    const planetGeometry = new THREE.SphereGeometry(5, 64, 64);
    const planetMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.1,
        roughness: 0.8,
        color: 0x6F00FF, // Base primary color tint
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0) * intensity * 0.5; // Accent color
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const starsCount = 5000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00FFFF, 2, 200); 
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      planet.rotation.y = elapsedTime * 0.1;
      atmosphere.rotation.y = elapsedTime * 0.1;
      stars.rotation.y = -elapsedTime * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      if (mountRef.current) {
        currentMount.removeChild(renderer.domElement);
      }
      planetGeometry.dispose();
      planetMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [texture]);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-40" />;
}
