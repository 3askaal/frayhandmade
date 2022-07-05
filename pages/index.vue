<template>
  <div class="page">
    <Hero v-if="videos.length" :videos="videos" />
    <div class="wrapper" ref="body">
      <Section v-for="(block, index) in blocks" :key="index" :class="block.type">
        <div v-if="block.gallery" class="gallery">
          <img v-for="(image, index) in block.images" :src="baseUrl + image.url" :style="image.style" :key="`image-${index}`" />
        </div>
        <div v-else v-html="block" class="container--text" />
      </Section>
    </div>
  </div>
</template>

<script>
import { random, sampleSize } from 'lodash'

export default {
  layout: 'home',
  async mounted() {
    const data = await this.$api.get('home-page')

    this.videos = data.hero.data.map(({ url }) => url)

    this.blocks = data.content.split('___')

    if (data.gallery.data) {
      const imageUrls = sampleSize(data.gallery.data, 20).map(({ formats }) => formats.small.url)

      const galleryIndexItem = this.blocks.findIndex((block) => block.includes('[gallery]'))

      const images = this.formatImages(imageUrls).filter((image) => image !== null)

      this.blocks[galleryIndexItem] = { gallery: true, images }
    }
  },
  data() {
    return {
      blocks: [],
      videos: [],
      images: [],
    }
  },
  methods: {
    formatImages(imageUrls) {
      let canvasWidth = this.$refs.body.getBoundingClientRect().width
      let canvasHeight = imageUrls.length * 50

      const placedImages = []

      const getPositions = (image) => {
        return {
          topLeft: { x: image.x, y: image.y },
          topRight: { x: image.x + image.width, y: image.y },
          bottomLeft: { x: image.x, y: image.y + image.height },
          bottomRight: { x: image.x + image.width, y: image.y + image.height },
          middle: { x: image.x + Math.floor(image.width / 2), y: image.y + Math.floor(image.height / 2) }
        }
      }

      const getRandomImagePosition = () => {
        const imageWidth = random(200, Math.floor(canvasWidth / 3))
        const imageHeight = random(200, Math.floor(canvasHeight / 3))
        const randomX = random(0, (canvasWidth - imageWidth))
        const randomY = random(0, (canvasHeight - imageHeight))
        const randomRotate = random(-30, 30)

        return {
          x: randomX,
          y: randomY,
          width: imageWidth,
          height: imageHeight,
          rotate: randomRotate
        }
      }

      const imageDoesntFit = (image, offset = 0) => {
        const imageCorners = getPositions(image)

        const cornerY = 100
        const cornerX = 100

        const hitsCorner = Object.values(imageCorners).some((corner) => {
          return false ||
            (corner.x < cornerX && corner.y < cornerY) || // topLeft
            (corner.x > (canvasWidth - cornerX) && corner.y < cornerY) || // topRight
            (corner.x < cornerX && corner.y > (canvasHeight - cornerY)) || // bottomLeft
            (corner.x > (canvasWidth - cornerX) && corner.y < (canvasHeight - cornerY)) // bottomRight
        })

        const hitsImage = Object.values(imageCorners).some((corner) => {
          return placedImages.some((placedImage) => {
            const placedImageCorners = getPositions(placedImage)

            return corner.x > (placedImageCorners.topLeft.x - offset) &&
              corner.y > (placedImageCorners.topLeft.y - offset) &&
              corner.y < (placedImageCorners.bottomRight.y + offset) &&
              corner.x < (placedImageCorners.bottomRight.x + offset);
          })
        })

        return hitsCorner || hitsImage
      }

      return imageUrls.map((url) => {
        let randomPositionedImage = getRandomImagePosition()
        let tries = 0

        while (imageDoesntFit(randomPositionedImage) && tries < 100) {
          randomPositionedImage = getRandomImagePosition()
          tries++
        }

        if (tries === 200) {
          return null
        }

        placedImages.push(randomPositionedImage)

        return {
          url,
          style: {
            position: 'absolute',
            maxWidth: randomPositionedImage.width + 'px',
            maxHeight: randomPositionedImage.height + 'px',
            left: randomPositionedImage.x + 'px',
            top: randomPositionedImage.y + 'px',
            transform: `rotate(${randomPositionedImage.rotate}deg)`,
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}

.gallery {
  position: relative;
  width: 100%;
  min-height: 800px;
  margin-bottom: 200px;
}

.body__video {
  display: none;
}
</style>
