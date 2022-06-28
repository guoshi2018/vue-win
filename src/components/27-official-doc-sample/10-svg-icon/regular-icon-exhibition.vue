<template>
  <section>
    <h2>Regular Icons</h2>
    <p class="info">
      All found on <a href="https://icomoon.io/" target="_blank">Icomoon</a>, using the
      Vicons set
    </p>
    <p>
      <!--you can pass in a smaller width and height as props-->
      <icon-base width="12" height="12" icon-name="write"><icon-write /></icon-base>
      <!--or you can use the default, which is 18-->
      <icon-base icon-name="write"><icon-write /></icon-base>
      <!--or make it a little bigger too :) -->
      <icon-base width="30" height="30" icon-name="write"><icon-write /></icon-base>
      <br />
      You can make inline icons of any size by passing props.
    </p>
    <p style="color: red">
      <!--you can change the color of the text, and the icons will automatically change color as well-->
      <icon-base icon-name="moon"><icon-moon /></icon-base>
      These red inline icons are automatically styled according to the text color.
    </p>
    <p>
      <!--because the base is consistent, you can use multiple icons on the same line and they're all in order-->
      <icon-base icon-name="moon"><icon-moon /></icon-base>
      <icon-base icon-name="write"><icon-write /></icon-base>
      <icon-base icon-name="image"><icon-image /></icon-base>
      <icon-base icon-name="garbage"><icon-garbage /></icon-base>
      <icon-base icon-name="calendar"><icon-calendar /></icon-base>
      <icon-base icon-name="envelope"><icon-envelope /></icon-base>
      <br />
      <icon-base><icon-box /></icon-base>
      You can use whatever icon you want and keep the base consistent with slots
    </p>
  </section>
</template>
<style lang="scss" scoped>
section {
  padding: 20px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #eee;
  text-align: center;
  h2 {
    margin-bottom: 0;
  }
  p.info {
    margin-top: 0;
    font-family: "Lato", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    color: #949090;
    a,
    a:visited,
    a:hover {
      color: #949090;
      text-decoration: none;
      font-weight: 700;
    }
  }
}
</style>
