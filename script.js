import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// สร้างฉาก, กล้อง, และ renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// เพิ่มแสง
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// โหลดโมเดลล้อ
const loader = new GLTFLoader();
loader.load(
  'wheel2 9-2.glb', // พาธของโมเดล
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);

    // หมุนโมเดลแบบอัตโนมัติ
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01; // หมุนแกน Y
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  (error) => {
    console.error('เกิดข้อผิดพลาดในการโหลดโมเดล:', error);
  }
);

// ตั้งค่ากล้อง
camera.position.z = 5;

// จัดการการเปลี่ยนขนาดหน้าจอ
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
