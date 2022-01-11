<template>
  <div class="hero">
    <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
  </div>
</template>

<script>

export default {
  mounted() {
    this.playVideo()
  },
  data() {
    return {
      videoId: 'CrrApVUfVxk',
      playerVars: {
        autoplay: 1,

      },
    }
  },
  methods: {
    playVideo() {
      this.player.mute()
      this.player.playVideo()
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
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

iframe {
  display: block;
  position: absolute;
  width: 180%;
  height: 180%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (min-width: 768px) {
    min-height: 250%;
    min-width: 250%;
  }

  @media only screen and (min-width: 960px) {
    min-height: 180%;
    min-width: 160%;
  }
}
</style>
