import * as THREE from 'three';

// 주제 : 안개
// requestAnimationFrame() 을 사용한다
// 말고 set interval 도 있다. (성능 이슈도 있고, 단점이 많아서. requestAnimationFrame 을 사용 함)
// 내부적으로도 requestAnimationFrame 를 사용한 기능도 있다.
// 1분 코딩 requestAnimationFrame 영상 참고

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

    const meshes = [];
    let mesh;
    for (let i = 0; i < 10; i++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 5 - 2.5;
        mesh.position.z = Math.random() * 5 - 2.5;
        scene.add(mesh);
        meshes.push(mesh);
    }

    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        meshes.forEach(mesh => {
            mesh.rotation.y += deltaTime * 0.001;
            // mesh.position.y += deltaTime * 0.001; // 프레임이 로드 되는 속도는 화면 주사율에 따라 달라짐,

            // if (mesh.position.y > 3) {
                // mesh.position.y = 1;
            // }

        });


        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);

        renderer.setAnimationLoop(draw); // 내장된 requestAnimationFrame 호출.. 함수
        // threejs 를 이용해서 ar 혹은 xr 를 할 때에는 setAnimationLoop 를 사용 해야 함
    }

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




