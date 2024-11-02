import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current; // Store mountRef.current in a local variable

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 2;

    // Create stars
    const createStar = () => {
      const geometry = new THREE.SphereGeometry(0.01, 24, 24);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    };

    Array(200).fill().forEach(createStar);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement); // Use the local variable here
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default CosmicBackground;
