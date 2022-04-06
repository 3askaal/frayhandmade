<template>
  <div>
    <Hero v-if="videos.length" :videos="videos" />
    <div ref="body">
      <Section v-for="(block, index) in blocks" :key="index" :class="block.type">
        <div v-if="block.content.includes('gallery--home')" class="container--gallery" v-html="block.content" />
        <div v-else-if="block.content.includes('wp-block-video')" class="body__video" v-html="block.content" />
        <div v-else v-html="block.content" class="container--text"></div>
      </Section>
    </div>
  </div>
</template>

<script>
import { random, sample, forEach, shuffle } from 'lodash'

export default {
  layout: 'home',
  async mounted() {
    const pages = await this.$axios.$get(`${process.env.baseUrl}/wp-json/wp/v2/pages`)
    this.content = pages.find((page) => page.slug === 'home')?.content?.rendered

    const content = pages.find((page) => page.slug === 'home')?.content?.rendered
    const contentDoc = new DOMParser().parseFromString(content, 'text/html');

    const blocks = [...contentDoc.body.childNodes]
      .map((node) => node.outerHTML)
      .filter((html) => html !== undefined)
      .map((html) => {
        return {
          type: (html.includes('wp-block-video') && 'video') || (html.includes('gallery--home') && 'gallery') || 'text',
          content: html
        }
      })

    this.blocks = blocks.filter(({type}) => type !== 'video')

    const videoUrls = blocks
      .filter(({type}) => type === 'video')
      .map(({ content }) => content.match(/src=\"([^"]*)\"/)[1])

    this.$nextTick(() => {
      this.placeImages()
      this.placeVideos(videoUrls)
    })
  },
  data() {
    return {
      blocks: [],
      videos: []
    }
  },
  methods: {
    placeImages() {
      const galleryEl = this.$refs.body.querySelector('.gallery--home');

      let canvasWidth = this.$refs.body.getBoundingClientRect().width
      let canvasHeight = 800

      const images = shuffle(Array.prototype.slice.call(this.$refs.body.querySelectorAll('.wp-block-image img')))
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

      const getRandomImagePosition = (imageWidth, imageHeight) => {
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

      const imageDoesntFit = (image, offset = 0) => {
        const imageCorners = getPositions(image)

        return placedImages.some((placedImage) => {
          const placedImageCorners = getPositions(placedImage)

          return Object.values(imageCorners).some((corner) => {
            return corner.x > (placedImageCorners.topLeft.x - offset) &&
              corner.y > (placedImageCorners.topLeft.y - offset) &&
              corner.y < (placedImageCorners.bottomRight.y + offset) &&
              corner.x < (placedImageCorners.bottomRight.x + offset);
          })
        })
      }

      const formatSrcSet = (srcset, maxWidth) => {
        return srcset.split(',')
          .map((srcSetItem) => {
            return srcSetItem.trim().split(' ')
          })
          .filter(([srcUrl, width]) => {
            const realWidth = Number(width.replace('w', ''))
            return srcUrl.match(/(\d)+(x)(\d)+/g) && !srcUrl.includes('scaled') && realWidth < 400
          })
          .map(([srcUrl]) => srcUrl)
      }

      forEach(images, (image) => {
        let imageWidth = image.getAttribute('width')
        let imageHeight = image.getAttribute('height')

        const randomSizedImageUrl = sample(formatSrcSet(image.srcset, 350))
        const dimensions = randomSizedImageUrl.match(/(\d)+(x)(\d)+/g)[0].split('x')

        imageWidth = random(200, 300)
        imageHeight = random(200, 300)

        let randomPositionedImage = getRandomImagePosition(imageWidth, imageHeight)
        let tries = 0

        while (tries < 200 && imageDoesntFit(randomPositionedImage)) {
          randomPositionedImage = getRandomImagePosition(imageWidth, imageHeight)
          tries++
        }

        if (tries === 200) {
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
    },
    placeVideos(videoUrls) {
      this.videos = videoUrls
    }
  }
}
</script>

<style lang="scss">

.body {
  /* position: relative; */
}

.wp-block-video {
  display: none;
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
    width: auto;
    height: auto;
  }
}

.body__video {
  display: none;
}

.container--text {
  max-width: 720px;
  padding: 0 2rem;
  margin: 0 auto;
  display: block;
  height: 100%;
}

.container--gallery {
  /* padding: 0 ; */
}
</style>
