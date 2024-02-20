import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    cartCount() {
      return this.cart.length;
    },
    cartItems() {
      return this.cart;
    }
  },
  actions: {
    addToCart(productid) {
      this.cart.push(productid);
      console.log(this.cart)
    },
    removeFromCart(productid) {
      this.cart = this.cart.filter(id => id !== productid);
    },
    updateQuantity(productid, quantity) {
      /* dont add quantity prop check if number of ids is greater/equal/less of quantity and combine with the rest */
      this.cart = this.cart.filter(id => id !== productid);
      for (let i = 0; i < quantity; i++) {
        this.cart.push(productid);
      }
    }
  },
});
