<template>
  <div id="app">
    <div class="container">
      <div class="search-bar">
        <img src="https://i.imgur.com/q87bHRC.png" />
        <input
          type="text"
          v-model="city"
          class="search-input"
          placeholder="Tìm kiếm"
          @change="getAPI"
        />
      </div>

      <div>
        <div class="time">
          <span>{{ time }}</span>
        </div>
        <div class="hour">
          <span>{{ time1 }}</span>
        </div>
        <div v-if="data.data" class="address">{{ data.data.name }}</div>
        <div v-else class="address">- -</div>
      </div>

      <div>
        <img class="image" :src="srcImage" />
        <p class="temperature">{{ temperature(data) }}</p>
        <!-- <span class="current-day">{{ time2 }}</span> -->
        <p class="line"></p>
      </div>

      <div class="footer">
        <div class="footer-left">
          <p class="font-bold">
            MT Mọc: <span class="font-nomal"> {{ sunrise }} </span>
          </p>
          <p class="font-bold">
            Độ ẩm: <span class="font-nomal"> {{ humidity }}%</span>
          </p>
        </div>
        <div class="footer-right">
          <p class="font-bold">
            MT Lặn: <span class="font-nomal"> {{ sundown }} </span>
          </p>
          <p class="font-bold">
            Gió: <span class="font-nomal"> {{ wind }} m/s </span>
          </p>
        </div>
      </div>
    </div>
    <div id="goiy">
      <img src="https://i.imgur.com/xISMbLC.png" />
      <h3>Gợi ý các hoạt động cho thời tiết {{ message }}</h3>
      <div id="showTask">

      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import moment from "moment";
import { db } from "@/config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
var querySnapshot;
const getData = (params) =>
  axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });

export default {
  name: "Hientai",
  
  data: function () {
    return {
      city: "",
      data: "- -",
      message:"",
    };
  },
  setup() {
    async function getUser() {
      const q = query(collection(db, "WeatherAndTask"));

       querySnapshot = await getDocs(q);
      //temp = querySnapshot;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
      });
      
    }
    getUser();
  },
  computed: {
    srcImage() {
      if (this.data.data) {
        return `http://openweathermap.org/img/wn/${this.data.data.weather[0].icon}@2x.png`;
      }

      return "http://openweathermap.org/img/wn/10d@2x.png";
    },

    sunrise() {
      if (this.data.data) {
        const sunrise = this.data.data.sys.sunrise;

        return moment.unix(sunrise).format("H:mm");
      }

      return "6:16";
    },

    sundown() {
      if (this.data.data) {
        const sundown = this.data.data.sys.sunset;

        return moment.unix(sundown).format("H:mm");
      }

      return "6:00";
    },

    humidity() {
      if (this.data.data) {
        return this.data.data.main.humidity;
      }

      return "80";
    },

    wind() {
      if (this.data.data) {
        return (this.data.data.wind.speed * 3.6).toFixed(2);
      }
      return "19.54";
    },

    time() {
      const date = moment(new Date());

      return date.locale("vi").format("dddd, Do MMMM");
    },

    time1() {
      const date = moment(new Date());

      return date.locale("vi").format("hh:mm ");
    },

    time2() {
      const date = moment(new Date());

      return date.locale("vi").format("dddd");
    },
  },

  methods: {
    async getAPI() {
      try {
        const data = await getData({
          q: this.city,
          appid: "0e027c0f234c2453f2b86f7bec286645",
          units: "metric",
          lang: "vi",
        }).then((response) => ({
          data: response.data,
        }));
        this.data = data;
        console.log(data);
        console.log(data.data.weather[0]);
        var weathertemp = data.data.weather[0].main;
        this.message = data.data.weather[0].description;
        document.getElementById('showTask').innerHTML = "";
        querySnapshot.forEach((doc) => {
        if(doc.data().weather == weathertemp){
          var testtask = ">>> " + doc.data().task;
          var thespan = document.createElement("span");
          
          //document.getElementById('showTask').innerText += testtask;

          thespan.innerText += testtask;
          document.getElementById('showTask').appendChild(thespan); 
          var br = document.createElement("br");         
          document.getElementById('showTask').appendChild(br);        
          //console.log(doc.data().task);
        }
      });
        //console.log(data.data.weather[0].main);
      } catch (e) {
        alert('Không tải được dữ liệu, vui lòng kiểm tra lại nhập liệu của bạn!');
        return { data: [] };
        
      }
    },

    temperature(value) {
      if (value.data) {
        const temperature = Math.round(value.data.main.temp);
        return temperature;
      }

      return 23;
    },
  },
};
</script>
  
  <style scoped>
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: flex-start;
  float: left;
}
.container {
  width: 65%;
  height: 630px;
  background-color: #e2eafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: rgb(254,219,101);
    background: linear-gradient(360deg, rgba(254,219,101,1) 0%, rgba(214,99,134,1) 100%); */
}
.search-bar > img{
  width: 1.7em;
  height: 1.7em;
}
.search-bar:hover{
  border: 1.5px solid #ff7b00;
 box-shadow: #ff7b00 0px 5px 15px;
}

#goiy {
  width: 35%;
  height: 630px;
  padding: 0.5em;
  background-color: rgb(165, 187, 230);
  display: flex;
  flex-direction: column;
  align-items: center;
}
#showTask{
  text-align: left;
  
  
}
.time {
  /* color: white; */
  margin: 40px;
  font-size: 20px;
}

.hour {
  /* color: white; */
  margin: 40px;
  font-size: 25px;
  font-weight: bold;
}

.address {
  /* color: white; */
  margin: 40px;
  font-size: 20px;
  text-transform: capitalize;
  margin-bottom: 5px;
}

.iamge {
  width: 200px;
}

.temperature {
  /* color: white; */
  font-size: 80px;
  font-weight: lighter;
  line-height: 1;
  position: relative;
  margin-top: 10px;
  margin-bottom: 50px;
}

.temperature::after {
  content: "o";
  position: absolute;
  font-size: 30px;
}

.current-day {
  /* color: white; */
  font-size: 27px;
}

.line {
  width: 80%;
  border: 1px solid white;
  margin-left: 10%;
  margin-bottom: 20px;
}

.footer {
  display: flex;
  justify-content: space-around;
  /* color: white; */
}

.font-bold {
  font-weight: bold;
  margin: 5px;
}

.font-nomal {
  font-weight: normal;
}

.footer-left,
.footer-right {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.search-bar {
  width: 40%;
  margin-top: 1em;
  /* padding-top: 20px; */
  padding: 0.1em;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px solid #61a5c2;
  border-radius: 1em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.search-icon {
  margin-right: 5px;
  position: absolute;
  left: 0;
  /* color: white; */
}

.search-input {
  border: 0;
  outline: 0;
  padding: 3px 3px 3px 20px;
  background: transparent;
  height: 20px;
  /* color: white; */
  margin-left: 30px;
}

.search-input::placeholder {
  /* color: rgb(206, 206, 206); */
  margin-left: 30px;
}
</style>
  