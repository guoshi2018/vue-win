<template>
  <div id="demo">
    <h1>Latest Vue.js Commits</h1>
    <template v-for="branch in branches" :key="branch">
      <input
        type="radio"
        :id="branch"
        :value="branch"
        name="branch"
        v-model="currentBranch"
      />
      <label :for="branch">{{ branch }}</label>
    </template>
    <p>vuejs/vue@{{ currentBranch }}</p>
    <ul v-if="commits.length">
      <li v-for="record in commits" :key="record.sha">
        <a :href="record.html_url" target="_blank" class="commit">
          {{ record.sha.slice(0, 7) }}
        </a>
        -
        <span class="message">{{ truncate(record.commit.message) }}</span>
        <br />
        by
        <span class="author">
          <a :href="record.author.html_url" target="_blank">
            {{ record.commit.author.name }}
          </a>
        </span>
        at
        <span class="date">{{ formatDate(record.commit.author.date) }}</span>
      </li>
    </ul>
    <h3 v-else>ohoh, failed to get github branches.</h3>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { print } from "@/common/mixins/func";
import { string } from "yargs";
const debug = true;

//const apiURL = "https://api.github.com/repos/vuejs/vue/commits?per_page=3";

type Author = {
  name: string;
  date: string;
  html_url: string;
};
type Commit = {
  message: string;
  author: Author;
};
type CommitRecord = {
  html_url: string;
  sha: string;
  commit: Commit;
  author: Author;
};

export default defineComponent({
  //#region 原版
  // data: function () {
  //   return {
  //     branches: ["master", "dev"],
  //     currentBranch: "master",
  //     commits: null,
  //   };
  // },

  // created: function () {
  //   this.fetchData();
  // },

  // watch: {
  //   currentBranch: "fetchData",
  // },

  // methods: {
  //   truncate: function (v) {
  //     var newline = v.indexOf("\n");
  //     return newline > 0 ? v.slice(0, newline) : v;
  //   },
  //   formatDate: function (v) {
  //     return v.replace(/T|Z/g, " ");
  //   },
  //   fetchData: function () {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("GET", apiURL + this.currentBranch);
  //     xhr.onload = () => {
  //       this.commits = JSON.parse(xhr.responseText);
  //       console.log(this.commits[0].html_url);
  //     };
  //     xhr.send();
  //   },
  // },
  //#endregion

  props: {
    apiUrl: {
      type: String,
      default: "",
      required: true,
    },
  },
  setup(props, context) {
    const branches = ref<string[]>(["master", "dev"]);
    const currentBranch = ref("master");
    const commits = ref<CommitRecord[]>([]);

    const fetchData = function () {
      commits.value.length = 0;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", props.apiUrl + currentBranch.value);
      xhr.onload = () => {
        const o = JSON.parse(xhr.responseText);
        print(debug, "receive:", o);
        if (o.message != "Not Found") {
          commits.value.push(...o);
          print(debug, "current commits:", commits.value);
        }
      };
      xhr.send();
    };

    const formatDate = (dateStr: string) => dateStr.replace(/T|Z/g, " ");

    const truncate = (str: string) => {
      var newline = str.indexOf("\n");
      return newline > 0 ? str.slice(0, newline) : str;
    };

    fetchData();
    watch(currentBranch, fetchData);

    return {
      branches,
      currentBranch,
      commits,
      truncate,
      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
#demo {
  font-family: "Helvetica", Arial, sans-serif;
}
a {
  text-decoration: none;
  color: #f66;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author,
.date {
  font-weight: bold;
}
</style>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，可能需要到shims-vue.d.ts中declare一下。
</summary>
