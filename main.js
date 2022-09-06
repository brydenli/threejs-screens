import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 50, 120);

const floorGeometry = new THREE.PlaneGeometry(1000, 200);
const floor = new Reflector(floorGeometry);
floor.rotateX(-Math.PI * 0.5);
floor.position.set(0, -10, 30);
scene.add(floor);

const blurFloorMaterial = new THREE.MeshStandardMaterial({
  color: "#000000",
  transparent: true,
  opacity: 0.9,
})
const blurFloor = new THREE.Mesh(floorGeometry, blurFloorMaterial);
blurFloor.rotateX(-Math.PI * 0.5);
blurFloor.position.set(0, -9, 30);
scene.add(blurFloor);

const ambientLight = new THREE.AmbientLight('#FFFFFF', 1.5);
scene.add(ambientLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load('./text.glb', (glb) => {
  const text = glb.scene;
  text.scale.set(5.5, 5.5, 5.5);
  text.position.set(-20, -5, 20);
  text.rotateX(0.5);
  scene.add(text);
});

// desktop 1
gltfLoader.load('./screen_desktop.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(-53, 10, 11);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);
  desktop.rotateZ(0.4);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(-53, 10, 0);
  scene.add(desktop, pointLight);
});

// desktop 2
gltfLoader.load('./screen_desktop2.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(0, 10, 0);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(0, 10, 0);
  scene.add(desktop, pointLight);
});

// desktop 3
gltfLoader.load('./screen_desktop3.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(53, 10, 11);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);
  desktop.rotateZ(-0.4);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(53, 10, 0);
  scene.add(desktop, pointLight);
});

// desktop 4
gltfLoader.load('./screen_desktop4.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(-53, 41, 11);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);
  desktop.rotateZ(0.4);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(-53, 41, 0);
  scene.add(desktop, pointLight);
});

// desktop 5
gltfLoader.load('./screen_desktop5.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(0, 41, 0);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(0, 41, 0);
  scene.add(desktop, pointLight);
});

// desktop 6
gltfLoader.load('./screen_desktop2.glb', (glb) => {
  const desktop = glb.scene;
  desktop.scale.set(15, 15, 15);
  desktop.position.set(53, 41, 11);
  desktop.rotateX(Math.PI / 2);
  desktop.rotateY(Math.PI);
  desktop.rotateZ(-0.4);

  const pointLight = new THREE.PointLight('#1F51FF', 1.2);
  pointLight.position.set(53, 41, 0);
  scene.add(desktop, pointLight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxAzimuthAngle = 0.6;
controls.minAzimuthAngle = -0.6;
controls.maxPolarAngle = 1.5;
controls.minPolarAngle = .8;
controls.maxDistance = 130;
controls.minDistance = 50;
controls.enableDamping = true;
controls.screenSpacePanning = false;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
};

animate();
