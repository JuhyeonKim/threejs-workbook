import * as THREE from 'three';
import {sign} from "three/examples/jsm/nodes/ShaderNode";

// 주제 : 브라우저 창 사이즈 변경 대응

export default function example(){

    const canvas = document.querySelector("#three-canvas");
    const renderer = new THREE.WebGLRenderer({
        canvas : canvas,
        antialias: true, // 부드럽게 처리 함,
        alpha : true // 투명하게 만들기
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(window.devicePixelRatio); // 픽셀 비율
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // threejs 에서 고해상도 표현할 때 사용함
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75, // 시야각
        window.innerWidth/window.innerHeight, // 종횡비
        0.1, // near
        1000 // far
    );
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 5;
    scene.add(camera);

    // 빛은 여러개 넣을 수 있지만, 성능에 영향이 있다.
    const light = new THREE.DirectionalLight(0xffffff, 1); // DirectionalLight : 태양빛과 비슷하다 (전체적으로 비춰 줌)
    light.position.z = 2;
    light.position.y = 5;
    light.position.x = 1;
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ // MeshStandardMaterial :
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




