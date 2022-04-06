<template>
  <div class="hero">
    <video id="video" autoplay loop muted data-setup="{}">
      <source :src="videos[0]" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  props: ['videos'],
  mounted() {
    this.$nextTick(() => {
      videojs('video', {}, function onPlayerReady() {
        const player = this.play()

				if (player !== null) {
					player.then(() => {})

          player.catch(() => {})
        }
      });
    })
  }
}
</script>

<style lang="scss">
.hero {
  position: relative;
  top: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  opacity: .6;
  filter: grayscale(1);
}

video {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

[class^="vjs-"] {
  display: none;
}

.vjs-playing {
  display: block !important;

  * {
    display: none;
  }

  video {
    display: block;
  }
}
</style>
