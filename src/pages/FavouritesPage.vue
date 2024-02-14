<template>
    <div class="">
        <q-page padding class="">
            <q-table flat bordered grid title="Favourites Products" :rows="products" row-key="name" :filter="filter">
                <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                        <q-card class="product-card">
                            <q-card-section>
                              <q-img :src="props.row.image" :alt="props.row.name" class="product-image" />
                            </q-card-section>
                            <q-card-section class="product-details">
                              <div class="product-title">{{ props.row.title }}</div>
                              <div class="product-description">{{ props.row.description }}</div>
                            </q-card-section>
                          </q-card>
                    </div>
                </template>
            </q-table>
        </q-page>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useFavStore } from "src/stores/favourites";

const products = ref([]);
const favStore = useFavStore();

async function fetchProducts() {
    for (let i = 0; i < favStore.favouriteItems.length; i++) {
        const response = await fetch(`https://fakestoreapi.com/products/${favStore.favouriteItems[i]}`);
        const data = await response.json();
        products.value.push(data);
    }
}

onMounted(async () => {
    await fetchProducts();
});


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
