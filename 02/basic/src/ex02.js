import * as THREE from 'three';
import {sign} from "three/examples/jsm/nodes/ShaderNode";

// 주제 : 브라우저 창 사이즈 변경 대응

export default function example(){

    const canvas = document.querySelector("#three-canvas");
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias: true // 부드럽게 처리 함
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(window.devicePixelRatio); // 픽셀 비율
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // threejs 에서 고해상도 표현할 때 사용함

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

    scene.add(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ // 빛에 영향을 받지않는 재질
        // color : 0xff0000
        color: '#ff0000'
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    renderer.render(scene, camera);

    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', setSize);


}




