<script lang="ts">
export default {
  template: `
		<div>
			<input v-model="password"/>
			<div v-if="error" class='error'>{{error}}</div>
		</div>
	`,
  props: {
    minLength: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      password: "",
    };
  },
  computed: {
    error() {
      if (this.password.length < this.minLength) {
        return `Password must be at least ${this.minLength} characters`;
      }
      return "";
    },
  },
};
</script>
