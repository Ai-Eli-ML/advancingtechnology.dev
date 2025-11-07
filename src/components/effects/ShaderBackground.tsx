"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ShaderBackgroundProps {
  variant?: 'holographic' | 'void-waves' | 'liquid-chrome';
  speed?: number;
  className?: string;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  variant = 'holographic',
  speed = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scene = new (THREE.Scene as any)();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Holographic shader
    const holographicShader = {
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= resolution.x / resolution.y;

          float t = time * 0.3;
          float hue = fract(length(uv) * 0.5 + t);
          float sat = 0.7 + sin(uv.x * 3.0 + t) * 0.2;
          float val = 0.6 + cos(uv.y * 3.0 + t) * 0.2;

          vec3 color = hsv2rgb(vec3(hue, sat, val));
          float alpha = 0.15 + noise(uv * 10.0 + time) * 0.05;

          gl_FragColor = vec4(color, alpha);
        }
      `
    };

    // Void waves shader
    const voidWavesShader = {
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: holographicShader.vertexShader,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= resolution.x / resolution.y;

          float t = time * 0.2;
          float wave = sin(length(uv) * 5.0 - t * 3.0) * 0.5 + 0.5;
          float wave2 = sin(uv.x * 3.0 + uv.y * 3.0 - t * 2.0) * 0.5 + 0.5;

          vec3 color = vec3(0.1, 0.1, 0.2) * (wave * 0.5 + wave2 * 0.5);
          float alpha = 0.6;

          gl_FragColor = vec4(color, alpha);
        }
      `
    };

    // Liquid chrome shader
    const liquidChromeShader = {
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: holographicShader.vertexShader,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          float t = time * 0.5;
          float distort = sin(uv.x * 10.0 + t) * 0.1 + sin(uv.y * 10.0 + t * 0.7) * 0.1;

          vec3 color = vec3(0.7 + distort, 0.75 + distort * 0.5, 0.85 + distort * 0.3);
          float alpha = 0.2;

          gl_FragColor = vec4(color, alpha);
        }
      `
    };

    const shaders = {
      holographic: holographicShader,
      'void-waves': voidWavesShader,
      'liquid-chrome': liquidChromeShader
    };

    const selectedShader = shaders[variant];

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: selectedShader.uniforms,
      vertexShader: selectedShader.vertexShader,
      fragmentShader: selectedShader.fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
        meshRef.current.material.uniforms.time.value = Date.now() * 0.001 * speed;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !meshRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);

      if (meshRef.current.material instanceof THREE.ShaderMaterial) {
        meshRef.current.material.uniforms.resolution.value.set(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [variant, speed]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
};

export default ShaderBackground;
