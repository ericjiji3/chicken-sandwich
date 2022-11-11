import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { findAllInRenderedTree } from 'react-dom/test-utils';
import SceneInit from './lib/SceneInit'; 
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function App() {
  useEffect(() => {
    const world = new SceneInit('world');
    world.initialize();
    world.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshStandardMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.z = 8;
    boxMesh.receiveShadow = true;

    const loader = new GLTFLoader();
    loader.load( './images/chicken.gltf' , function ( gltf ) {
      world.scene.add( gltf.scene );
    }, undefined, function ( error ) {
      console.error( error );
    } );

    const floor = new THREE.PlaneGeometry(1000, 1000);
    let heightTexture = new THREE.TextureLoader().load('./images/height-map.png');
    heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // wireframe: true,
      // displacementMap: heightTexture,
      // displacementScale: 1
    })
    const floorMesh = new THREE.Mesh(floor, floorMaterial);

    // const gui = new GUI();
    // const cubeFolder = gui.addFolder('Cube');
    // cubeFolder.add(boxMesh.position, 'x', -50, 50);
    // cubeFolder.add(boxMesh.position, 'y', -50, 50);
    // cubeFolder.add(boxMesh.position, 'z', -50, 50);

    // let light = new THREE.DirectionalLight(0xFFFFFF, 10.0);
    // light.position.set(0, 5, 0);
    // light.target.position.set(0, 0, 0);

    // world.scene.add(light);
    // world.scene.add(light.target);


    world.scene.add(boxMesh);
    world.scene.add(floorMesh);
  }, []);
  
  return (
    <div className="App">
      <canvas id="world"></canvas>
    </div>
  );
}

export default App;
