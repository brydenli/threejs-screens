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
camera.position.set(0, 10, 120);

const floorGeometry = new THREE.PlaneGeometry(1000, 200);
const floor = new Reflector(floorGeometry);
floor.rotateX(-Math.PI * 0.5);
floor.position.set(0, -40, 30);
scene.add(floor);

const blurFloorMaterial = new THREE.MeshStandardMaterial({
  color: "#000000",
  transparent: true,
  opacity: 0.85,
})
const blurFloor = new THREE.Mesh(floorGeometry, blurFloorMaterial);
blurFloor.rotateX(-Math.PI * 0.5);
blurFloor.position.set(0, -39, 30);
scene.add(blurFloor);

const ambientLight = new THREE.AmbientLight('#90DFFF', 1.5);
scene.add(ambientLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load('src/assets/models/text.glb', (glb) => {
  const text = glb.scene;
  text.scale.set(6.5, 6.5, 6.5);
  text.position.set(-20, -35, 40);
  text.rotateX(0.5);
  scene.add(text);
});

const X = [0, 38, 71, 92.7, 98.8];
const X2 = [0, 38.5, 72.25, 94.25, 101];

const BASE_Y = -27.5;
const DISPLACEMENT_Y = 24;
const Y = Array(8).fill().map((e, i) => BASE_Y + i * DISPLACEMENT_Y);

const Z = [0, 7.5, 28, 60, 98];
const Z2 = [0, 6, 27, 59.25, 97.75];
const zRotate = [0, 0.4, 0.8, 1.2, 1.6];

const loader = new THREE.TextureLoader();

const videoHTML = [
  document.getElementById('video1'),
  document.getElementById('video2'),
  document.getElementById('video3'),
  document.getElementById('video4'),
]

const imageTextures = [
  loader.load('src/assets/images/1.PNG'),
  loader.load('src/assets/images/2.PNG'),
  loader.load('src/assets/images/3.PNG'),
  loader.load('src/assets/images/4.PNG'),
  loader.load('src/assets/images/5.PNG'),
  loader.load('src/assets/images/6.PNG'),
]

const videoMaterial = (num) => {
  const texture = new THREE.VideoTexture(videoHTML[num - 1]);
  return new THREE.MeshPhongMaterial({
    map: texture,
  })
} 

const screenMaterial = (num) => {
  return new THREE.MeshPhongMaterial({
    map: imageTextures[num - 1],
  });
}

const screenGeometry = new THREE.PlaneGeometry(37.75, 21.8);
const screenBoxGeometry = new THREE.BoxGeometry(37.75, 21.8, 3);
const screenBoxMaterial = new THREE.MeshPhongMaterial({
  color: "#6CFF4E",
});

const rand = (len) => Math.round(Math.random() * len - 1);
const textureArr = [
  videoMaterial(1),
  videoMaterial(2),
  videoMaterial(3),
  videoMaterial(4),
  screenMaterial(1),
  screenMaterial(2),
  screenMaterial(3),
  screenMaterial(4),
  screenMaterial(5),
  screenMaterial(6),
];

const createScreens = (rows, columns) => {
  const halfCol = columns / 2;
  for (let i = 0; i < rows; i += 1) {
    const screenMeshMiddle = new THREE.Mesh(screenGeometry, textureArr[i]);
    const screenBoxMeshMiddle = new THREE.Mesh(screenBoxGeometry, screenBoxMaterial);
    screenMeshMiddle.position.set(0, Y[i], 0);
    screenBoxMeshMiddle.position.set(0, Y[i], -1.6);
    scene.add(screenMeshMiddle, screenBoxMeshMiddle);

    for (let j = 1; j <= halfCol; j += 1) {
      const screenMeshRight = new THREE.Mesh(screenGeometry, textureArr[rand(textureArr.length)]);
      screenMeshRight.position.set(X[j], Y[i], Z[j]);
      screenMeshRight.rotateY(-zRotate[j]);

      const screenBoxMeshRight = new THREE.Mesh(screenBoxGeometry, screenBoxMaterial);
      screenBoxMeshRight.position.set(X2[j], Y[i], Z2[j]);
      screenBoxMeshRight.rotateY(-zRotate[j]);

      const screenMeshLeft = new THREE.Mesh(screenGeometry, textureArr[rand(textureArr.length)]);
      screenMeshLeft.position.set(-X[j], Y[i], Z[j])
      screenMeshLeft.rotateY(zRotate[j]);

      const screenBoxMeshLeft = new THREE.Mesh(screenBoxGeometry, screenBoxMaterial);
      screenBoxMeshLeft.position.set(-X2[j], Y[i], Z2[j]);
      screenBoxMeshLeft.rotateY(zRotate[j]);

      scene.add(screenMeshRight, screenMeshLeft, screenBoxMeshRight, screenBoxMeshLeft);
    }
  }
}

createScreens(8, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxAzimuthAngle = 0.65;
controls.minAzimuthAngle = -0.65;
controls.maxPolarAngle = 1.5;
controls.minPolarAngle = 1.2;
controls.maxDistance = 150;
controls.minDistance = 50;
controls.enableDamping = true;
controls.screenSpacePanning = true;
controls.enablePan = false;

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

animate();

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
