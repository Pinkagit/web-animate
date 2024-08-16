# 网页动画

## 常见的网页动画类型

### gif、webp、apng
优点：
 - 简单易用，兼容性好（webp在Safari支持不好），支持透明背景

缺点: 
 - GIF格式最多只支持256种颜色，动画在转换为GIF格式时会失去很多细节和质量
 - GIF使用无损压缩，缺乏高效压缩算法，在帧数过多时，文件体积会很大
 - apng、webp（提供比GIF更高级的动画功能，同时保留PNG的所有优势，如透明度、无损压缩等）
 - 体积相比gif小，但仍然比较大
 - 软解，硬解支持有限，高CPU占用，浏览器对其的优化程度可能不如GIF来得成熟，低性能设备上，播放可能不够流畅

### 视频动画 
> 网页开发中常用的视频格式包括 MP4、WebM 和 Ogg，主要是由于其广泛的浏览器支持和良好的压缩效率。
优点：
 - 高画质
 - 现代视频解码器具有很高的压缩效率，相比gif可以在保持较高画质的同时大幅度减小文件大小

缺点：
  - 高分辨率视频文件仍然较大
  - 播放长视频，高CPU/GPU/内存占用
  - mp4兼容性较好但是没有透明通道，webm  Safari 不完全支持，mov 画质高适合专业视频制作，文件较大

### svg动画
> 基于XML的矢量图形格式

优点：
  - 可缩放：SVG 图像可以无损缩放，矢量图形具有无限的分辨率，不会因放大而失真,适用于各种设备和屏幕分辨率。
  - 文件体积相比gif、png小
  - SVG 可以通过 CSS 和 JavaScript 进行样式控制和动态操作。
  
缺点：
  - 高CPU占用：SVG 元素本质上是 HTML 文件中的 DOM 元素，变化触发浏览器的重绘和回流 。低性能设备上，大量的DOM节点和繁重的计算任务可能导致页面卡顿或掉帧
  - 复杂动画开发复杂度较高，不如直接使用js动画库

### 逐帧动画
> 通过在每一帧中绘制不同的图像来创建动画效果，更适合短时间，需要精确控制每一帧的细节情况下使用

实现方案：
  - css 通过animation 周期性地改变背景图像来模拟帧动画
  - js requestAnimationFrame 改变图片或者背景加载 或者 canvas逐帧渲染动画

优点：
  - 高度灵活，对每一帧进行精确控制
缺点：
  - 资源体积相比相同质量的视频格式较大，因为现代视频编解码器具有很高的压缩效率。

### 补间动画
> 开发设置好关键帧（Keyframes）中间帧由浏览器自动计算生成，从而实现平滑的过渡效果

实现方法：
  - css transition、animation
  - js requestAnimationFrame
  
优势：
  - 平滑过渡
  - 灵活可控制
  - 性能较好：可开启硬件加速，利用 GPU 加速渲染，提升性能

缺点：
 - 无法处理非线性动画，类似自然界中的随机运动、弹性运动以及其他非线性行为，都很难通过简单的补间动画实现

### 骨骼动画
> 通过定义对象的骨骼结构和关节，并控制骨骼的运动来驱动模型或图像的变形来实现动画

核心概念：
  - 骨骼：骨骼是由关节和连接这些关节的骨头组成的层次化结构。每个骨骼节点可以通过旋转、平移和缩放来控制其子节点的变形。
  - 蒙皮：将图像（如角色的身体部件）绑定到骨骼上，使得骨骼的变形能够影响图像的外观。
  - 关键帧：定义骨骼在特定时间点的位置、旋转和缩放。中间帧通过插值算法自动生成，从而形成平滑的动画过渡。

优点
  - 体积小：不同于逐帧动画，骨骼动画只需要存储骨骼的运动数据和一个网格文件，大大减少了磁盘和内存占用。
  - 灵活可控：可以实时调整骨骼的位置和角度，适应各种动态交互需求，如角色的行走、跑步、跳跃等连续动作。
  - 可重用性强：一个骨架可以绑定多个不同的网格，实现不同角色的动画，极大地提高了动画资源的复用率。
  - 支持复杂动作：实现如攀爬、抓取、跑动等复杂动作。
缺点：
  - 特别是在实时渲染场景中，骨骼动画的计算可能会增加CPU/GPU的负担。

### canvas动画
> Canvas提供了一个直接在像素级别进行绘图的环境，非常适合用于高性能、复杂的2D动画和游戏开发。

实现：绘制各种图形，在每一帧中清除画布，然后重新绘制新的内容

