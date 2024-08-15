import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { gsap } from "gsap-trial";

/* The following plugin is a Club GSAP perk */
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin"
import { GSDevTools } from "gsap-trial/GSDevTools"

gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(GSDevTools) 

const app = createApp(App)

app.use(router)

app.mount('#app')
