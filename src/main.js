import { World } from "./World/World";

let isRunning = false;

function main() {
  const container = document.querySelector("#scene-container");
  const world = new World(container);

  const button = document.querySelector("button");
  const buttonTextSpan = button.querySelector("span");

  button.addEventListener("click", () => {
    if (!isRunning) {
      world.start();
      buttonTextSpan.innerText = "Stop";
      isRunning = true;
    } else {
      world.stop();
      buttonTextSpan.innerText = "Start";
      isRunning = false;
    }
  });

  world.render();
  // world.start();
}

main();
