import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 90);

const floorTexture = new THREE.TextureLoader().load('floor.png');
const floorGeometry = new THREE.PlaneGeometry(300, 300);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: '#020202', shininess: 30, map: floorTexture,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotateX(-Math.PI * 0.5);
floor.position.z = 30;
scene.add(floor);

const screenGeometry = new THREE.PlaneGeometry(40, 22.5);

const createScreenRow = (height, numberOfScreens) => {
  const offsetX = ((numberOfScreens - 1) * 43.5) / 2;
  for (let i = 0; i < numberOfScreens; i += 1) {
    const x = i * 45 - offsetX;
    const y = height + 22.5;
    const randColor = (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

    const screenMaterial = new THREE.MeshBasicMaterial({ color: `#${randColor}` });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(x, y);

    const pointLight = new THREE.PointLight(`#${randColor}`);
    pointLight.position.set(x, y);

    scene.add(screen, pointLight);
  }
};

const createScreens = (numberOfRows, screensPerRow) => {
  for (let i = 0; i < numberOfRows; i += 1) {
    createScreenRow(i * 26, screensPerRow);
  }
};

createScreens(2, 3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxAzimuthAngle = 0.4;
controls.minAzimuthAngle = -0.4;
controls.maxPolarAngle = 1.5;
controls.minPolarAngle = 1;
controls.maxDistance = 150;
controls.minDistance = 100;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
};

animate();
