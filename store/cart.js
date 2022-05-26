
const setSessionStorage = (data) => sessionStorage.setItem('cart', JSON.stringify(data));
const getSessionStorage = () => JSON.parse(sessionStorage.getItem('cart'));

export const state = () => ({
  products: getSessionStorage() || []
})

export const mutations = {
  add(state, product) {
    state.products.push({
      product,
      amount: 1
    })

    setSessionStorage(state.products)
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

    setSessionStorage(state.products)
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

    setSessionStorage(state.products)
  },
  remove(state, productId) {
    const item = state.products.find(({ product }) => product.id === productId)
    state.products.splice(state.products.indexOf(item), 1)

    setSessionStorage(state.products)
  }
}
