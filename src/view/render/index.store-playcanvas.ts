import { makeAutoObservable } from "mobx";
import * as pc from "playcanvas";

class RenderStore {
  app: React.MutableRefObject<any> | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  render(element: React.MutableRefObject<any>) {
    // var app = new PC.Application(element.current, {});
    const app = new pc.Application(element.current);

    // 在全屏模式下填满可用空间
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    // 确保在窗口尺寸变化同时画布也同时改变其大小
    window.addEventListener("resize", () => app.resizeCanvas());

    // 创建一个立方体
    const box = new pc.Entity("cube");
    box.addComponent("model", {
      type: "box",
    });
    // app.root.addChild(box);

    // 创建一个摄像头
    const camera = new pc.Entity("camera");
    camera.addComponent("camera", {
      clearColor: new pc.Color(0.1, 0.1, 0.1),
    });
    app.root.addChild(camera);
    camera.setPosition(0, 0, 3);

    // 创建一个指向灯
    const light = new pc.Entity("light");
    light.addComponent("light");
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);

    // 根据立方体的时间增量旋转立方体
    app.on("update", (dt) => box.rotate(10 * dt, 20 * dt, 30 * dt));

    const cubeCloned: any = box.clone();

    cubeCloned.model.model.generateWireframe();
    cubeCloned.model.model.meshInstances.forEach((mi: any) => {
      mi.renderStyle = 1;
      mi.material = mi.material.clone();
      mi.material.diffuse.set(0, 0, 0, 0);
      mi.material.specular.set(0, 0, 0, 0);
      mi.material.shininess = 0;
      mi.material.emissive.set(1, 0, 0, 1);
      mi.material.update();
    });

    box.addChild(cubeCloned);

    const box2 = new pc.Entity("cube");

    box2.addComponent("model", {
      type: "sphere",
    });

    var e = box2.getLocalEulerAngles();
    box2.setLocalEulerAngles(e.x, e.y + 90, e.z);

    box2.setPosition(0, 1, 0);

    console.log(box2.getPosition());

    app.root.addChild(box2);

    app.start();
  }
}

export default RenderStore;
