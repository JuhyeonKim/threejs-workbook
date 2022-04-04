import * as THREE from 'three';
import gsap from 'gsap';

// 주제 : 애니메이션 라이브러리 사용
// 좋은 퀄리티의 애니메이션을 사용 가능
// 적당하게 사용할만하다면.. 아니면 커스텀하게 직접 만들고
// https://greensock.com/gsap/ 에서 만들어진게 있다, 다른데에도 있다


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

    // 안개 추가
    scene.fog = new THREE.Fog('white', 3, 7); // 색상이 은은하게 필터링되게 하는 효과
    // 안개를 넣으면 원근감이 더 살아나게 할 수 있다

    const camera = new THREE.PerspectiveCamera(
        75, // 시야각
        window.innerWidth/window.innerHeight, // 종횡비
        0.1, // near
        1000 // far
    );
    camera.position.z = 5;
    camera.position.y = 1;
    scene.add(camera);

    // 빛은 여러개 넣을 수 있지만, 성능에 영향이 있다.
    const light = new THREE.DirectionalLight(0xffffff, 1); // DirectionalLight : 태양빛과 비슷하다 (전체적으로 비춰 줌)
    light.position.z = 10;
    light.position.y = 5;
    light.position.x = 1;
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ // MeshStandardMaterial :
        // color : 0xff0000
        color: 'red'
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        renderer.render(scene, camera);

        renderer.setAnimationLoop(draw); // 내장된 requestAnimationFrame 호출.. 함수
        // threejs 를 이용해서 ar 혹은 xr 를 할 때에는 setAnimationLoop 를 사용 해야 함
    }

    gsap.to(
        mesh.position, // 목적 객체
        {
            duration: 1, // 1초
            y: 2, // 바꾸고 싶은 필드명 // gsap 를 보고 설정 해봐라
            z: 3
        } // 바꿀 속성
    )

    renderer.render(scene, camera);
    function setSize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', setSize);

    draw();

}




