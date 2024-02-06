<template>
  <div class="cart-page">
    <h1>Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>
              <input
                type="number"
                v-model="item.quantity"
                min="1"
                @change="updateQuantity(item)"
              />
            </td>
            <td>{{ item.price * item.quantity }}</td>
            <td>
              <button @click="removeItem(item)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <p>Number of items: {{ calculateNumberOfItems() }}</p>
        <p>Total: {{ calculateTotal() }}</p>
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "src/stores/cart";

const cartItems = ref([
  /*  { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 2 },
    { id: 3, name: 'Product 3', price: 15, quantity: 1 }, */
]);

const store = useCartStore();

function updateQuantity(item) {
  if (item.quantity < 1) {
    item.quantity = 1;
  } else {
    store.updateQuantity(item.id, item.quantity);
  }
}

function removeItem(item) {
  store.removeFromCart(item.id);
  cartItems.value = cartItems.value.filter((product) => product.id !== item.id);
}

function calculateTotal() {
  return this.cartItems.reduce((total, product) => total + product.price, 0);
}

function calculateNumberOfItems() {
  return store.cartCount;
}

function checkout() {
  // Implement your checkout logic here
}

onMounted(async () => {
  console.log(store.cartItems);
  for (const item of store.cartItems) {
    const response = await fetch(`https://fakestoreapi.com/products/${item}`);
    const data = await response.json();
    data.quantity = 1;
    if (
      cartItems.value.find((product) => product.id === data.id) === undefined
    ) {
      cartItems.value.push(data);
    } else {
      cartItems.value.find((product) => product.id === data.id).quantity += 1;
    }
  }
});

//Uncaught (in promise) SyntaxError: Unexpected end of JSON input
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  text-align: left;
}

input[type="number"] {
  width: 50px;
}

.cart-summary {
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
