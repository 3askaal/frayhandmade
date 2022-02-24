<template>
  <div class="app">
    <Header />
    <Hero />
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
}

body {
  background-color: $black;
  color: $white;
}

.container {
  max-width: 800px;
  padding: 0 2rem;
  display: block;
  // display: flex;
  // flex-direction: column;
  // flex-grow: 1;
  // height: 100%;
}
</style>
