import { BoxGeometry, Object3D } from "three";

class Box {
  root: Object3D<Event> | BoxGeometry | undefined;
  width: number = 1;
  height: number = 1;
  depth: number = 1;
  constructor(data: number[] = [1, 1, 1]) {
    this.root = new BoxGeometry(...data);
  }
}

export default Box;
