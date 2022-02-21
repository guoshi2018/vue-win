<comments>
在blog-posts-one基础上,添加加载提示消息
expand it to make it display a fancy message while loading our posts!
</comments>
<template>
  <button :disabled="loading" @click="getPosts">Get posts</button>
  <p v-if="loading" role="alert">Loading your posts...</p>
  <ul>
    <li v-for="post in posts" :key="post.id" data-test="post">
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: null,
      loading: false,
    };
  },
  methods: {
    async getPosts() {
      this.loading = true;
      this.posts = await axios.get("/api/posts");
      this.loading = false;
    },
  },
};
</script>
