<template>
    <div v-show="productInfo.id" class="q-pa-xs col-xs-12 col-sm-6 col-md-4 items-center flex justify-center">
        <q-card class="product-card">
            <q-card-section>
                <q-img
                    :src="productInfo.image"
                    :alt="productInfo.name"
                    class="product-image"
                />
            </q-card-section>
            <q-card-section class="product-details">
                <div class="product-title">
                    {{ productInfo.title }}
                </div>
                <div class="product-description">{{ productInfo.description }}</div>
                <div class="product-price">
                    <span class="product-price-label">Price:</span>
                    <span class="product-price-value"> {{ productInfo.price }}$</span>
                </div>
                <div class="product-actions">
                    <q-btn flat label="Add to Cart" @click="addToCart(productInfo.id)" />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "src/stores/cart";

/* const props = defineProps({
    product: Object,
}); */

const router = useRouter();
const store = useCartStore();
const productInfo = ref({});

async function fetchProduct(productId) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await response.json();
    productInfo.value = data;
}

onMounted(async () => {
    const ProductId = router.currentRoute.value.params.id;
    await fetchProduct(ProductId);
});

function addToCart(productId) {
    store.addToCart(productId);
    router.push({ name: "cart" });
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
