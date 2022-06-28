<template>
  <div>
    <h2>Your Cart</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ currency(product.price) }} x
        {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ currency(total) }}</p>
    <p>
      <button :disabled="!products.length" @click="checkout(products)">Checkout</button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapGetters, createNamespacedHelpers } from "vuex";
//import { currency } from "../api/currency";
import { currency } from "currency-js";
//import { stores } from "../../../store-helper";

const carMapHelper = createNamespacedHelpers("JsShoppingCart/cart");
export default defineComponent({
  computed: {
    // ...mapState({
    //   checkoutStatus: (state) => state.cart.checkoutStatus,
    // }),
    // ...mapGetters("cart", {
    //   products: "cartProducts",
    //   total: "cartTotalPrice",
    // }),

    ...mapState({
      checkoutStatus: (state) => state.JsShoppingCart.cart.checkoutStatus,
    }),
    ...carMapHelper.mapGetters({
      products: "cartProducts",
      total: "cartTotalPrice",
    }),
  },
  methods: {
    currency,
    checkout(products) {
      // this.$store.dispatch("cart/checkout", products);
      this.$store.dispatch(`JsShoppingCart/cart/checkout`, products);
    },
  },
});
</script>
