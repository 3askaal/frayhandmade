<template>
  <div>
    <Section>
      <div ref="body" class="body" v-html="content" />
    </Section>
  </div>
</template>

<script>
import { times, random } from 'lodash'

export default {
  layout: 'home',
  async mounted() {
    const pages = await this.$axios.$get(`${process.env.baseUrl}/wp-json/wp/v2/pages`)
    this.content = pages.find((page) => page.slug === 'home')?.content?.rendered

    this.$nextTick(() => {
      const galleryEl = this.$refs.body.querySelector('.gallery--home');

      let canvasWidth = this.$refs.body.getBoundingClientRect().width
      let canvasHeight = 1000

      const images = Array.prototype.slice.call(this.$refs.body.querySelectorAll('.wp-block-image img'))
      const placedImages = []

      const getCorners = (image) => {
        return {
          topLeft: { x: image.x, y: image.y },
          topRight: { x: image.x + image.width, y: image.y },
          bottomLeft: { x: image.x, y: image.y + image.height },
          bottomRight: { x: image.x + image.width, y: image.y + image.height },
        }
      }

      const calcRandomImagePositions = (imageWidth, imageHeight) => {
        let randomX = random(0, (canvasWidth - imageWidth))
        let randomY = random(0, (canvasHeight - imageHeight))
        let randomRotate = random(-30, 30)

        return {
          x: randomX,
          y: randomY,
          width: imageWidth,
          height: imageHeight,
          rotate: randomRotate
        }
      }

      const imageDoesntFit = (image) => {
        const imageCorners = getCorners(image)

        return placedImages.some((placedImage) => {
          const placedImageCorners = getCorners(placedImage)

          return Object.values(imageCorners).some((corner) => {
            return corner.x > placedImageCorners.topLeft.x &&
              corner.y > placedImageCorners.topLeft.y &&
              corner.y < placedImageCorners.bottomRight.y &&
              corner.x < placedImageCorners.bottomRight.x;
          })
        })
      }

      images.forEach((image) => {
        let imageWidth = image.getAttribute('width')
        let imageHeight = image.getAttribute('height')

        // imageWidth = imageWidth < 500 ? imageWidth : 500
        // imageHeight = imageHeight < 500 ? imageHeight : 500
        imageWidth = 200
        imageHeight = 200

        let randomPositionedImage = calcRandomImagePositions(imageWidth, imageHeight)

        console.log(imageDoesntFit(randomPositionedImage))
        while (imageDoesntFit(randomPositionedImage)) {
          console.log('imageDoesntFit')
          randomPositionedImage = calcRandomImagePositions(imageWidth, imageHeight)
        }

        image.style.position = 'absolute';
        image.style.maxWidth = imageWidth + 'px';
        image.style.maxHeight = imageHeight + 'px';
        image.style.left = randomPositionedImage.x + 'px';
        image.style.top = randomPositionedImage.y + 'px';
        image.style.transform = `rotate(${randomPositionedImage.rotate}deg)`;

        galleryEl.appendChild(image)

        placedImages.push(randomPositionedImage)
      })
    })
  },
  data() {
    return {
      content: null
    }
  },
  methods: {}
}
</script>

<style lang="scss">

.body {
  /* position: relative; */

}

.wp-block-image {
  opacity: 0;
}

.gallery--home {
  position: relative;
  width: 100%;
  min-height: 800px;
  border: 1px solid red;

  .wp-block-gallery {
    display: flex;
    flex-wrap: wrap;
  }

  .wp-block-image {
    flex-basis: 25%;
    /* min-width: 25%; */
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>
