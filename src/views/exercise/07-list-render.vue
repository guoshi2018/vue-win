<template>
  <accordion-hull  header="列表渲染:v-for='item in items'和 v-for='item of items'">
    <accordion-item caption="数组和内部的对象元素均使用v-for='item in items'" show>
      <ul>
        <li v-for="(mark,idx) in marks" :key="idx">
          {{idx + 1}}:{{mark.name}}
          <ul>
            <li v-for="(propValue,propName,i) in mark" :key="i">
              {{i + 1}}---{{propName}}:{{propValue}}
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="数组和内部的对象元素均使用v-for='item of items'">
      <ul>
        <li v-for="(mark,idx) of marks" :key="idx">
          {{idx + 1}}:{{mark.name}}
          <ul>
            <li v-for="(propValue,propName,i) of mark" :key="i">
              {{i + 1}}---{{propName}}:{{propValue}}
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="数组更新检测。由于vue将一些数组方法进行了包裹，
                   使得它们也会触发视图更新，这些方法有：
                   push pop shift unshift splice sort reverse">
      <ul>
        <li>
          <input type="button" value="push" @click="updateArray('push')" />
          <input type="button" value="pop" @click="updateArray('pop')" />
          <input type="button" value="shift" @click="updateArray('shift')" />
          <input type="button" value="unshift 2" @click="updateArray('unshift')" />
          <input type="button" value="splice 2" @click="updateArray('splice')" />
          <input type="button" value="sort" @click="updateArray('sort')" />
          <input type="button" value="reverse" @click="updateArray('reverse')" />
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="使用计算属性显示过滤的结果：筛选数学和语文分数均为奇数的人员记录">
      <ul>
        <li v-for="(mark,idx) of oddChMathMarks" :key="idx">
          {{idx + 1}}:{{mark.name}}
          <ul>
            <li v-for="(propValue,propName,i) of mark" :key="i">
              {{i + 1}}---{{propName}}:{{propValue}}
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="映射数组：计算属性获取所有人员的总分">
      <ul>
        <li v-for="(mark,idx) of totalMarks" :key="idx">
          {{idx + 1}}:{{mark.name}}
          <ul>
            <li v-for="(propValue,propName,i) of mark" :key="i">
              {{i + 1}}---{{propName}}:{{propValue}}
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="使用嵌套v-for循环，结合方法，展示嵌套数组的偶数元素。
                        这是官方原版，采用ul与li循环，效果是不分大组，全部混为一谈">
      <ul v-for="nums in [[1,2,3,4,5,6],[7,8,9,10,11,12,13]]" :key="nums">
        <li v-for="n in even(nums)" :key="n">
          {{n}}
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="使用嵌套v-for循环，结合方法，展示嵌套数组的偶数元素。
                        这是官方原版，采用各自的li循环，效果清晰">
      <ul>
        <li v-for="nums in [[1,2,3,4,5,6],[7,8,9,10,11,12,13]]" :key="nums">
          {{nums}}的偶数：
          <ul>
            <li v-for="n in even(nums)" :key="n">
              {{n}}
            </li>
          </ul>
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="在v-for里使用值范围">
      <ul>
        <li v-for="n in 10" :key="n">
          {{n % 2 == 0 ? n : 'hello world ' + n}}
        </li>
      </ul>
    </accordion-item>
    <accordion-item caption="类似于 v-if，你也可以利用带有 v-for 的 &lt;template&gt; 来循环渲染一段包含多个元素的内容。">
      <ul>
        <template v-for="(mark,idx) in marks" :key="idx">
          <li>{{idx}}.name:{{mark.name}}</li>
          <li>&nbsp;&nbsp;&nbsp;totla:{{mark.chinese+mark.math+mark.music}}</li>
        </template>
      </ul>
    </accordion-item>
    <accordion-item caption="v-for与v-if一同使用，可以把v-for移动到&lt;template&gt;中来,以轮显语文90分以上的人员">
      <ul>
        <template v-for="mark in marks" :key="mark.name">
          <li v-if="mark.chinese > 90">
            {{mark.name}}:chinese---{{mark.chinese}}
          </li>
        </template>
      </ul>
    </accordion-item>
    <accordion-item caption="组件上使用v-for：官方文档用例，其中引用todo-item组件（有一点点改动）">
      <ul>
        <li>
          <form v-on:submit.prevent="addNewTodo">
            <label for="new-todo">add a todo</label>
            <input v-model="plan.newTodoText" id="new-todo" placeholder="E.g. Feed the cat" type="text" />
            <input type="submit" value="add" :disabled="plan.newTodoText.length == 0" />
            <ul>
              <TodoItem v-for="(todo,index) in plan.currentTodos"
                        :key="todo.id"
                        :title="todo.title"
                        @remove="plan.currentTodos.splice(index,1)"></TodoItem>
            </ul>
          </form>
        </li>
      </ul>
    </accordion-item>


  </accordion-hull>
