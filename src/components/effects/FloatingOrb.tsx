"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingOrbProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  speed?: number;
  className?: string;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
  size = 'medium',
  color = '#6366F1',
  speed = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scene = new (THREE.Scene as any)();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orb geometry and material with custom shader
    const sizeMap = { small: 1, medium: 1.5, large: 2 };
    const geometry = new THREE.SphereGeometry(sizeMap[size], 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          vec3 glowColor = color * (0.5 + fresnel * 1.5 + pulse * 0.3);

          float alpha = 0.7 + fresnel * 0.3;
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);
    orbRef.current = orb;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(color).getHex(), 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (orbRef.current) {
        orbRef.current.rotation.x += 0.002 * speed;
        orbRef.current.rotation.y += 0.003 * speed;

        // Floating animation
        const time = Date.now() * 0.001;
        orbRef.current.position.y = Math.sin(time * speed) * 0.3;

        // Update shader uniforms
        if (orbRef.current.material instanceof THREE.ShaderMaterial) {
          orbRef.current.material.uniforms.time.value = time;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (orbRef.current) {
        orbRef.current.geometry.dispose();
        if (orbRef.current.material instanceof THREE.Material) {
          orbRef.current.material.dispose();
        }
      }
    };
  }, [size, color, speed]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
};

export default FloatingOrb;
