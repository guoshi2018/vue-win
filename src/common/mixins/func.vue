
<manual>
  用法:   import Func from '@/common/mixins/func.vue';
  作为mixin: mixins:[Func], 
</manual>



<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  @Options({
    methods: {
      guidString() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0;
          const v = c == 'x' ? r : (r & 0x3 | 0x8);
          return 's' + v.toString(16);
        });
      }
    }
  })
  export default class extends Vue { }
</script>