</template>


<script lang="ts">
  /* eslint-disable no-dupe-class-members, no-dupe-keys */
  import { Options, Vue } from 'vue-class-component'
  import TodoItem from '@/components/07-list-render/todo-item.vue' // 子组件 @ is an alias to /src
  import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
  import AccordionItem from '@/components/accordion/accordion-item.vue';

  enum Grade {
    excellent,
    good,
    commonly,
    pass,
    slightly,
  }
  type Mark = {
    name: string;
    chinese: number;
    math: number;
    music: Grade;
  };
  type item = {
    id: number;
    title: string;
  };
  type Plan = {
    currentTodos: Array<item>;
    newTodoText: string;
    newTodoId: number;
  }
  interface Data {
    marks: Array<Mark>;
    plan: Plan;
  }
  // type Yyy = {
  // };
  @Options({
    data(): Data {
      return {
        marks: [
          {
            name: 'Nuidun',
            chinese: 89,
            math: 101,
            music: Grade.good,
          }, {
            name: 'Heiniu',
            chinese: 93,
            math: 60,
            music: Grade.excellent,
          }, {
            name: 'Wiliams John',
            chinese: 73,
            math: 91,
            music: Grade.slightly,
          }, {
            name: 'Bill gates',
            chinese: 98,
            math: 99,
            music: Grade.commonly,
          },
        ],
        plan: {
          currentTodos: [{
            id: 1,
            title: 'Do the dishes',
          }, {
            id: 2,
            title: 'Take out the trash',
          }, {
            id: 3,
            title: 'Mow the lawn',
          },
          ],
          newTodoId: 4,
          newTodoText: '',
        },
      };
    },
    methods: {
      updateArray(flag: string): void {
        switch (flag) {
          case 'push':
            this.marks.push({
              name: 'guoshi',
              chinese: 93,
              math: 89,
              music: Grade.good,
            });
            break;
          case 'pop':
            this.marks.pop();
            break;
          case 'shift':
            this.marks.shift();
            break;
          case 'unshift':
            this.marks.unshift({
              name: 'pnpishere',
              chinese: 19,
              math: 32,
              music: Grade.excellent,
            }, {
              name: 'tangchao',
              chinese: 37,
              math: 93,
              music: Grade.pass,
            });
            break;
          case 'splice':
            this.marks.splice(3, 0, {
              name: 'opo and pop',
              chinese: 87,
              math: 83,
              music: Grade.slightly,
            }, {
              name: 'washington',
              chinese: 82,
              math: 79,
              music: Grade.good,
            });
            break;
          case 'sort':
            this.marks.sort((m1: Mark, m2: Mark): boolean => (m1.math - m2.math) < 0);
            break;
          case 'reverse':
            this.marks.reverse();
            break;
          default:
            break;
        }
      },
      even(nums: number[]): number[] {
        return nums.filter(num => num % 2 === 0);
      },
      addNewTodo():void {
        this.plan.currentTodos.push({
          id: this.plan.newTodoId++,
          title: this.plan.newTodoText,
        });
        this.plan.newTodoText = '';
        console.log(this.plan);
      }
    },
    computed: {
      oddChMathMarks() {
        return this.marks.filter(
          (mark: Mark): boolean => mark.chinese % 2 == 1 && mark.math % 2 == 1);
      },
      totalMarks() {
        return this.marks.map(
          (mark: Mark) => {
            return {
              name: mark.name,
              total: mark.chinese + mark.math + mark.music
            };
          }
        );
      },
    },
    components: {
      TodoItem,
      AccordionHull,
      AccordionItem,
    }
  })
  //export default class ComOrViewModel extends Vue { }     //ok
  //由于只有一个导出，故可使用匿名的默认导出：
  export default class extends Vue { }
</script>

<summary>
  View形式的组件，还需要到/router/index.ts中注册，在App.vue的适当位置设置链接
  若引用到.js文件，使用import时，需要到shims-vue.d.ts中declare一下。
</summary>

