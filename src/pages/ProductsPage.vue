<template>
  <div class="">
    <q-page padding class="">
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
        label="search"
      />
      <q-table
        flat
        bordered
        grid
        title="Products"
        :rows="products"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <ProductCard :product="props.row"></ProductCard>
          </div>
        </template>
      </q-table>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "src/components/ProductCard.vue";

const products = ref([]);
const filter = ref("");

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  products.value = data;
}

onMounted(async () => {
  await fetchProducts();
});


</script>