优点：
  - Canvas 提供了直接访问位图的能力，可以进行快速的像素级操作，非常适合需要高帧率的动画，比如游戏和实时数据可视化。
  - 高性能，Canvas使用硬件加速，在处理大量绘图操作时表现出色
  - 灵活高，可以完全控制每一帧每个像素的绘制过程，适合实现复杂动画和特效

缺点：
 - 开发成本较高，需要手动管理所有绘图状态和属性，相对复杂。
 - Canvas 内部的绘图是位图，不具备 DOM 元素的特性，无法直接绑定事件监听器，需要额外处理交互逻辑。

### 3D动画
> 常见的实现方法是利用HTML5 <canvas> 元素结合WebGL进行高效渲染。

## 复杂的动画播放

### 复杂动画播放方案

- GIF: 只支持8位颜色，颜色丢失严重，解码性能低，无法满足特效效果
- Apng, Webp: 能够满足特效效果，但文件大，软解效率低
- 视频方案: 
  - mp4 相比动图方案，有很高的压缩率，硬件解码效率很高,缺点很明显，无法支持透明背景
  - webm格式在Safari部分支持,视频不好逐帧控制

### 简单的实现页面播放透明背景视频

通过制作Alpha、rgb通道分离的视频素材，再重新实现Alpha通道和RGB通道的混合，从而实现在页面上播放带透明通道的视频
ps: 片段着色器通过将纹理映射范围划分为左右两部分，实现了分别从视频纹理的不同区域提取颜色和透明度。然后，将这两者合成为最终的像素颜色输出，实现了视频的透明效果。

### 各家实现方案

- [vap](https://github.com/Tencent/vap?tab=readme-ov-file)
  - mp4视频方案，在视频中额外开辟一块区域，在RGB通道里存储Alpha的值，最后利用OpenGL将这些数据合成为ARGB图像（带透明通道的图像）。
  - 支持配置信息协助播放（比如Alpha区域声明，包括融合动画信息），配置是JSON格式

- [lottie](https://airbnb.io/lottie/#/)
 1. 配套ae插件Bodymovin导出动画资源（json文件）
    > JSON 文件结构:
      assets: 包含图像或其他外部资源的信息。
      layers: 定义了每一帧中的各个图层及其属性。
      shapes: 描述了各个形状及其动画数据。
 2. 使用 Lottie 库加载 JSON 文件并进行渲染，以SVG 或者 Canvas 的方式绘画
  优点：跨平台
  缺点：
   - 不支持 蒙板、遮罩、粒子特效
   - 展示大动画时帧率较低

## wasm
> WebAssembly (简称Wasm) 是一种为现代Web浏览器设计的二进制指令格式，它提供了一种低层次的虚拟机以运行在浏览器环境中。
> 它允许开发者使用低级语言(如C/C++/go/rust)编写的代码在浏览器中近乎原生的速度运行。

- 高性能计算: 适合处理需要高度计算密集型任务的问题,突破JavaScript的性能瓶颈。现代浏览器中的WebAssembly引擎经过高度优化（94%的浏览器已经支持了WebAssembly），可以最大限度地减少执行时间和内存开销。Wasm 代码在加载时经过快速编译，随后在虚拟机上高效运行，不像 JavaScript 那样需要解释和即时编译。
- 体积小: Wasm模块是二进制格式，比源代码小得多，加载速度快
- 支持多线程操作
- 安全：Wasm运行在沙箱环境中，限制了对宿主环境的访问，保证了安全性。
- 跨平台兼容性

### Emscripten 
Emscripten是一个完整的 WebAssembly 开源编译器工具链。使用  Emscripten 可以将 C/C++ 代码或使用 LLVM 的任何其他语言编译为 WebAssembly，并在 Web、Node.js 或其他 Wasm 运行时上运行。

### 应用

1. Simple 渲染引擎（ Wasm + WebGL ）
以借助于 Wasm 的高性能计算，Wasm + WebGL 渲染引擎去渲染 Lottie 动画 动画图片（序列帧、Apng、WebP）的方案。

2. CanvasKit
CanvasKit 是一个高性能的 2D 图形渲染库，基于 c++的Skia 构建，并且利用 WebAssembly 技术将其引入到 Web 环境中。


### 案例
- 图形和游戏引擎
  - [Figma](https://www.figma.com/)
  - [Google Earth](https://earth.google.com/web/)
  - [Unity web game](https://play.unity.com/en/games/90e50848-823a-42a8-9d24-b25a7f60c47a/fps-webgl-demo)
  - [Doom 3](https://wasm.continuation-labs.com/d3demo/)
  - [Vscode](https://vscode.dev/)
  
- 多媒体处理
 - FFmpeg-wasm
 - 高性能WASM播放器