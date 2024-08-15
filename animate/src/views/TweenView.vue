<script setup lang="ts">
import { gsap } from "gsap-trial"
import { GSDevTools } from "gsap-trial/GSDevTools";
import { onMounted, ref } from "vue";

const nav = ref<any>(null)
const container = ref<any>(null)

let tl: gsap.core.Timeline

onMounted(() => {
  tl = gsap.timeline({ id: "timeline", paused: true })
  tl.to(".box01", {
    x: nav.value.offsetWidth,
    backgroundColor: "#f0c690",
    borderRadius: "50%",
    border: "5px solid grey",
    duration: 2,
    ease: "bounce",
    id: "box01"
  }).to(".box02", {
    x: nav.value.offsetWidth,
    backgroundColor: "#b37690",
    borderRadius: "50%",
    border: "25px solid grey",
    rotate: "135",
    duration: 1,
    id: "box02"
  })
  // GSDevTools.create({
  //   container: container.value,
  //   animation: tl
  // });
})

const play = () => {
  tl.play()
}

const pause = () => {
  tl.pause()
}

const resume = () => {
  tl.resume()
}

const reverse = () => {
  tl.reverse()
}

const restart = () => {
  tl.restart()
}

</script>

<template>
  <div class="container" ref="container">
    <div class="box01"></div>
    <div class="box02"></div>
    <div class="nav light" ref="nav">
      <button id="play" @click="play">play</button>
      <button id="pause" @click="pause">pause</button>
      <button id="resume" @click="resume">resume</button>
      <button id="reverse" @click="reverse">reverse</button>
      <button id="restart" @click="restart">restart</button>
    </div>
  </div>
</template>

<style scoped>
.box01 {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  margin-bottom: 20px;
}
.box02 {
  width: 100px;
  height: 100px;
  background-color: lightpink;
}

button {
  text-transform: none;
  margin: 0.25rem;
}

.nav.light {
  width: 1000px;
  padding-top: 2rem;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
