import Box from "@/store/render/box";
import Gamera from "@/store/render/gamera";
import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { Object3D } from "three";

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
    if (element.current.childNodes[0]) {
      element.current.removeChild(element.current.childNodes[0]);
    }

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(element.current.clientWidth, element.current.clientHeight);

    element.current.appendChild(renderer.domElement);

    /// ---> >>>
    const scene = new THREE.Scene();

    const box = new Box();

    scene.add(box.root as Object3D);

    const gamera = new Gamera();

    function animate() {
      // requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, gamera.root as any);
    }
    animate();
  }
}

export default RenderStore;
