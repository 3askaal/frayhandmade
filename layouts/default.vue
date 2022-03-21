<template>
  <div class="app">
    <Header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

html,
body,
.app {
  /* max-width: 100%; */
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

body {
  background-color: $black;
  color: $white;
}

.container {
  max-width: 1000px;
  padding: 0 2rem;
  display: block;
  padding-top: 150px;
  height: 100%;
}
</style>
