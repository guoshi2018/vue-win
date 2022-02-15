<script lang="ts">
export default {
  template: `
			<nav>
					<a id="profile" href="http://www.sina.com">sina</a>
					<ul v-show="shouldShowDropdown" id="user-dropdown">
						<!-- dropdown content here -->
					</ul>
					<a v-if="admin" id="admin" href="https://www.baidu.com">baidu for admin</a>
			</nav>
			`,
  data() {
    return {
      admin: false,
      shouldShowDropdown: false,
    };
  },
};
</script>
