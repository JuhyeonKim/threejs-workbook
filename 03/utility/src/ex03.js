import * as THREE from 'three';
import dat from 'dat.gui';

// import Stats from 'stats.js';


// ----- 주제: AxesHelper, GridHelper

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 0;
	camera.position.y = 3;
	camera.position.x = 1;
	scene.add(camera);

	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	const axesHelper = new THREE.AxisHelper(3);
	scene.add(axesHelper);

	const gridHelper = new THREE.GridHelper(5);
	scene.add(gridHelper);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// dat gui

	const gui = new dat.GUI();
	gui.add(mesh.position, 'y', -5, 5, 0.01).name('y position');
	gui.add(mesh.position, 'z')
		.min(-10)
		.max(3)
		.step(0.01)
		.name('mesh position');

	gui.add(camera.position, 'x')
		.min(-10)
		.max(10)
		.step(0.11)
		.name('camera x');

	// const stats = new Stats();
	// document.body.append(stats.domElement);
	mesh.position.x = 2;
	mesh.position.z = 2;

	camera.lookAt(mesh.position);

	// 그리기
	const clock = new THREE.Clock();
	function draw() {

		const time = clock.getElapsedTime();

		mesh.rotation.y = time;

		camera.lookAt(mesh.position);

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
