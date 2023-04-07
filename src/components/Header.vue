<template>
    <header class="header">
      <div id="logo">
        <img src="https://i.imgur.com/FgXllJz.png"/>
        <div class="li">DỰ BÁO</div>
      </div>
      <div id="ngaygio">
        <p id="ten">Thành phố Hồ Chí Minh,</p>
        <p id="gio" v-show="time">{{ time }}</p>
        <p id="ngay" v-show="date">{{ date }}</p>
      </div>
    </header>
  </template>
  
  <script>
   export default {
        name: "Header",
        data: () => ({
          date: '',
          time: '',
          year: '',
          timestamp: '',
          fulldatetime: ''
        }),
        methods: {
          printDate: function () {
            return new Date().toLocaleDateString();
          },
          printTime: function () {
            return new Date().toLocaleTimeString();
          },
          printYear: function () {
            return new Date().getFullYear();
          },          
          printTimestamp: function () {
            return Date.now();
          },
          printFullDate: function(){
            return new Date();
          }
        },
        mounted: function () {
          this.date = this.printDate();
          window.setInterval(() => {
            this.time = this.printTime();
            }, 1000);
          this.timestamp = this.printTimestamp();
          this.year = this.printYear();
          this.fulldatetime = this.printFullDate();
        },
    };
  </script>
  
  <style scoped>
  .header {
    background: #f3722c;
    color: #fff;
    text-align: center;
    display: flex;
    height: 4em;
  }
  .w{
    font-size: 1.3em;
  }
  #ten,#gio,#ngay{
    margin-right: 0.5em;
  }
  #logo > img{
    width: 4em;
    height: 4em;
    margin-right: 0.5em;
  }
  #logo{
    display: flex;
    height: 100%;
    width: 50%;
  }
  #menu{
    display: flex;
    height: 100%;
    align-items: center;
    margin-left: 3em;
  }
  .li{
    width: 6em;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
  }
  .li:hover{
    background-color: #ff4800;
  }
  #ngaygio{
    display: flex;
    width: 50%;
    justify-content: flex-end;
    padding-right: 1em;
    align-items: center;
  }
  </style>