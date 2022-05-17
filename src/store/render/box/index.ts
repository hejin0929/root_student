import { BoxGeometry } from "three";

class Box {
  root: BoxGeometry | undefined;
  width: number = 1;
  height: number = 1;
  depth: number = 1;
  constructor(data: number[] = [1, 1, 1]) {
    this.root = new BoxGeometry(...data);
  }
}

export default Box;
