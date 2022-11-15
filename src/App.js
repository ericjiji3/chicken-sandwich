import './App.css';
import * as THREE from 'three';
import React, {useEffect, useRef } from 'react';
import SceneInit from './lib/SceneInit'; 
import {Canvas, useLoader} from '@react-three/fiber';
import { OrbitControls, GradientTexture } from '@react-three/drei';
import { MeshToonMaterial } from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import chicken from './images/chicken.gltf';
import vertextShader from './vertexShader.js';
import fragmentShader from './fragmentShader.js';

function App() {
  // useEffect(() => {
  //   const world = new SceneInit('world');
  //   world.initialize();
  //   world.animate();

  //   const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
  //   const boxMaterial = new THREE.MeshStandardMaterial();
  //   const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  //   boxMesh.position.z = 8;
  //   boxMesh.receiveShadow = true;

    // const loader = new GLTFLoader();
    // loader.load( chicken , function ( gltf ) {
    //   world.scene.add( gltf.scene );
    // }, undefined, function ( error ) {
    //   console.error( error );
    // } );

    // const floor = new THREE.PlaneGeometry(1000, 1000, 500, 500);
    // let heightTexture = new THREE.TextureLoader().setPath('./images/').load('height-map.png');
    // heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;
    // const floorMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xffffff,
    //   displacementMap: heightTexture,
    //   displacementScale: 1
    // })
    // const floorMesh = new THREE.Mesh(floor, floorMaterial);

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


  //   world.scene.add(boxMesh);
  //   world.scene.add(floorMesh);
  // }, []);
  const Terrain = () =>{
    const mesh = useRef();
    const height = useLoader(THREE.TextureLoader, "/images/height-map.png");
    const normal = useLoader(THREE.TextureLoader, "/images/normal-map.png");
    const color = useLoader(THREE.TextureLoader, "/images/color-map.jpg");
    const heightScale = 20;
    const uniforms = {
      bumpTexture: {value: height},
      bumpScale: {value: heightScale}
    }
    const updateBufferGeometry = () =>{
      const {geometry} = mesh.current;
      console.log(geometry);
      console.log(geometry.attributes.position.array);
      for(let j=0; j<500; j++){
        for(let i=0; i<500; i++){
          const n =  (j*(500)  +i)
          const nn = (j*(501)+i)
          // const col = data.data[n*4]
          // const v1 = geo.vertices[nn]
          // v1.z = map(col,0,255,-10,10) 
          // if(v1.z > 2.5) v1.z *= 1.3 

        }
      }
    }
    
    useEffect(()=>{
      updateBufferGeometry();
    })
    return(
      <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[500, 500, 300, 300]} position={[0, 0, 0]}/>
        <meshToonMaterial attach="material" color="white">
        </meshToonMaterial>
      </mesh>
    )
  }

  return (
    <div className="App">
      <Canvas style={{ background: "blue" }} camera={{position: [0, 0 ,500]}}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[200, 200, 5]} intensity={1} castShadow={true}/>
        <Terrain/>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
