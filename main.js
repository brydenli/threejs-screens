import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 80;
renderer.render(scene, camera);

const screenGeometry = new THREE.PlaneGeometry(20, 10);
const screenMaterial = new THREE.MeshBasicMaterial({ color: '#ADD8E6' });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);

scene.add(screen);

const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
};

animate();
