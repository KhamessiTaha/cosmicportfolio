import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CosmicBackground from './CosmicBackground';

const HomePage = ({ onNavigate }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Create "planets" as markers for each section
    const createPlanet = (color, position, label) => {
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(...position);
      scene.add(planet);

      // Create a label
      const div = document.createElement('div');
      div.className = 'label';
      div.innerText = label;
      div.style.position = 'absolute';
      document.body.appendChild(div);

      // Track position to adjust label
      planet.userData.label = div;
      return planet;
    };

    const planets = [
      createPlanet(0x3498db, [-15, 0, 0], 'About'),
      createPlanet(0xe74c3c, [15, 0, 0], 'Projects'),
      createPlanet(0xf1c40f, [0, 15, 0], 'Skills'),
      createPlanet(0x9b59b6, [0, -15, 0], 'Contact'),
    ];

    // Add light to make it look space-like
    const ambientLight = new THREE.AmbientLight(0x404040);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    // Animation and label positioning
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate planets for visual effect
      planets.forEach(planet => {
        planet.rotation.y += 0.01;
        const vector = planet.position.clone().project(camera);
        const x = (0.5 + vector.x / 2) * window.innerWidth;
        const y = (0.5 - vector.y / 2) * window.innerHeight;
        planet.userData.label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Click handler to navigate on click
    const handlePlanetClick = (event) => {
      event.preventDefault();
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        onNavigate(clickedPlanet.userData.label.innerText.toLowerCase()); // Passes section name to navigate function
      }
    };

    renderer.domElement.addEventListener('click', handlePlanetClick);

    // Clean-up on unmount
    return () => {
      renderer.domElement.removeEventListener('click', handlePlanetClick);
      planets.forEach(planet => {
        document.body.removeChild(planet.userData.label);
      });
      currentMount.removeChild(renderer.domElement);
    };
  }, [onNavigate]);

  return (
    <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <CosmicBackground />
    </div>
  );
};

export default HomePage;
