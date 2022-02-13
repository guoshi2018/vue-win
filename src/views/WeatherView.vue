<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading... Please refresh once the ASP.NET backend has started. See
      <a href="https://aka.ms/jspsintegrationvue"
        >https://aka.ms/jspsintegrationvue</a
      >
      for more details.
    </div>

    <div v-if="post" class="content">
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
          <tr v-for="forecast in post" :key="forecast.date">
            <td>{{ forecast.date }}</td>
            <td>{{ forecast.temperatureC }}</td>
            <td>{{ forecast.temperatureF }}</td>
            <td>{{ forecast.summary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type Forecasts = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}[];
interface Data {
  loading: boolean;
  post: null | Forecasts;
}
export default defineComponent({
  data(): Data {
    return {
      loading: false,
      post: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(): void {
      this.post = null;
      this.loading = true;
      fetch("https://localhost:5001/GetWeatherForecast")
        .then((r) => {
          /* eslint-disable no-console  */
          console.log(r);
          return r.json();
        })
        .then((json) => {
          this.post = json as Forecasts;
          this.loading = false;
        });
    },
  },
});
</script>
