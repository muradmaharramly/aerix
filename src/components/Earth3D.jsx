import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

const Earth3D = () => {
  const { locationCoords } = useSelector((state) => state.weather);
  const { city } = useSelector((state) => state.location);
  const globeEl = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [countries, setCountries] = useState({ features: [] });

  // Project Palette Colors
  const colors = {
    primary: '#71B280', // Soft Green
    accent: '#134E5E',  // Deep Teal
    atmosphere: '#71B280',
    marker: '#ffffffff'   // Gold (Distinct Color for City)
  };

  useEffect(() => {
    // Load country data
    fetch('https://unpkg.com/world-atlas/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        // We need to convert TopoJSON to GeoJSON or just use a GeoJSON source
        // Actually react-globe.gl examples often use this URL but process it?
        // Let's use a direct GeoJSON source for simplicity
        // fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
        // Using a reliable GeoJSON source
        fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson')
          .then(res => res.json())
          .then(setCountries);
      });
  }, []);

  useEffect(() => {
    // Handle resize
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Globe Material for Green Tones (Water)
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: colors.accent, // Deep Teal for Water
      shininess: 0.7,
      specular: new THREE.Color(0xaaaaaa), // Specular highlights
    });
    return material;
  }, []);

  useEffect(() => {
    // Auto-rotate and point to location
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false; // Disable zoom to keep it neat in the card
      
      if (locationCoords) {
        // Stop rotation when focusing on a city
        globeEl.current.controls().autoRotate = false;
        
        // Spin to location and Zoom in
        globeEl.current.pointOfView({
          lat: locationCoords.lat,
          lng: locationCoords.lon,
          altitude: 0.6 // Zoomed in (was 1.5)
        }, 1500); // Slower, smoother transition
      }
    }
  }, [locationCoords]);

  // Rings data for the location marker
  const ringsData = useMemo(() => {
    if (!locationCoords) return [];
    return [{
      lat: locationCoords.lat,
      lng: locationCoords.lon,
      maxR: 8, // Larger ring
      propagationSpeed: 3,
      repeatPeriod: 800
    }];
  }, [locationCoords]);

  // Labels data for the city name
  const labelsData = useMemo(() => {
    if (!locationCoords || !city) return [];
    return [{
      lat: locationCoords.lat,
      lng: locationCoords.lon,
      text: city,
      color: colors.marker,
      size: 1.5
    }];
  }, [locationCoords, city]);

  return (
    <div 
      ref={containerRef} 
      className="earth-3d-container" 
      style={{ width: '100%', height: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {dimensions.width > 0 && (
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)" // Transparent background
          
          // Globe Appearance
          globeImageUrl={null} // Remove dark texture
          globeMaterial={globeMaterial} // Use custom green material
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          
          // Atmosphere
          atmosphereColor={colors.primary}
          atmosphereAltitude={0.15}
          
          // Polygons (Countries) - We layer this to tint them with project colors
          polygonsData={countries.features}
          polygonCapColor={() => colors.primary} // Soft Green for Land
          polygonSideColor={() => 'rgba(19, 78, 94, 0.5)'} // Deep Teal sides
          polygonStrokeColor={() => '#134E5E'} // Dark Green (Deep Teal) borders
          polygonAltitude={0.01}
          
          // Location Marker (Rings)
          ringsData={ringsData}
          ringColor={() => colors.marker}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          
          // Labels (City Name)
          labelsData={labelsData}
          labelColor="color"
          labelSize="size"
          labelDotRadius={0.5}
          labelAltitude={0.01}
        />
      )}
    </div>
  );
};

export default Earth3D;
