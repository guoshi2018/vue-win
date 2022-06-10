<template>
  <div class="post">
    <main class="content">
      <section class="one">
        <h2>使用fetch方法,结合回调</h2>
        <div v-if="loading1" class="loading">
          Loading... Please refresh once the ASP.NET backend has started. See
          <a href="https://aka.ms/jspsintegrationvue"
            >https://aka.ms/jspsintegrationvue</a
          >
          for more details.
        </div>

        <div v-if="post1" class="content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="forecast in post1" :key="forecast.date">
                <td>{{ forecast.date }}</td>
                <td>{{ forecast.temperatureC }}</td>
                <td>{{ forecast.temperatureF }}</td>
                <td>{{ forecast.summary }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5 v-else>
          请确保 netcore api
          项目WebApiSample6.0已经启动.注意firefox目前设置跨域无效
          有时间试试添加命令行参数: –disable-web-security
        </h5>
      </section>
      <section class="two">
        <h2>利用fetch方法,结合await</h2>
        <div v-if="loading2" class="loading">
          Loading... Please refresh once the ASP.NET backend has started. See
          <a href="https://aka.ms/jspsintegrationvue"
            >https://aka.ms/jspsintegrationvue</a
          >
          for more details.
        </div>

        <div v-if="post2" class="content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="forecast in post2" :key="forecast.date">
                <td>{{ forecast.date }}</td>
                <td>{{ forecast.temperatureC }}</td>
                <td>{{ forecast.temperatureF }}</td>
                <td>{{ forecast.summary }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5 v-else>
          请确保 netcore api
          项目WebApiSample6.0已经启动.注意firefox目前设置跨域无效.
          有时间试试添加命令行参数: –disable-web-security
        </h5>
      </section>
    </main>
    <button @click="refreshData">刷新</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, initCustomFormatter } from "vue";
//import axios from "axios";
import { corsData } from "@/common/mixins/func"; //ok
import $ from "jquery";
type Forecasts = {
  /**
   * 日期
   */
  date: string;
  /**
   * 摄氏温度
   */
  temperatureC: number;
  /**
   * 华氏温度
   */
  temperatureF: number;
  /**
   * 天气总评述
   */
  summary: string;
}[];
interface Data {
  /**
   * 为true时,指示第一种方法正在加载
   */
  loading1: boolean;
  /**
   * 为true时,指示第二种方法正在加载
   */
  loading2: boolean;
  /**
   * 第一种方法获取到的结果集
   */
  post1: null | Forecasts;
  /**
   * 第二种方法获取到的结果集
   */
  post2: null | Forecasts;
}

const fillTable = (data: any) => {
  console.log(data);
};

export default defineComponent({
  data(): Data {
    return {
      loading1: false,
      loading2: false,
      post1: null,
      post2: null,
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    /**
     * 刷新天气数据
     */
    refreshData(): void {
      this.fillTableByFetch1(); //ok
      this.fillTableByFetch2(); //ok
      //this.fillTableByJQuery(); //fail:回调函数找不到
      //this.fillTableByScript(); //基本同上
    },
    /**
     * 采用DOM Api的fetch方法,填充表格,跨域暂时未实现
     */
    fillTableByFetch1(): void {
      this.post1 = null;
      this.loading1 = true;
      try {
        fetch("https://localhost:7018/weatherforecast/")
          .then((r) => {
            /* eslint-disable no-console  */
            //       console.log(r);
            return r.json();
          })
          .then((json) => {
            this.post1 = json as Forecasts;
          })
          .catch((fail) => {
            console.log("using dom api fetch() failed:", fail);
          })
          .finally(() => {
            this.loading1 = false;
          });
      } catch (err) {
        console.log("fetch data error:", err);
      }
    },
    async fillTableByFetch2() {
      this.post2 = null;
      this.loading2 = true;
      try {
        const resp = await fetch("https://localhost:7018/weatherforecast/");
        //const resp = await fetch("/WF");
        if (resp.status === 200 && resp.ok === true) {
          this.post2 = (await resp.json()) as Forecasts;
        }
      } catch (err) {
        console.log("fetch data error:", err);
      } finally {
        this.loading2 = false;
      }
    },

    /**
     * 指向“https://localhost:7018/WeatherForecast/cors?callback=fillTable&_=1646530333196”的
     * <script> 加载失败。
     */
    fillTableByJQuery(): void {
      $.ajax({
        url: "https://localhost:7018/WeatherForecast/cors",
        type: "get",
        dataType: "jsonp",
        jsonpCallback: "fillTable",
        data: {},
      });
    },
    /**
     * 指向“https://localhost:7018/WeatherForecast/cors?callback=fillTable”的 <script> 加载失败。
     */
    fillTableByScript(): void {
      corsData(
        "https://localhost:7018/WeatherForecast/cors",
        fillTable,
        "callback"
      );
    },
  },
});
</script>

<style scoped="true" lang="scss">
div.post {
  overflow: auto;
  width: 95%;
  height: 40vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  main.content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    section {
      width: 40%;
      table {
        margin: 0.2em auto;
      }
      h2,
      h5 {
        text-align: center;
      }
    }
    section.one {
      /*   flex-grow: 1.5; 
      border-right: 1px solid grey;*/
    }
    section.two {
      /*    flex-grow: 2.3; 
      border-left: 1px solid red;*/
    }
  }
  button {
    width: 10%;
    align-self: center;
  }
}
</style>
