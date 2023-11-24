import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.fraction = 0;
  }

  tick() {
    const delta = clock.getDelta();

    if (this.fraction < 1) this.fraction += 0.001;
    else this.fraction = 1;

    for (const object of this.updatables) {
      object.tick(delta, this.fraction);
    }
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
    this.fraction = 0;
  }
}

export { Loop };
