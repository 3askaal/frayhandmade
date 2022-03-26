<template>
  <div>
    <Section>
      <div ref="body" class="body" v-html="content" />
    </Section>
  </div>
</template>

<script>
import { random, sample, forEach } from 'lodash'

export default {
  layout: 'home',
  async mounted() {
    const pages = await this.$axios.$get(`${process.env.baseUrl}/wp-json/wp/v2/pages`)
    this.content = pages.find((page) => page.slug === 'home')?.content?.rendered

    this.$nextTick(() => {
      const galleryEl = this.$refs.body.querySelector('.gallery--home');

      let canvasWidth = this.$refs.body.getBoundingClientRect().width
      let canvasHeight = 800

      const images = Array.prototype.slice.call(this.$refs.body.querySelectorAll('.wp-block-image img'))
      const placedImages = []

      const getPositions = (image) => {
        return {
          topLeft: { x: image.x, y: image.y },
          topRight: { x: image.x + image.width, y: image.y },
          bottomLeft: { x: image.x, y: image.y + image.height },
          bottomRight: { x: image.x + image.width, y: image.y + image.height },
          middle: { x: image.x + (image.width / 2), y: image.y + (image.height / 2) }
        }
      }

      const calcRandomImagePosition = (imageWidth, imageHeight) => {
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
        const imageCorners = getPositions(image)

        return placedImages.some((placedImage) => {
          const placedImageCorners = getPositions(placedImage)

          return Object.values(imageCorners).some((corner) => {
            return corner.x > (placedImageCorners.topLeft.x - 10) &&
              corner.y > (placedImageCorners.topLeft.y - 10) &&
              corner.y < (placedImageCorners.bottomRight.y + 10) &&
              corner.x < (placedImageCorners.bottomRight.x + 10);
          })
        })
      }

      const formatSrcSet = (srcset, maxWidth) => {
        return srcset.split(',')
          .map((srcSetItem) => {
            return srcSetItem.trim().split(' ')
          })
          .filter(([srcUrl, width]) => {
            return srcUrl.match(/(\d)+(x)(\d)+/g) && !srcUrl.includes('scaled')
          })
          .filter(([srcUrl]) => {
            const dimensions = srcUrl.match(/(\d)+(x)(\d)+/g)[0].split('x')
            return dimensions.every((dimension) => Number(dimension) < maxWidth)
          })
          .map(([srcUrl]) => srcUrl)
      }

      forEach(images, (image) => {
        let imageWidth = image.getAttribute('width')
        let imageHeight = image.getAttribute('height')
        // console.log(image.srcset)
        const randomSizedImageUrl = sample(formatSrcSet(image.srcset, 500))
        console.log(randomSizedImageUrl)

        const dimensions = randomSizedImageUrl.match(/(\d)+(x)(\d)+/g)[0].split('x')

        console.log(dimensions)
        imageWidth = 200
        imageHeight = 200

        console.log(imageWidth, imageHeight)

        let randomPositionedImage = calcRandomImagePosition(imageWidth, imageHeight)
        let tries = 0

        while (imageDoesntFit(randomPositionedImage) && tries < 100) {
          randomPositionedImage = calcRandomImagePosition(imageWidth, imageHeight)
          tries++
        }

        if (tries === 100) {
          return
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
