'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Info, RotateCw, Sparkles, Move } from 'lucide-react';
import { Property } from '@/data/mockData';

interface ThreeDViewerProps {
  property: Property;
}

export const ThreeDViewer = ({ property }: ThreeDViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Staging states
  const [selectedWallColor, setSelectedWallColor] = useState(property.stagingColors[0]?.hex || '#FAF6EF');
  const [selectedFloor, setSelectedFloor] = useState(property.stagingFloors[0]?.name || 'Light Oak Wood');
  
  // Interactive hotspot overlay state
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // References to 3D elements for dynamic color/material updates
  const wallMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const floorMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Set up three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 450; // Set a premium fixed height

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0A0A');
    scene.fog = new THREE.FogExp2('#0A0A0A', 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(5, 4, 8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera going below floor
    controls.minDistance = 3;
    controls.maxDistance = 15;

    // 5. Room geometry and structures
    // Wall Material
    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedWallColor),
      roughness: 0.85,
    });
    wallMaterialRef.current = wallMat;

    // Floor Material
    const getFloorColor = (name: string) => {
      if (name.includes('Oak') || name.includes('Chestnut') || name.includes('Wood')) return '#C5A880';
      if (name.includes('Marble') || name.includes('Carrara')) return '#E5E8E8';
      if (name.includes('Slate') || name.includes('Basalt') || name.includes('Stone')) return '#2C3E50';
      return '#A6ACAF';
    };

    const floorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(getFloorColor(selectedFloor)),
      roughness: 0.3,
      metalness: 0.1,
    });
    floorMaterialRef.current = floorMat;

    // Build walls (Back, Left, Right)
    const wallGeometry = new THREE.BoxGeometry(12, 6, 0.2);
    
    // Back wall
    const backWall = new THREE.Mesh(wallGeometry, wallMat);
    backWall.position.set(0, 3, -6);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6, 12), wallMat);
    leftWall.position.set(-6, 3, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Glass Panoramic Window outline on Right Wall (simulating a sky view)
    const rightWallBorder1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6, 2), wallMat);
    rightWallBorder1.position.set(6, 3, -5);
    scene.add(rightWallBorder1);

    const rightWallBorder2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6, 2), wallMat);
    rightWallBorder2.position.set(6, 3, 5);
    scene.add(rightWallBorder2);

    const rightWallHeader = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.5, 8), wallMat);
    rightWallHeader.position.set(6, 5.25, 0);
    scene.add(rightWallHeader);

    // Floor Plane
    const floorGeometry = new THREE.PlaneGeometry(12, 12);
    const floor = new THREE.Mesh(floorGeometry, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling Plane
    const ceilingMat = new THREE.MeshStandardMaterial({ color: '#E5E8E8', roughness: 0.9 });
    const ceiling = new THREE.Mesh(floorGeometry, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    scene.add(ceiling);

    // 6. Minimalist Designer Furniture
    const furnitureGroup = new THREE.Group();

    // Elegant Italian Leather Sofa
    const sofaColor = '#1F2022'; // Obsidian black leather
    const sofaMat = new THREE.MeshStandardMaterial({ color: sofaColor, roughness: 0.6 });
    
    // Sofa Base
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.4, 1.8), sofaMat);
    sofaBase.position.set(0, 0.3, -2);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    furnitureGroup.add(sofaBase);

    // Sofa cushions
    const sofaCushion1 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.4, 1.6), sofaMat);
    sofaCushion1.position.set(-1.1, 0.6, -1.9);
    sofaCushion1.castShadow = true;
    furnitureGroup.add(sofaCushion1);

    const sofaCushion2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.4, 1.6), sofaMat);
    sofaCushion2.position.set(1.1, 0.6, -1.9);
    sofaCushion2.castShadow = true;
    furnitureGroup.add(sofaCushion2);

    // Sofa backrest
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.0, 0.4), sofaMat);
    sofaBack.position.set(0, 1.0, -2.7);
    sofaBack.castShadow = true;
    furnitureGroup.add(sofaBack);

    // Minimalist Coffee Table
    const tableGlassMat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6
    });
    const tableLegMat = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.8, roughness: 0.2 }); // Gold legs
    
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 1.4), tableGlassMat);
    tableTop.position.set(0, 0.6, 0.5);
    tableTop.castShadow = true;
    furnitureGroup.add(tableTop);

    // Table legs
    for (let x of [-1.1, 1.1]) {
      for (let z of [-0.6, 0.6]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6), tableLegMat);
        leg.position.set(x, 0.3, z + 0.5);
        leg.castShadow = true;
        furnitureGroup.add(leg);
      }
    }

    // Plush circular Rug
    const rugMat = new THREE.MeshStandardMaterial({ color: '#DFD3C3', roughness: 0.9 });
    const rug = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.02, 32), rugMat);
    rug.position.set(0, 0.01, 0);
    rug.receiveShadow = true;
    furnitureGroup.add(rug);

    scene.add(furnitureGroup);

    // 7. Interactive Hotspot Spheres
    const hotspotGroup = new THREE.Group();
    const hotspotMat = new THREE.MeshBasicMaterial({ color: '#C5A880', transparent: true, opacity: 0.8 });
    
    // Hotspot 1 (Sofa)
    const hsSofa = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), hotspotMat);
    hsSofa.position.set(-1, 1.4, -2);
    hsSofa.name = 'sofa';
    hotspotGroup.add(hsSofa);

    // Hotspot 2 (Table)
    const hsTable = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), hotspotMat);
    hsTable.position.set(0.8, 0.8, 0.5);
    hsTable.name = 'table';
    hotspotGroup.add(hsTable);

    // Hotspot 3 (Window)
    const hsWindow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), hotspotMat);
    hsWindow.position.set(5.8, 3.0, 0);
    hsWindow.name = 'window';
    hotspotGroup.add(hsWindow);

    scene.add(hotspotGroup);

    // 8. Lights setup
    const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.6);
    scene.add(ambientLight);

    // Ceiling spotlights
    const spotlight = new THREE.SpotLight('#FFF8EB', 4.5);
    spotlight.position.set(0, 5.5, 0);
    spotlight.angle = Math.PI / 3;
    spotlight.penumbra = 0.5;
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    scene.add(spotlight);

    // Soft window sky lighting
    const windowLight = new THREE.DirectionalLight('#FAD7A0', 1.5); // Golden hour sun
    windowLight.position.set(10, 4, 0);
    windowLight.castShadow = true;
    scene.add(windowLight);

    // 9. Raycasting for hotspot clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotGroup.children);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object as THREE.Mesh;
        setActiveHotspot(clickedObj.name);
      } else {
        setActiveHotspot(null);
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 10. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Animate hotspots (pulsing & hovering)
      hotspotGroup.children.forEach((hs, idx) => {
        hs.position.y += Math.sin(elapsedTime * 3 + idx) * 0.002;
        const scale = 1 + Math.sin(elapsedTime * 5 + idx) * 0.15;
        hs.scale.set(scale, scale, scale);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
        renderer.dispose();
      }
      controls.dispose();
    };
  }, []);

  // Update wall color dynamically
  useEffect(() => {
    if (wallMaterialRef.current) {
      wallMaterialRef.current.color.set(selectedWallColor);
    }
  }, [selectedWallColor]);

  // Update floor material color dynamically
  useEffect(() => {
    if (floorMaterialRef.current) {
      const getFloorColor = (name: string) => {
        if (name.includes('Oak') || name.includes('Chestnut') || name.includes('Wood')) return '#C5A880';
        if (name.includes('Marble') || name.includes('Carrara')) return '#E5E8E8';
        if (name.includes('Slate') || name.includes('Basalt') || name.includes('Stone')) return '#2C3E50';
        return '#A6ACAF';
      };
      floorMaterialRef.current.color.set(getFloorColor(selectedFloor));
    }
  }, [selectedFloor]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col glass rounded-3xl overflow-hidden shadow-2xl border border-foreground/5 bg-black/40">
      {/* 3D Canvas container */}
      <div className="relative w-full h-[450px]">
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
        
        {/* Help Badges */}
        <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2">
          <div className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-accent flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> 3D Virtual Tour
          </div>
          <div className="glass px-3 py-1.5 rounded-full text-[9px] font-medium tracking-wide text-zinc-300 flex items-center gap-1">
            <Move className="h-3 w-3" /> Left-click + drag to orbit. Right-click to pan. Scroll to zoom.
          </div>
        </div>

        {/* Floating Info Hotspot Popup Panel */}
        {activeHotspot && (
          <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl animate-fade-in-up border border-gold-accent/20 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-gold-accent/20 text-gold-accent">
                <Info className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-accent">
                  {activeHotspot === 'sofa' && 'Bespoke Lounge sofa'}
                  {activeHotspot === 'table' && 'Architectural Table'}
                  {activeHotspot === 'window' && 'Panoramic Glazed Windows'}
                </h4>
                <p className="text-xs font-light text-foreground/80 leading-relaxed">
                  {activeHotspot === 'sofa' && 'Luxury full-grain custom leather design with polished gold details, matching the Apple-inspired minimalism of the property.'}
                  {activeHotspot === 'table' && 'Brushed gold frame with low-iron tempered architectural glass. Blends seamlessly with multiple floor configurations.'}
                  {activeHotspot === 'window' && 'Structural triple-glazed framing engineered to withstand ocean winds while offering unobstructed natural golden-hour illumination.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Staging Control Panels below Canvas */}
      <div className="p-6 border-t border-foreground/5 bg-background grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wall Color Customization */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block">
            Virtual Wall Staging
          </span>
          <div className="flex items-center gap-4">
            {property.stagingColors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedWallColor(color.hex)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all duration-300 ${
                  selectedWallColor === color.hex
                    ? 'border-gold-accent bg-gold-accent/10 text-gold-accent font-medium'
                    : 'border-foreground/10 bg-background text-foreground hover:bg-foreground/5'
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10 inline-block"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Material Customization */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block">
            Virtual Flooring Staging
          </span>
          <div className="flex items-center gap-4">
            {property.stagingFloors.map((floor, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFloor(floor.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all duration-300 ${
                  selectedFloor === floor.name
                    ? 'border-gold-accent bg-gold-accent/10 text-gold-accent font-medium'
                    : 'border-foreground/10 bg-background text-foreground hover:bg-foreground/5'
                }`}
              >
                <RotateCw className={`h-3 w-3 ${selectedFloor === floor.name ? 'animate-spin' : ''}`} />
                {floor.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
