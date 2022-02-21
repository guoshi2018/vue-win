<template>
  <div>
    <span>test-response组件中的props:</span>
    <span>age:{{ theAge }}</span>
    <span>name:{{ theName }}</span>
    <span>info:{{ theInfo }}</span>
    <h4>
      纵然能修改子字段,也提示最好使用父组件提供的修改方法.该提示默认为错误.只有在.eslintrc.js中设置
      vue/no-mutating-props : warn | off,方可通过编译.故在修改处使用
      eslint-disable vue/no-mutating-props
    </h4>
    <input
      type="button"
      value="在子组件中即使是修改,也只能修改引用型字段,因为值类型字段是只读."
      @click="modify"
    />
    <input
      type="button"
      value="在子组件中不能替换,因为属性本身是readonly,只可以修改子字段(如果有)"
      @click="replace"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import { UserInfo } from "@/components/17-combined-api/types";

export default defineComponent({
  props: {
    theAge: {
      type: Number,
      required: true,
    },
    theName: {
      type: String,
      required: true,
    },
    theInfo: {
      type: Object as PropType<UserInfo>,
      required: true,
    },
  },
  methods: {
    /* eslint-disable vue/no-mutating-props */
    modify() {
      console.log("child modify...");
      //this.theAge++;					//readonly
      //this.theName += " h";			//readonly
      this.theInfo.a--; //
      this.theInfo.b--;
      this.theInfo.c.e--;
      this.theInfo.c.d += " +";
    },
    replace() {
      console.log("child replace...");
      //this.theAge = -100;
      //this.theName = "Galinue";
      // this.theInfo = {
      //   a: -1,
      //   b: -2,
      //   c: {
      //     d: "hey",
      //     e: -3,
      //   },
      // };
    },
  },
});
</script>
