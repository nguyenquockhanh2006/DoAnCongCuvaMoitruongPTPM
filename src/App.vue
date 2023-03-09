<template>
  <div id="app">
    <div>
      <!-- <Header></Header> -->
      <header class="header">
      <div id="logo">
        <img src="https://i.imgur.com/FgXllJz.png"/>
      </div>
      <div class="menu" id="menu1" @click="today">
        <p>THỜI TIẾT HÔM NAY</p>
      </div>
      <div class="menu" id="menu2" @click="dubao">
        <p>DỰ BÁO</p>
      </div>
      <div class="menu" id="menu3" @click="map">
        <p>BẢN DỒ</p>
      </div>
      <div class="menu" id="menu4" @click="lapkehoach">
        <p>LẬP KẾ HOẠCH</p>
      </div>
      <!-- <div id="ngaygio">
        <p id="ten">Thành phố Hồ Chí Minh,</p>
        <p id="gio2" v-show="time2">{{ time2 }}</p>
        <p id="ngay2" v-show="date2">{{ date2 }}</p>
      </div> -->
    </header>
    </div>
    <div id="noidung">
      <div id="noidung1">
        <Hientai />
      </div>

      <div id="noidung2">
        <div id="phannoidung2">
          <DuBaoVue></DuBaoVue>
        </div>
      </div>

      <div id="noidung3">
        <mapVue></mapVue>
      </div>
      <div id="noidung4">
        <LapKeHoachVue></LapKeHoachVue>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import Header from "./components/Header";
//import chuyen from "./components/chuyen.vue";
import Footer from "./components/footer.vue";
import Hientai from "./components/Hientai";
//import Gio from "./components/Dubaogio";
import DuBaoVue from "./components/DuBao.vue";
import mapVue from "./components/map.vue";
import LapKeHoachVue from "./components/LapKeHoach.vue";
//
export default {
  name: "App",
  components: { Hientai, Footer, DuBaoVue, mapVue, LapKeHoachVue },
  // data: () => ({
  //         date2: '',
  //         time2: '',
  //         year2: '',
  //         timestamp2: '',
  //         fulldatetime2: ''
  //       }),
  methods: {
    //  printDate: function () {
    //         return new Date().toLocaleDateString();
    //       },
    //       printTime: function () {
    //         return new Date().toLocaleTimeString();
    //       },
    //       printYear: function () {
    //         return new Date().getFullYear();
    //       },          
    //       printTimestamp: function () {
    //         return Date.now();
    //       },
    //       printFullDate: function(){
    //         return new Date();
    //       },
    //       mounted: function () {
    //       this.date2 = this.printDate();
    //       window.setInterval(() => {
    //         this.time2 = this.printTime();
    //         }, 1000);
    //       this.timestamp2 = this.printTimestamp();
    //       this.year2 = this.printYear();
    //       this.fulldatetime2 = this.printFullDate();
    //     },
    today(){
      document.getElementById("noidung1").style.display = "block";
      document.getElementById("noidung2").style.display = "none";
      document.getElementById("noidung3").style.display = "none";
      document.getElementById("noidung4").style.display = "none";
      document.getElementById("menu1").style.backgroundColor = '#e36414';
      document.getElementById("menu2").style.backgroundColor = 'transparent';
      document.getElementById("menu3").style.backgroundColor = 'transparent';
      document.getElementById("menu4").style.backgroundColor = 'transparent';
    },
    dubao(){
      document.getElementById("noidung1").style.display = "none";
        document.getElementById("noidung2").style.display = "block";
        document.getElementById("noidung3").style.display = "none";
        document.getElementById("noidung4").style.display = "none";
        document.getElementById("menu1").style.backgroundColor = 'transparent';
      document.getElementById("menu2").style.backgroundColor = '#e36414';
      document.getElementById("menu3").style.backgroundColor = 'transparent';
      document.getElementById("menu4").style.backgroundColor = 'transparent';
    },
    map(){
      document.getElementById("noidung1").style.display = "none";
        document.getElementById("noidung2").style.display = "none";
        document.getElementById("noidung3").style.display = "block";
        document.getElementById("noidung4").style.display = "none";
        document.getElementById("menu1").style.backgroundColor = 'transparent';
      document.getElementById("menu2").style.backgroundColor = 'transparent';
      document.getElementById("menu3").style.backgroundColor = '#e36414';
      document.getElementById("menu4").style.backgroundColor = 'transparent';
    },
    lapkehoach(){
      document.getElementById("noidung1").style.display = "none";
        document.getElementById("noidung2").style.display = "none";
        document.getElementById("noidung3").style.display = "none";
        document.getElementById("noidung4").style.display = "block";
        document.getElementById("menu1").style.backgroundColor = 'transparent';
      document.getElementById("menu2").style.backgroundColor = 'transparent';
      document.getElementById("menu3").style.backgroundColor = 'transparent';
      document.getElementById("menu4").style.backgroundColor = '#e36414';
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.menu{
  width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
.menu:hover{
  background-color: #e36414;
}
#logo > img{
    width: 4em;
    height: 4em;
    margin-right: 0.5em;
  }
  #logo{
    display: flex;
    height: 100%;
    width: 15%;
    justify-content: center;
    align-items: center;
  }
.header {
    background: linear-gradient(95deg, #f74c06 0%, #f9bc2c 100%);
    color: #fff;
    text-align: center;
    display: flex;
    height: 4em;
  }
#chuyen {
  height: 4em;
  width: 100vh;
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 20%;
}
#select_task {
  font-size: 18px;
}
#noidung {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

#noidung1 {
  display: block;
  width: 100%;
  height: 100%;
}
#noidung2 {
  display: none;
  width: 100%;
  height: 100%;
}
#noidung3 {
  display: none;
  width: 100%;
  height: 100%;
}
#noidung4 {
  display: none;
  width: 100%;
  height: 100%;
}
#phannoidung2 {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

</style>
