// Сцена для Xbox Series S
const sceneXbox = new THREE.Scene();
const cameraXbox = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rendererXbox = new THREE.WebGLRenderer({ antialias: true, alpha: true });

rendererXbox.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); // Займає половину екрану
document.getElementById('scene-container-xbox').appendChild(rendererXbox.domElement);

// Освітлення для Xbox
const ambientLightXbox = new THREE.AmbientLight(0x404040, 0.8);
sceneXbox.add(ambientLightXbox);
const blueLightXbox = new THREE.PointLight(0x00FFEA, 1.5, 50);
blueLightXbox.position.set(-5, 5, 5);
sceneXbox.add(blueLightXbox);
const pinkLightXbox = new THREE.PointLight(0xFF2079, 1.5, 50);
pinkLightXbox.position.set(5, 5, 5);
sceneXbox.add(pinkLightXbox);

// Завантаження моделі Xbox Series S
let modelXbox;
const loaderXbox = new THREE.GLTFLoader();
loaderXbox.load('xbox-series-s.glb', (gltf) => {
    modelXbox = gltf.scene;
    modelXbox.scale.set(50, 50, 50); // Збільшуємо масштаб до 5 для видимості на половині екрану
    const box = new THREE.Box3().setFromObject(modelXbox);
    const center = box.getCenter(new THREE.Vector3());
    modelXbox.position.sub(center);
    modelXbox.position.x -= 2; // Зсуваємо ліворуч для центровки
    modelXbox.traverse((child) => {
        if (child.isMesh && !child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                metalness: 0.5,
                roughness: 0.5
            });
        }
    });
    sceneXbox.add(modelXbox);
    console.log('Модель Xbox Series S завантажена, розмір:', box.getSize(new THREE.Vector3()));
    const size = box.getSize(new THREE.Vector3()).length();
    const offset = size * 3; // Збільшуємо відстань камери для видимості
    cameraXbox.position.set(-2, 0, offset);
    cameraXbox.lookAt(-2, 0, 0);
}, (progress) => {
    console.log(`Завантаження Xbox: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
}, (error) => {
    console.error('Помилка завантаження моделі Xbox:', error);
});

// Управління обертанням моделі
let isDraggingXbox = false;
let previousMousePosition = { x: 0, y: 0 };
let autoRotateXbox = true;

document.addEventListener('mousedown', (e) => {
    if (e.target.closest('#scene-container-xbox')) {
        isDraggingXbox = true;
        autoRotateXbox = false;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', () => {
    isDraggingXbox = false;
    autoRotateXbox = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingXbox && modelXbox) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        modelXbox.rotation.y += deltaMove.x * 0.005;
        modelXbox.rotation.x += deltaMove.y * 0.005;
        modelXbox.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelXbox.rotation.x));
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && e.target.closest('#scene-container-xbox')) {
        isDraggingXbox = true;
        autoRotateXbox = false;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
});

document.addEventListener('touchend', () => {
    isDraggingXbox = false;
    autoRotateXbox = true;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDraggingXbox && modelXbox) {
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };
        modelXbox.rotation.y += deltaMove.x * 0.005;
        modelXbox.rotation.x += deltaMove.y * 0.005;
        modelXbox.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelXbox.rotation.x));
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
});

function animate() {
    requestAnimationFrame(animate);
    if (autoRotateXbox && modelXbox) {
        modelXbox.rotation.y += 0.01;
    }
    rendererXbox.render(sceneXbox, cameraXbox);
}
animate();

window.addEventListener('resize', () => {
    cameraXbox.aspect = window.innerWidth / window.innerHeight;
    cameraXbox.updateProjectionMatrix();
    rendererXbox.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); // Зберігаємо половину екрану
});
