
//import 'bootstrap';

//import * as bootstrap from 'bootstrap';   //import all of the named exports

//import { Tooltip, Alert, Toast, Popover } from 'bootstrap';  // specify which plugins you need

//import Alert from 'bootstrap/js/dist/alert';


import { Options, Vue } from 'vue-class-component';
import AccordionHull from '@/components/accordion/accordion-hull.vue' // 子组件 @ is an alias to /src
import AccordionItem from '@/components/accordion/accordion-item.vue';

interface Author {
  order: number;
  name: string;
  books: string[];
}
interface Data {
  authors: Array<Author>;
  country: string;
  province: string;
  period: Date | null;
  currentAuthorIndex: number;
  // currentBookIndex: number;
  temp: number;
  tempAuthor: Author | null;
}
// type Yyy = {
// };
@Options({
  data() {
    return {
      temp: 380,
      country: 'American',
      province: 'California',
      period: null,

      currentAuthorIndex: -1,
      //      currentBookIndex: -1,
      tempAuthor: null,
      /**
       * 参与的作者们
       */
      authors: [{
        order: 101,
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery',
        ],
      }, {
        order: 102,
        name: 'Pick Guitar',
        books: [],
      }],
    } as Data;
  },
  created() {
    this.initTempAuthor();
    //   console.log('init');
  },
  mounted() {
    this.period = new Date();
    this.timer = setInterval(() => {
      //由于这是属性值的变动,而该属性是响应性的，所以会触发计算属性和方法的调用
      //this.period = new Date();

      //属性值（Date对象实例）不变，仅仅是其内部字段（属性）值变化，不会触发计算属性和方法的调用
      this.period.setTime(this.period.getTime() + 1000);//
      this.$forceUpdate();//强制更新，则方法被调用；而计算属性仍然采用缓存值，保持不变
      //console.log(this.period.toLocaleTimeString());
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    initTempAuthor(): void {
      this.tempAuthor = {
        order: 0,
        name: '',
        books: [],
      } as Author;
    },
    getArea(): string {
      return this.country + '.' + this.province;
    },
    getCurrentTime(): null | string {
      return this.period?.toLocaleTimeString();
    },
    handleBook(auth: Author, bookIdx: number): void {
      console.log(`autho:${auth},book index:${bookIdx}`);
      let answer: string | null;
      if (bookIdx != -1) {
        //console.log(this.currentAuthor.books[this.currentBookIndex])
        const bookname = auth.books[bookIdx];
        answer = prompt(`Modify the book's name: "${bookname}",or type delete to delete it, continue ?`,
          bookname);

        if (answer != bookname && answer != '' && answer != null) {
          if (answer.toLowerCase().trim() == 'delete') {
            console.log(`now delete ${bookname}.`);
            auth.books.splice(bookIdx, 1);
          } else {
            console.log('then rename the book');
            auth.books[bookIdx] = answer;
          }
        }
      } else {
        answer = prompt("Enter the new book's name:");
        if (answer) {
          console.log(`now add a new book:${answer}`);
          auth.books.push(answer);
        }
      }
    },
    createAuthor(): void {
      if (this.tempAuthor.order && this.tempAuthor.name) {
        this.authors.push(JSON.parse(JSON.stringify(this.tempAuthor)));
        alert('create author successfully.');
        this.initTempAuthor();
      } else {
        alert('please assure order is not zero or empty,and name is not empty');
      }
    },
  },
  computed: {
    //这是官方文档关于计算属性分离开getter和setter的例子，
    //https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95
    //不过现发现Vue3的单文件组件，分离的getter，setter无法使用this指针
    //area: {
    //  //getter
    //  get(): string {
    //    //return `${this.province} ${this.country}`;    //关于this指针的编译错误
    //    return 'hello';       //ok
    //  },
    //  //setter
    //  set(newValue:string) :void{
    //    console.log('area set to ', newValue);
    //    //const ar = newValue.split(' ');
    //    //this.province = ar[0];//关于this指针的编译错误
    //    //this.country = ar[1];//关于this指针的编译错误
    //  }
    //},

    //所以只能用无setter的形式：
    area() {
      return this.country + '.' + this.province;
    },

    //如果不涉及this指针，还可以使用带参数的计算属性
    //包含setter和getter方法的完整写法，内部仍然无法使用this
    hasBooks: {
      //这样定义带参get，编译错误
      //get: function (author: Author): string {
      //  return author?.books?.length > 0 ? 'yes' : 'no';
      //},

      //如此，必须的
      get: function () {
        return (author: Author): string => {
          return author?.books?.length > 0 ? 'yes' : 'no';
        };
      },


      //计算属性一般不使用set方法，因为他是只读属性
      //但是在某些情况下也可以使用set方法,
      //是采取普通形式，还是返回函数的形式，还不得而知。
      set: function (v: string) {
        console.log(v);
        return (v1: string): void => {
          console.log('setting now:', v1);
        };
      }
    },

    currentTime(): string | null {
      return this.period?.toLocaleTimeString();
    },

    currentAuthor(): Author | undefined {
      //const idx = this.authors.findIndex((auth: Author) => {
      //  return auth.order == this.currentAuthorOrder;
      //});
      return this.authors[this.currentAuthorIndex];
    },

    author(): Author {
      return this.currentAuthor || this.tempAuthor;
    },
  },
  watch: {
    //currentBookIndex(newV: number, oldV: number) {
    //  console.log(`old:${oldV},new:${newV}`);
    //},
    //currentAuthorIndex(newIndex: number, oldIndex: number): void {
    //  console.log('...', newIndex);
    //  this.currentAuthor = this.authors[newIndex];
    //}
  },
  components: {
    AccordionHull,
    AccordionItem,
  }
})
export default class CalcPropWatch extends Vue { }

