import { PerspectiveCamera } from "three";

class Gamera {
  width: number = 100;
  height: number = 100;
  root: PerspectiveCamera | undefined;

  constructor() {
    this.root = new PerspectiveCamera(45, this.width, 1, 1000);
  }
}

export default Gamera;
