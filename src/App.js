import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import SceneInit from './lib/SceneInit';
function App() {
  useEffect(() => {
    const test = new SceneInit('world');
    test.initialize();
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    test.scene.add(boxMesh);
  }, []);
  return (
    <div className="App">
      <canvas id="world"></canvas>
    </div>
  );
}

export default App;
