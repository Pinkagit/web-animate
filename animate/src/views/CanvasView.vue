<template>
  <div class="container">
    <canvas ref="canvasRef" width="800" height="400"></canvas>
    <button @click="playAnimation">Play Animation</button>
    <button @click="pauseAnimation">Pause Animation</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let context: CanvasRenderingContext2D | null = null;
const circles: Circle[] = [];
const numCircles = 50; // 圆圈数量
let animationFrameId: number;

class Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  dx: number;
  dy: number;

  constructor(x: number, y: number, radius: number, color: string, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  update(canvasWidth: number, canvasHeight: number) {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createCircles = () => {
  for (let i = 0; i < numCircles; i++) {
    const radius = Math.random() * 20 + 10;
    const x = Math.random() * (canvasRef.value!.width - radius * 2) + radius;
    const y = Math.random() * (canvasRef.value!.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;
    const color = randomColor();
    circles.push(new Circle(x, y, radius, color, dx, dy));
  }
};

const draw = () => {
  if (!context) return;
  
  context.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);

  circles.forEach(circle => {
    circle.draw(context!);
    circle.update(canvasRef.value!.width, canvasRef.value!.height);
  });

  animationFrameId = requestAnimationFrame(draw);
};

const playAnimation = () => {
  cancelAnimationFrame(animationFrameId);
  draw();
};

const pauseAnimation = () => {
  cancelAnimationFrame(animationFrameId);
};

onMounted(() => {
  context = canvasRef.value!.getContext('2d')!;
  createCircles();
  playAnimation(); // 默认开始动画
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}

canvas {
  border: 1px solid #000;
  display: block;
  margin: 0 auto;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
}
</style>
