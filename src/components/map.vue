<template id="chinh">
  <div id="map">
    <div id="map-in">
      <div id="map-here"></div>
      <div id="thongtintt">
        <div id="khung1">
          <div class="time">
            <span>{{ time }}</span>
          </div>
          <div class="hour">
            <span>{{ time1 }}</span>
          </div>
          <div v-if="data.data" class="address">{{ data.data.name }}</div>
          <div v-else class="address">- -</div>
        </div>
        <div id="khung2">
          <p>Tọa độ</p>
          <input id="lat" @click="getAPI" />
          <input id="lng" />
        </div>
        <div id="d1">
          <img class="image" :src="srcImage" />
          <!-- <p class="temperature">{{ temperature(data) }}</p> -->
          <!-- <span class="current-day">{{ time2 }}</span> -->
          <p class="line">{{this.chugiai}}</p>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const getData = (params) =>
  axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
var oldmarker = null;

export default {
  name: "Map",
  data: function () {
    return {
      data: "- -",
      chugiai:"",
    };
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
    loadmap() {
      var map = L.map("map-here").setView([10.762622, 106.660172], 9);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      map.on("click", function (e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        // alert(lat + "/" + lng);
        var l = document.getElementById("lat");
        l.value = lat;
        var l2 = document.getElementById("lng");
        l2.value = lng;
        //document.getElementById('test').innerHTML = lat;
        document.getElementById("lat").click();
        map.removeLayer(L.marker);
        var greenIcon = L.icon({
          iconUrl: "https://i.imgur.com/cMKweZp.png",
        });
        if (oldmarker != null) {
          map.removeLayer(oldmarker);
        }
        var marker = L.marker([lat, lng], { icon: greenIcon });
        map.addLayer(marker);
        oldmarker = marker;
      });
    },
    async getAPI() {
      var lat = document.getElementById("lat").value;
      var lng = document.getElementById("lng").value;
      // alert(lat + lng);
      try {
        const data = await getData({
          lat: lat,
          lon: lng,
          appid: "0e027c0f234c2453f2b86f7bec286645",
          // units: "metric",
          // lang: "vi",
        }).then((response) => ({
          data: response.data,
        }));
        this.data = data;
        this.chugiai = this.data.data.weather[0].description;
        console.log(this.chugiai);
        console.log(data);
      } catch (e) {
        alert('Tải dữ liệu tại vị trí được chọn thất bại, vui lòng tải lại hoặc chọn tọa độ gần nhất với điểm muốn xem!')
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

  mounted() {
    this.loadmap();
  },
};
</script>

<style scoped>
/* #map {
  width: 1380.2px;
  height: 100vh;
  display: flex;
  background-color: black;
}

#map-here {
  margin-top: 5%;
  margin-left: 3%;
  width: 60%;
  height: 70%;
}
#thongtintt {
  float: right;
  margin-top: 5%;
  margin-left: 2%;
  width: 33%;
  height: 70%;
  background-color: antiquewhite;
} */

#map {
  width: 100%;
  height: 90%;
  position: absolute;
}
#map-in {
  width: 100%;
  height: 100%;
  display: flex;
}
#d1{
      display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
#khung2 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
#map-here {
  width: 65%;
  height: 100%;
}
#khung1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 9em;
}
#lat,
#lng {
  border-left: none;
  border-right: none;
  border-top: none;
  padding: 0.4em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
#thongtintt {
  display: flex;
  width: 35%;
  height: 100%;
  background-color: #ffe5d9;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
  height: 630px;
  background-color: #e2eafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: rgb(254,219,101);
    background: linear-gradient(360deg, rgba(254,219,101,1) 0%, rgba(214,99,134,1) 100%); */
}
.time {
  font-size: 23px;
}

.hour {
  font-size: 25px;
  font-weight: bold;
}

.address {
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
  width: 100%;
  border: 1px solid white;
  font-weight: bold;
  font-size: 18px;
  margin-left: 10%;
  margin-bottom: 20px;
}

.footer {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
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
</style>