<template>
  <q-card class="product-card">
    <q-card-section>
      <q-img :src="product.image" :alt="product.name" class="product-image" @click="details(product.id)"/>
    </q-card-section>
    <q-card-section class="product-details">
      <div class="product-title" @click="details(product.id)">{{ product.title }}</div>
      <div class="product-description">{{ product.description }}</div>
      <div class="product-actions">
        <q-btn flat label="Add to Cart" @click="addToCart(product.id)" />
        <q-icon name="favorite" :class='isFav(product.id) ? "text-red" : "text-black"'
        @click="handleFav(product.id)" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "src/stores/cart";
import { useFavStore } from "src/stores/favourites";

const props = defineProps({
  product: Object,
});

const router = useRouter()
const store = useCartStore()
const favStore = useFavStore()

function addToCart(productId) {
    store.addToCart(productId)
}

function details(id) {
    console.log("Details", id);
    router.push({ name: "product", params: { id: id } });
}

function isFav(id) {
    return favStore.isFavourite(id)
}

function handleFav(id) {
    console.log("Fav", id);
    favStore.toggleFavourite(id)
}
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 300px; /* Limit the maximum width */
  height: 100%; /* Ensure the card fills its container */
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%; /* Ensure the image fills its container */
  height: 200px; /* Set a fixed height for the image */
  object-fit: cover; /* Ensure the image covers its container */
}

.product-details {
  flex-grow: 1; /* Allow the details section to grow to fill the remaining space */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space between title, description, and actions */
}

.product-title {
  font-size: 18px;
  font-weight: bold;
}

.product-description {
  font-size: 14px;
  margin-top: 10px; /* Add some space between title and description */
}

.product-actions {
  margin-top: 10px; /* Add some space between description and actions */
}
</style>
