import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(-35, 35, 90);

const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshBasicMaterial({ color: '#006400' });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotateX(-Math.PI * 0.5);

scene.add(floor);

renderer.render(scene, camera);

const screenGeometry = new THREE.PlaneGeometry(20, 10);
const screenMaterial = new THREE.MeshBasicMaterial({ color: 'hotpink' });

const createScreenRow = (height, numberOfScreens) => {
  const offsetX = ((numberOfScreens - 1) * 25) / 2;
  for (let i = 0; i < numberOfScreens; i += 1) {
    const x = i * 25;
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.setX(x - offsetX);
    screen.position.setY(height + 10);

    scene.add(screen);
  }
};

const createScreens = (numberOfRows, screensPerRow) => {
  for (let i = 0; i < numberOfRows; i += 1) {
    createScreenRow(i * 15, screensPerRow);
  }
};

createScreens(3, 4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxAzimuthAngle = 1;
controls.minAzimuthAngle = -1;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0.2;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
};

animate();
