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

<script >
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
//import { currency } from "../api/currency";
import { currency } from "currency-js";
import { studentAsTopstoreKey } from "@/store/setup";

export default defineComponent({
  setup() {
    const store = useStore(studentAsTopstoreKey);

    //const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
    //@ts-ignore
    const checkoutStatus = computed(() => store.state.JsShoppingCart.cart.checkoutStatus);

    //const products = computed(() => store.getters["cart/cartProducts"]);
    const products = computed(() => store.getters[`JsShoppingCart/cart/cartProducts`]);

    //const total = computed(() => store.getters["cart/cartTotalPrice"]);
    const total = computed(() => store.getters[`JsShoppingCart/cart/cartTotalPrice`]);

    //const checkout = (products) => store.dispatch("cart/checkout", products);
    const checkout = (products) =>
      store.dispatch(`JsShoppingCart/cart/checkout`, products);

    return {
      currency,
      checkoutStatus,
      products,
      total,
      checkout,
    };
  },
});
</script>
