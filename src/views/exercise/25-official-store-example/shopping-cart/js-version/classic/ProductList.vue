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
import { createNamespacedHelpers, mapState } from "vuex";
import { currency } from "../api/currency";
//import { stores } from "../../../store-helper";

const cartMapHelper = createNamespacedHelpers("JsShoppingCart/cart");
export default {
  computed: mapState({
    //products: (state) => state.products.all, //fail
    products: (state) => state.JsShoppingCart.products.all,
  }),
  methods: {
    //...mapActions("cart", ["addProductToCart"]),
    ...cartMapHelper.mapActions(["addProductToCart"]),
    currency,
  },
  // created() {
  //   console.log(this.$store);
  //   // this.$store.dispatch("products/getAllProducts");
  //   this.$store.dispatch(`JsShoppingCart/products/getAllProducts`);
  // },
};
</script>
