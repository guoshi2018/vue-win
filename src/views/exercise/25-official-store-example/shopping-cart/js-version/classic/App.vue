<template>
  <div class="buy">
    <h1>Shopping Cart Example</h1>
    <hr />
    <section class="shopping">
      <ProductList class="prod" />
      <ShoppingCart class="cart" />
    </section>
  </div>
</template>

<script>
import ProductList from "./ProductList.vue";
import ShoppingCart from "./ShoppingCart.vue";

export default {
  components: { ProductList, ShoppingCart },
};
</script>
<style lang="scss">
div.buy {
  display: flex;
  flex-direction: column;
  h1,
  h2 {
    text-align: center;
  }
  section.shopping {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .prod,
    .cart {
      width: 40%;
    }
  }
}
</style>
