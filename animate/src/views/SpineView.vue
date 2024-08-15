<template>
  <div class="container" ref="container">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Application, Assets } from 'pixi.js';
import '@pixi/spine-pixi';
import { Spine, SpineDebugRenderer } from '@pixi/spine-pixi';
import { Controller } from '../utils/spine/Controller';
import { Scene } from '../utils/spine/Scene';
import { SpineBoy } from '../utils/spine/SpineBoy';

let spine: Spine;
const container = ref(null)

onMounted(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({ background: '#1099bb', resizeTo: window });

  // Then adding the application's canvas to the DOM body.
  container.value.appendChild(app.canvas);

  // Load the assets.
  await Assets.load([
    {
      alias: 'spineSkeleton',
      src: 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel',
    },
    {
      alias: 'spineAtlas',
      src: 'https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas',
    },
    {
      alias: 'sky',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/sky.png',
    },
    {
      alias: 'background',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/background.png',
    },
    {
      alias: 'midground',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/midground.png',
    },
    {
      alias: 'platform',
      src: 'https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png',
    },
  ]);

  // Create a controller that handles keyboard inputs.
  const controller = new Controller();

  // Create a scene that holds the environment.
  const scene = new Scene(app.screen.width, app.screen.height);

  // Create our character
  const spineBoy = new SpineBoy();

  // Adjust views' transformation.
  scene.view.y = app.screen.height;
  spineBoy.view.x = app.screen.width / 2;
  spineBoy.view.y = app.screen.height - scene.floorHeight;
  spineBoy.spine.scale.set(scene.scale * 0.32);

  const debugRenderer = new SpineDebugRenderer();
  debugRenderer.drawMeshHull = true;   // 网格外壳
  debugRenderer.drawMeshTriangles = true;    // 网格三角形
  debugRenderer.drawBones = true;   // 骨骼
  debugRenderer.drawPaths = true;     // 路径
  debugRenderer.drawBoundingBoxes = true;    // 绘制包围盒
  debugRenderer.drawClipping = true;   // 用于绘制裁剪区域
  debugRenderer.drawRegionAttachments = true;    // 用于绘制区域附件。
  // spineBoy.spine.debug = debugRenderer

  
  // Add scene and character to the stage.
  app.stage.addChild(scene.view, spineBoy.view);

  // Trigger character's spawn animation.
  spineBoy.spawn();

  // Animate the scene and the character based on the controller's input.
  app.ticker.add(() => {
    // Ignore the update loops while the character is doing the spawn animation.
    if (spineBoy.isSpawning()) return;

    // Update character's state based on the controller's input.
    spineBoy.state.walk = controller.keys.left.pressed || controller.keys.right.pressed;
    if (spineBoy.state.run && spineBoy.state.walk) spineBoy.state.run = true;
    else spineBoy.state.run = controller.keys.left.doubleTap || controller.keys.right.doubleTap;
    spineBoy.state.hover = controller.keys.down.pressed;
    if (controller.keys.left.pressed) spineBoy.direction = -1;
    else if (controller.keys.right.pressed) spineBoy.direction = 1;
    spineBoy.state.jump = controller.keys.space.pressed;

    // Update character's animation based on the latest state.
    spineBoy.update();

    // Determine the scene's horizontal scrolling speed based on the character's state.
    let speed = 1.25;

    if (spineBoy.state.hover) speed = 7.5;
    else if (spineBoy.state.run) speed = 3.75;

    // Shift the scene's position based on the character's facing direction, if in a movement state.
    if (spineBoy.state.walk) scene.positionX -= speed * scene.scale * spineBoy.direction;
  });
})

</script>

<style scoped></style>
