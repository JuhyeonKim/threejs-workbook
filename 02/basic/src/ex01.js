import * as THREE from 'three';

// 주제 : 기본 장면

export default function example(){
    // const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement) // renderer 의캔버스


    const canvas = document.querySelector("#three-canvas");
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias: true // 부드럽게 처리 함
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75, // 시야각
        window.innerWidth/window.innerHeight, // 종횡비
        0.1, // near
        1000 // far
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;


// OrthographicCamera (직교 카메라)
// const camera = new THREE.OrthographicCamera(
//     -(window.innerWidth/ window.innerHeight),
//     window.innerWidth/ window.innerHeight,
//     1,
//     -1,
//     0.1,
//     1000
// );
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// camera.lookAt(0, 0, 0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();


    scene.add(camera);


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ // 빛에 영향을 받지않는 재질
        // color : 0xff0000
        color: '#ff0000'
    });

    const mesh = new THREE.Mesh(geometry, material);


    scene.add(mesh);
    renderer.render(scene, camera);


}

