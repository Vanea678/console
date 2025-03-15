// Сцена для PS5
const scenePS5 = new THREE.Scene();
const cameraPS5 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rendererPS5 = new THREE.WebGLRenderer({ antialias: true, alpha: true });

rendererPS5.setSize(window.innerWidth * 0.5, window.innerHeight * 0.25);
document.getElementById('scene-container-ps5').appendChild(rendererPS5.domElement);

// Освітлення для PS5
const ambientLightPS5 = new THREE.AmbientLight(0x404040, 0.8);
scenePS5.add(ambientLightPS5);
const blueLightPS5 = new THREE.PointLight(0x00FFEA, 1.5, 50);
blueLightPS5.position.set(-5, 5, 5);
scenePS5.add(blueLightPS5);
const pinkLightPS5 = new THREE.PointLight(0xFF2079, 1.5, 50);
pinkLightPS5.position.set(5, 5, 5);
scenePS5.add(pinkLightPS5);

// Завантаження моделі PS5
let modelPS5;
const loaderPS5 = new THREE.GLTFLoader();
loaderPS5.load("assets\models\ps5.glb", (gltf) => {
    modelPS5 = gltf.scene;
    modelPS5.scale.set(2, 2, 2);
    const box = new THREE.Box3().setFromObject(modelPS5);
    const center = box.getCenter(new THREE.Vector3());
    modelPS5.position.sub(center);
    modelPS5.position.x -= 2; // Переміщаємо ліворуч
    modelPS5.traverse((child) => {
        if (child.isMesh && !child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                metalness: 0.5,
                roughness: 0.5
            });
        }
    });
    scenePS5.add(modelPS5);
    console.log('Модель PS5 завантажена, розмір:', box.getSize(new THREE.Vector3()));
    const size = box.getSize(new THREE.Vector3()).length();
    const offset = size * 1.5;
    cameraPS5.position.set(-2, 0, offset);
    cameraPS5.lookAt(-2, 0, 0);
}, (progress) => {
    console.log(`Завантаження PS5: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
}, (error) => {
    console.error('Помилка завантаження моделі PS5:', error);
});

// Сцена для Xbox Series S
const sceneXbox = new THREE.Scene();
const cameraXbox = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rendererXbox = new THREE.WebGLRenderer({ antialias: true, alpha: true });

rendererXbox.setSize(window.innerWidth * 0.5, window.innerHeight * 0.25);
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
loaderXbox.load("assets\models\xbox.glb", (gltf) => {
    modelXbox = gltf.scene;
    modelXbox.scale.set(2, 2, 2);
    const box = new THREE.Box3().setFromObject(modelXbox);
    const center = box.getCenter(new THREE.Vector3());
    modelXbox.position.sub(center);
    modelXbox.position.x -= 2; // Переміщаємо ліворуч
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
    const offset = size * 1.5;
    cameraXbox.position.set(-2, 0, offset);
    cameraXbox.lookAt(-2, 0, 0);
}, (progress) => {
    console.log(`Завантаження Xbox: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
}, (error) => {
    console.error('Помилка завантаження моделі Xbox:', error);
});

// Управління обертанням моделей
let isDraggingPS5 = false;
let isDraggingXbox = false;
let previousMousePosition = { x: 0, y: 0 };
let autoRotatePS5 = true;
let autoRotateXbox = true;

document.addEventListener('mousedown', (e) => {
    if (e.target.closest('#scene-container-ps5')) {
        isDraggingPS5 = true;
        autoRotatePS5 = false;
    } else if (e.target.closest('#scene-container-xbox')) {
        isDraggingXbox = true;
        autoRotateXbox = false;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', () => {
    isDraggingPS5 = false;
    isDraggingXbox = false;
    autoRotatePS5 = true;
    autoRotateXbox = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingPS5 && modelPS5) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        modelPS5.rotation.y += deltaMove.x * 0.005;
        modelPS5.rotation.x += deltaMove.y * 0.005;
        modelPS5.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelPS5.rotation.x));
    }
    if (isDraggingXbox && modelXbox) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        modelXbox.rotation.y += deltaMove.x * 0.005;
        modelXbox.rotation.x += deltaMove.y * 0.005;
        modelXbox.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelXbox.rotation.x));
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        if (e.target.closest('#scene-container-ps5')) {
            isDraggingPS5 = true;
            autoRotatePS5 = false;
        } else if (e.target.closest('#scene-container-xbox')) {
            isDraggingXbox = true;
            autoRotateXbox = false;
        }
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
});

document.addEventListener('touchend', () => {
    isDraggingPS5 = false;
    isDraggingXbox = false;
    autoRotatePS5 = true;
    autoRotateXbox = true;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
        };
        if (isDraggingPS5 && modelPS5) {
            modelPS5.rotation.y += deltaMove.x * 0.005;
            modelPS5.rotation.x += deltaMove.y * 0.005;
            modelPS5.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelPS5.rotation.x));
        }
        if (isDraggingXbox && modelXbox) {
            modelXbox.rotation.y += deltaMove.x * 0.005;
            modelXbox.rotation.x += deltaMove.y * 0.005;
            modelXbox.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelXbox.rotation.x));
        }
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
});

function animate() {
    requestAnimationFrame(animate);
    if (autoRotatePS5 && modelPS5) {
        modelPS5.rotation.y += 0.01;
    }
    if (autoRotateXbox && modelXbox) {
        modelXbox.rotation.y += 0.01;
    }
    rendererPS5.render(scenePS5, cameraPS5);
    rendererXbox.render(sceneXbox, cameraXbox);
}
animate();

window.addEventListener('resize', () => {
    cameraPS5.aspect = window.innerWidth / window.innerHeight;
    cameraPS5.updateProjectionMatrix();
    rendererPS5.setSize(window.innerWidth * 0.5, window.innerHeight * 0.25);

    cameraXbox.aspect = window.innerWidth / window.innerHeight;
    cameraXbox.updateProjectionMatrix();
    rendererXbox.setSize(window.innerWidth * 0.5, window.innerHeight * 0.25);
});
