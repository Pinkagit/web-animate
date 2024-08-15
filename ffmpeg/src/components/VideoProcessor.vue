<template>
  <div>
    <h1>Upload and Process Video</h1>
    <form @submit.prevent="processVideo">
      <input type="file" id="video-upload" accept="video/*" @change="handleFileChange" required>
      <button type="submit">Process Video</button>
    </form>
    <div v-if="processedVideoUrl">
      <h2>Processed Video:</h2>
      <a :href="processedVideoUrl" download="processed_video.mp4">Download Processed Video</a>
    </div>
    <p class="message-box">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'

export default {
  setup() {
    const videoFile = ref(null);
    const processedVideoUrl = ref('');
    const message = ref('Click Start to Processing')

    const handleFileChange = (event) => {
      videoFile.value = event.target.files[0];
    };

    const processVideo = async () => {
      if (!videoFile.value) return;

      message.value = 'Loading ffmpeg-core.js'

      const ffmpeg = new FFmpeg()

      ffmpeg.on('log', ({ message: msg }) => {
        console.log(msg)
        message.value = msg
      })

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
      });
      message.value = 'Start processing'

      // 将文件写入FFmpeg虚拟文件系统
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile.value))

      // 使用FFmpeg命令过滤掉黑色背景，提取RGB视频
      await ffmpeg.exec(['-i', 'input.mp4', '-vf', 'chromakey=black:0.1:0.2', 'rgb_output.mp4']);

      // 提取Alpha通道视频
      await ffmpeg.exec(['-i', 'input.mp4', '-vf', "format=gray,geq='if(gt(lum(X,Y),16),255,0)'", 'alpha_output.mp4']);

      // 拼接rgb、alpha视频
      await ffmpeg.exec(['-i', 'rgb_output.mp4', '-i', 'alpha_output.mp4', '-filter_complex', '[0:v][1:v]hstack=inputs=2', 'combined_output.mp4']);
      message.value = 'Complete processing'

      // 读取生成的输出文件
      const data = await ffmpeg.readFile('combined_output.mp4');
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      processedVideoUrl.value = URL.createObjectURL(blob);
    };

    return {
      videoFile,
      processedVideoUrl,
      handleFileChange,
      processVideo,
      message
    };
  }
};
</script>

<style scoped>
/* 添加一些简单的样式 */
form {
  margin-bottom: 20px;
}
button {
  margin-top: 10px;
}
.message-box {
  width: 700px;
}
</style>