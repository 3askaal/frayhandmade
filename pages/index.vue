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
      let canvasWidth = 800
      let canvasHeight = 800

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

        return {
          x: randomX,
          y: randomY,
          width: imageWidth,
          height: imageHeight
        }
      }

      const imageDoesntFit = (image) => {
        const imageCorners = getCorners(image)
        return placedImages.some((placedImage) => {
          const placedImageCorners = getCorners(placedImage)
          console.log(placedImageCorners)

          return Object.values(imageCorners).some((corner) => {
            return true &&
              corner.x < placedImageCorners.topLeft.x &&
              corner.y < placedImageCorners.topLeft.y &&
              corner.y > placedImageCorners.bottomRight.y &&
              corner.x > placedImageCorners.bottomRight.x;
          })
        })
      }

      images.forEach((image) => {
        let imageWidth = image.getAttribute('width')
        let imageHeight = image.getAttribute('height')

        // imageWidth = imageWidth < 500 ? imageWidth : 500
        imageWidth = 200
        // imageHeight = imageHeight < 500 ? imageHeight : 500
        imageHeight = 200

        let randomPositionedImage = calcRandomImagePositions(imageWidth, imageHeight)

        while (imageDoesntFit(randomPositionedImage)) {
          console.log('test 2')
          randomPositionedImage = calcRandomImagePositions(imageWidth, imageHeight)
        }

        image.style.position = 'absolute';
        image.style.maxWidth = imageWidth + 'px';
        image.style.maxHeight = imageHeight + 'px';
        image.style.left = randomPositionedImage.x + 'px';
        image.style.top = randomPositionedImage.y + 'px';
        console.log(image)
        this.$refs.body.appendChild(image)

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
  position: relative;
  border: 1px solid red;
}

.wp-block-image {
  opacity: 0;
}

.gallery--home {
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
