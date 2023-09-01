// Вариант 1
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// var geometry = new THREE.BoxGeometry(10, 10, 10);
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 25;

// function render() {
//   requestAnimationFrame(render);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// render();

// Вариант 2
// var camera, scene, renderer;
// var geometry, material, mesh;
// init();
// animate();
// function init() {
//   camera = new THREE.PerspectiveCamera(
//     70,
//     window.innerWidth / window.innerHeight,
//     0.01,
//     10
//   );
//   camera.position.z = 1;
//   scene = new THREE.Scene();
//   geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//   material = new THREE.MeshNormalMaterial();
//   mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
// }
// function animate() {
//   requestAnimationFrame(animate);
//   mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.02;
//   renderer.render(scene, camera);
// }


// Вариант 3

// // Подключение библиотеки Three.js
// import * as THREE from "three";

// Создание сцены
const scene = new THREE.Scene();

// Создание камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Создание рендерера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Параметры спирали Архимеда
// const a = 0.1; // Константа "a"
const b = 0.02; // Константа "b"
const numPoints = 1000; // Количество точек на спирали

// Создание геометрии и материала для спирали
const geometry = new THREE.BufferGeometry();
const geometry1 = new THREE.BufferGeometry();
const positions = new Float32Array(numPoints * 3);
const positions1 = new Float32Array(numPoints * 3);

for (let i = 0; i < numPoints; i++) {
  // const theta = (10 * i * (Math.PI * 2)) / numPoints; // Угол "θ"
  const theta = (50 * i * (Math.PI * 2)) / numPoints; // Угол "θ"
  // const r = a + theta; // Расстояние "r" от начала координат
  const r = theta; // Расстояние "r" от начала координат

  positions[i * 3] = r * Math.cos(theta); // x-координата
  positions[i * 3 + 1] = r * Math.sin(theta); // y-координата
  positions[i * 3 + 2] = 20; // z-координата (по сфере это будет отредактировано)
  positions1[i * 3] = r * Math.cos(theta); // x-координата
  positions1[i * 3 + 1] = -r * Math.sin(theta); // y-координата
  // positions1[i * 3 + 2] = -0.95; // z-координата (по сфере это будет отредактировано)
  positions1[i * 3 + 2] = -20; // z-координата (по сфере это будет отредактировано)

  // Преобразование координат на поверхности сферы
  const vector = new THREE.Vector3(
    positions[i * 3],
    positions[i * 3 + 1],
    positions[i * 3 + 2]
  ).normalize();
  positions[i * 3] = vector.x;
  positions[i * 3 + 1] = vector.y;
  positions[i * 3 + 2] = vector.z;

  const vector1 = new THREE.Vector3(
    positions1[i * 3],
    positions1[i * 3 + 1],
    positions1[i * 3 + 2]
  ).normalize();
  positions1[i * 3] = vector1.x;
  positions1[i * 3 + 1] = vector1.y;
  positions1[i * 3 + 2] = vector1.z;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));
const material = new THREE.LineBasicMaterial({ color: 0xff9922, linewidth: 100});

// console.log(THREE);

// Создание спирали как линии
const spiral = new THREE.Line(geometry, material);
const spiral1 = new THREE.Line(geometry1, material);
scene.add(spiral, spiral1);

// Отрисовка сцены
var x=0, y=0, z=0;
// const animate = (x, y, z) => {
const animate = () => {
  requestAnimationFrame(animate);

  if (x) {
    spiral.rotation.x += x;
    spiral1.rotation.x += x;
  }

  if (y) {
    spiral.rotation.y += y;
    spiral1.rotation.y += y;
  }

  if (z) {
    spiral.rotation.z += z;
    spiral1.rotation.z += z;
  }
  // spiral.rotation.x += 0.01;
  // spiral.rotation.y += 0.01;
  // spiral.rotation.z += 0.1;

  // spiral1.rotation.x += 0.01;
  // spiral1.rotation.y += 0.01;
  // spiral1.rotation.z += 0.1;

  // spiral.rotation.x += x;
  // spiral.rotation.y += y;
  // spiral.rotation.z += z;

  // spiral1.rotation.x += x;
  // spiral1.rotation.y += y;
  // spiral.rotation.z += z;
  renderer.render(scene, camera);
};

// Обработка изменения размеров окна
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Обработка нажатия кнопки мыши
window.addEventListener("mousedown", () => {
  // animate(0.01, 0.01, 0.01);
  y = 0.1;
  animate();
});
// window.addEventListener("mouseup", () => {
//   // animate(0.01, 0.01, 0.01);
//   x = 0.01;
//   // y = 0.1;
//   // z = 0.1;
//   animate();
// });

// Обработка прокрутки колеса мыши
// window.addEventListener("wheel", () => {
//   // animate(0.01, 0.01, 0.01);
//   x = 0.01;
//   // y = 0.1;
//   // z = 0.1;
//   animate();
// });



// Запуск анимации
// animate();


// var scene = new THREE.Scene();
// var frontSpot = new THREE.SpotLight(0xeeeece);
// frontSpot.position.set(1000, 1000, 1000);
// scene.add(frontSpot);
// var frontSpot2 = new THREE.SpotLight(0xddddce);
// frontSpot2.position.set(-300, -300, -300);
// scene.add(frontSpot2);
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.TorusGeometry( 10, 3, 20, 100 );
// var material = new THREE.MeshPhongMaterial( {
// color: 0xdaa520,
// specular: 0xbcbcbc,
//  } );
// var mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// camera.position.z = 25;

// function render() {
//   requestAnimationFrame( render )
//   mesh.rotation.y += 0.01;
// 	mesh.rotation.z += 0.01;
//   renderer.render( scene, camera );
// }
// render();
