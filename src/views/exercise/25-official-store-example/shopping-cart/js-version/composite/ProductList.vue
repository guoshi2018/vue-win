<template>
  <div>
    <h2>Products</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ currency(product.price) }}
        <br />
        <button
          :disabled="!product.inventory"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { currency } from "../api/currency";

export default {
  setup() {
    const store = useStore();

    //const products = computed(() => store.state.products.all)
    const products = computed(() => store.state.JsShoppingCart.products.all);

    //const addProductToCart = (product) => store.dispatch('cart/addProductToCart', product)
    const addProductToCart = (product) =>
      store.dispatch(`JsShoppingCart/cart/addProductToCart`, product);

    //store.dispatch("products/getAllProducts");
    //store.dispatch(`JsShoppingCart/products/getAllProducts`);

    return {
      products,
      addProductToCart,
      currency,
    };
  },
  // computed: mapState({
  //   products: state => state.products.all
  // }),
  // methods: mapActions('cart', [
  //   'addProductToCart'
  // ]),
  // created () {
  //   this.$store.dispatch('products/getAllProducts')
  // }
};
</script>
