export const state = () => ({
  products: []
})

export const mutations = {
  add(state, product) {
    state.products.push({
      product,
      amount: 1
    })
  },
  increase(state, productId) {
    state.products = state.products.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          amount: item.amount + 1
        }
      }

      return item
    })
  },
  decrease(state, productId) {
    state.products = state.products.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          amount: item.amount + 1
        }
      }

      return item
    })
  },
  remove(state, productId) {
    const item = state.products.find(({ product }) => product.id === productId)
    state.products.splice(state.products.indexOf(item), 1)
  }
}
