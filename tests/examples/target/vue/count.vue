<script lang="ts">
export default {
  template:
    '<button id="inc" @click="handleClick">Increment</button>' +
    '<label id="result">{{count}}</label>' +
    '<a href="#" id="dec" @click="handleComplexClick">complex-increment</a>',
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      console.log("button clicked.");
      this.count++;
      this.$emit("increment", this.count * 10);
    },
    handleComplexClick() {
      console.log("link clicked");
      this.count--;
      this.$emit(
        "subtract",
        {
          currentCount: this.count,
          isEven: this.count % 2 === 0,
          info: "hello,world",
        },
        "this is second arg",
        1988,
        12,
        25
      );
    },
  },
};
</script>
