<template>
  <div class="app">
    <Header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  padding-top: 180px;
  padding-bottom: 180px;

  @media only screen and (min-width: 768px) {
    padding-top: 200px;
    padding-bottom: 200px;
  }
}
</style>
