import Box from "@/store/render/box";
import Gamera from "@/store/render/gamera";
import { makeAutoObservable } from "mobx";
import * as THREE from "three";
<<<<<<< HEAD
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
=======
import { BoxGeometry, Object3D } from "three";
>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09

class RenderStore {
  app: React.MutableRefObject<any> | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // render(element: React.MutableRefObject<any>) {
  //   if (element.current.childNodes[0]) {
  //     element.current.removeChild(element.current.childNodes[0]);
  //   }
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     element.current.clientWidth / element.current.clientHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(element.current.clientWidth, element.current.clientHeight);
  //   element.current.appendChild(renderer.domElement);

  //   const geometry = new THREE.BoxGeometry();
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  //   camera.position.z = 5;

  //   const camera2 = new THREE.PerspectiveCamera(
  //     45,
  //     window.innerWidth / window.innerHeight,
  //     1,
  //     500
  //   );
  //   camera.position.set(0, 0, 100);
  //   camera.lookAt(0, 0, 0);

  //   const material2 = new THREE.LineBasicMaterial({ color: 0x0000ff });

  //   const points = [];
  //   points.push(new THREE.Vector3(-10, 0, 0));
  //   points.push(new THREE.Vector3(0, 10, 0));
  //   points.push(new THREE.Vector3(10, 0, 0));

  //   const geometry2 = new THREE.BufferGeometry().setFromPoints(points);

  //   const line = new THREE.Line(geometry2, material2);
  //   scene.add(line);

  //   function animate() {
  //     requestAnimationFrame(animate);
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //   }
  //   animate();
  // }

  render(element: React.MutableRefObject<any>) {
<<<<<<< HEAD
    // console.log(element.current.width);

    /**
     * 创建场景对象Scene
     */
=======
>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
<<<<<<< HEAD
=======
    console.log(geometry);

>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
<<<<<<< HEAD

    // 球体网格模型
    var geometry2 = new THREE.SphereGeometry(60, 40, 40);
    var material2 = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
    });
    var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh

    scene.add(mesh2);

    mesh2.translateY(100);

    var axisHelper = new THREE.AxesHelper(250);
    scene.add(axisHelper);

=======
>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
<<<<<<< HEAD
    point.position.set(0, 0, 0); //点光源位置
=======
    point.position.set(400, 200, 300); //点光源位置
>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
<<<<<<< HEAD
    element.current.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);

    // const active = () => {
    //   mesh.rotateY(0.1);
    //   mesh.rotateX(0.1);

    //   renderer.render(scene, camera);
    //   requestAnimationFrame(active);
    // };

    function render() {
      renderer.render(scene, camera); //执行渲染操作
    }

    render();

    // requestAnimationFrame(active);
    var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
    controls.addEventListener("change", render); //监听鼠标、键盘事件
=======
    // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    element.current.appendChild(renderer.domElement);
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
>>>>>>> d174cae17f96c508eed9a1dacaa989a0b2362d09
  }
}

export default RenderStore;
