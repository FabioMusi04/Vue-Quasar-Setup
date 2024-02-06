<template>
    <div v-show="productInfo.id" class="product-page">
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

const props = defineProps({
    product: Object,
});

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
.product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.product-card {
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
}

.product-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.product-description {
    margin-bottom: 10px;
}

.product-price {
    margin-bottom: 10px;
}

.product-price-label {
    font-weight: bold;
}

.product-actions {
    display: flex;
    justify-content: flex-end;
}
</style>
