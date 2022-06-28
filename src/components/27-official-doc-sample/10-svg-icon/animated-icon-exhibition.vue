<template>
  <section>
    <h2>Animated Icons</h2>
    <p class="info">
      Icons purchased from
      <a
        href="https://creativemarket.com/dianahlevnjak/1607119-Styled-stock-photography-icons"
        target="_blank"
        >Creative Market</a
      >, readied for animation with
      <a href="https://www.adobe.com/products/illustrator.html" target="_blank"
        >Adobe Illustrator</a
      >
      and <a href="https://jakearchibald.github.io/svgomg/" target="_blank">SVGOMG</a>
    </p>
    <p>Click on the icons below</p>
    <div>
      <ul>
        <li>
          <p>采用默认的尺寸配置: width=height=100px</p>
          <icon-scissors />
          <icon-heart-face />
          <icon-watch />
          <icon-palette />
        </li>
        <li>
          <p>
            组件虽然没有配置属性, 仍然可以自定义尺寸, 但是如果宽高不等, 则两者皆取小值,
            以保持正方形形状
          </p>
          <icon-scissors class="sci" />
          <icon-heart-face width="50" height="50" />
          <icon-watch width="60" height="80" />
          <icon-palette width="90" height="50" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  text-align: center;
  .sci {
    width: 40px;
    height: 70px;
  }
}
</style>
