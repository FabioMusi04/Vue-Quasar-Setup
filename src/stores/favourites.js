import { defineStore } from 'pinia';

export const useFavStore = defineStore('favourites', {
  state: () => ({
    favourite: [],
  }),
  getters: {
    favouriteItems() {
      return this.favourite;
    },
    isFavourite() {
      return (productid) => {
        return this.favourite.includes(productid);
      }
    }
  },
  actions: {
    /* addToFavourite(productid) {
      this.favourite.push(productid);
      console.log(this.favourite)
    },
    removeFromFavourite(productid) {
      this.favourite = this.favourite.filter(id => id !== productid);
    }, */
    toggleFavourite(productid) {
      if (this.favourite.includes(productid)) {
        this.favourite = this.favourite.filter(id => id !== productid);
      } else {
        this.favourite.push(productid);
      }
    }
  },
});
