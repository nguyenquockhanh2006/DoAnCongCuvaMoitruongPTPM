<template >
  <div id="app">
    <div id="phantren">
      <span id="chon"
        ><img src="https://i.imgur.com/8JZWqEp.png" />Chọn điểm du lịch:</span
      >
      <div id="danhsach">
        <select
          id="listcity"
          v-model="city_key"
          v-on:change="
            this.fetch_data();
            this.recitytemp();
          "
        >
          <option v-for="city of cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
        <input hidden type="text" v-model="city_key" />
      </div>
      <button id="btn_xuat" @click="Xuat_Ke_Hoach()">Xuất kế hoạch</button>
    </div>
    <div id="phannoidung">
      <div class="ngay" v-for="day in this.days" :key="day.Date">
        <div class="tieude">
          {{ this.Vue_Get_Ngay(day.Date) }}
        </div>
        <div class="thoitietngay">
          <div class="thoitiet">
            Ngày:
            {{ day.Day.IconPhrase }}
            <br />
            Công việc:
          </div>
          <textarea class="cv" cols="30" rows="9" placeholder="Công việc">
          </textarea>
        </div>
        <div class="thoitietdem">
          <div class="thoitiet">
            Đêm:
            {{ day.Night.IconPhrase }}
            <br />
            Công việc:
          </div>
          <textarea class="cv" cols="30" rows="9" placeholder="Công việc">
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import { db } from "@/config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
//import html2canvas from "html2canvas";
const apikey = "49iGRb0e4oMjyWeN8IJ29jGqVoHymMi0";
var querySnapshot;
// const getScreenshotOfElement = async (element) => {
//   const canvas = await html2canvas(element);
//   document.body.appendChild(canvas);
// };
export default {
  name: "LapKeHoach",
  data: function () {
    return {
      cities: [
        {
          name: "An Giang",
          id: 351821,
        },
        {
          name: "Bà Rịa- Vũng Tàu",
          id: 352095,
        },
        {
          name: "Bạc Liêu",
          id: 352113,
        },
        {
          name: "Bắc Giang",
          id: 352098,
        },
        {
          name: "Bắc Kạn",
          id: 352107,
        },
        {
          name: "Bắc Ninh",
          id: 352118,
        },
        {
          name: "Bến Tre",
          id: 352226,
        },
        {
          name: "Bình Dương",
          id: 352246,
        },
        {
          name: "Bình Định",
          id: 171,
        },
        {
          name: "Bình Phước",
          id: 426222,
        },
        {
          name: "Bình Thuận",
          id: 352262,
        },
        {
          name: "Cà Mau",
          id: 352499,
        },
        {
          name: "Cao Bằng",
          id: 352511,
        },
        {
          name: "Cần Thơ",
          id: 352508,
        },
        {
          name: "Đà Nẵng",
          id: 352954,
        },
        {
          name: "Đắk Lắk",
          id: 354247,
        },
        {
          name: "Đắk Nông",
          id: 352968,
        },
        {
          name: "Điện Biên",
          id: 353002,
        },
        {
          name: "Đồng Nai",
          id: 353021,
        },
        {
          name: "Đồng Tháp",
          id: 353033,
        },
        {
          name: "Hà Giang",
          id: 353389,
        },
        {
          name: "Hà Nam",
          id: 353404,
        },
        {
          name: "Hà Nội",
          id: 353412,
        },
        {
          name: "Hà Tĩnh",
          id: 353418,
        },
        {
          name: "Hải Dương",
          id: 353501,
        },
        {
          name: "Hải Phòng",
          id: 353511,
        },
        {
          name: "Hậu Giang",
          id: 353559,
        },
        {
          name: "Hòa Bình",
          id: 353983,
        },
        {
          name: "Thành Phố Hồ Chí Minh",
          id: 353981,
        },
        {
          name: "Hưng Yên",
          id: 353992,
        },
        {
          name: "Khánh Hòa",
          id: 354222,
        },
        {
          name: "Kiên Giang",
          id: 4493,
        },
        {
          name: "Kon Tum",
          id: 354242,
        },
        {
          name: "Lai Châu",
          id: 353000,
        },
        {
          name: "Lạng Sơn",
          id: 354293,
        },
        {
          name: "Lào Cai",
          id: 354305,
        },
        {
          name: "Lâm Đồng",
          id: 354287,
        },
        {
          name: "Long An",
          id: 354470,
        },
        {
          name: "Nam Định",
          id: 355085,
        },
        {
          name: "Nghệ An",
          id: 355417,
        },
        {
          name: "Ninh Bình",
          id: 355447,
        },
        {
          name: "Phú Thọ",
          id: 356356,
        },
        {
          name: "Phú Yên",
          id: 355595,
        },
        {
          name: "Quảng Bình",
          id: 355698,
        },
        {
          name: "Quảng Nam",
          id: 355712,
        },
        {
          name: "Quảng Ngãi",
          id: 355727,
        },
        {
          name: "Quảng Ninh",
          id: 355736,
        },
        {
          name: "Quảng Trị",
          id: 426609,
        },
        {
          name: "Sóc Trăng",
          id: 355938,
        },
        {
          name: "Sơn La",
          id: 355945,
        },
        {
          name: "Tây Ninh",
          id: 356171,
        },
        {
          name: "Thái Bình",
          id: 356177,
        },
        {
          name: "Thái Nguyên",
          id: 356182,
        },
        {
          name: "Thanh Hóa",
          id: 356184,
        },
        {
          name: "Thừa Thiên - Huế",
          id: 356204,
        },
        {
          name: "Tiền Giang",
          id: 356212,
        },
        {
          name: "Trà Vinh",
          id: 356248,
        },
        {
          name: "Tuyên Quang",
          id: 356319,
        },
        {
          name: "Vĩnh Long",
          id: 356354,
        },
        {
          name: "Vĩnh Phúc",
          id: 356357,
        },
        {
          name: "Yên Bái",
          id: 356425,
        },
      ],
      city_key: 351821,
      citytemp: {
        name: "An Giang",
        id: "351821",
      },
      motachinh: "",
      days: [],
      TemperaArrMin: [],
      TemperaArrMax: [],
      DescriptionDay: [],
      DescriptionNight: [],
      day_mont_year: [],
      ngay: [0, 1, 2, 3, 4],
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

  methods: {
    fetch_data() {
      var url =
        "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
        this.city_key;
      var param = "?language=vi&apikey=" + apikey;
      fetch(url + param)
        .then((res) => {
          console.log(res);

          return res.json();
        })
        .then((res) => {
          console.log(res);
          this.days = res.DailyForecasts;
          this.motachinh = res.Headline.Text;
          this.DescriptionDay = [];
          this.DescriptionNight = [];
          this.TemperaArrMax = [];
          this.TemperaArrMin = [];
          this.days.forEach((element) => {
            this.DescriptionDay.push(element.Day.IconPhrase);
            this.DescriptionNight.push(element.Night.IconPhrase);
            this.TemperaArrMax.push(element.Temperature.Maximum.Value);
            this.TemperaArrMin.push(element.Temperature.Minimum.Value);
            this.day_mont_year.push(element.Date);
          });
          //console.log(this.days);
          //console.log(this.Description);
          //console.log(this.TemperaArrMin);
          //console.log(this.TemperaArrMax);
          console.log(this.days);
          //console.log(this.days[0].Temperature.Maximum.Value);
        })
        .catch((res) => {
          console.log(res);
          alert("Tải dữ liệu không thành công");
        });
    },
    recitytemp() {
      this.cities.forEach((element) => {
        if (element.id == this.city_key) {
          this.citytemp.name = element.name;
          this.citytemp.id = element.id;
          this.citytemp.src = element.src;
        }
      });
    },
    Vue_Get_Ngay(dmy) {
      let a = new Date(dmy);
      return a.toLocaleDateString();
    },
    Xuat_Ke_Hoach() {
      var div = document.getElementById("phannoidung");
      var win = window.open("", "", "height=700,width=700");

      var style = "<style>";
      style =
        style +
        "#phannoidung {  height: 100%;  width: 100%;  display: flex;  align-items: flex-start;  justify-content: center;}";
      style =
        style +
        ".ngay {  width: 19%;  height: 90%;  background-color: #b7e4c7;  display: flex;  flex-direction: column;  justify-content: center;align-items: center;}";
      style =
        style +
        ".tieude {  padding: 5px;  text-align: center;  font-size: 20px;  font-weight: bold;  height: 5%;}";
      style =
        style +
        ".thoitiet {  margin-bottom: 0.5em;  padding: 5px;  text-align: center;  font-size: 18px;  font-weight: bold;  background-color: rgba(0, 0, 0, 0);}";
      style =
        style +
        ".thoitietngay {  width: 100%;  display: flex;  height: 47%;  flex-direction: column;  align-items: center;  justify-content: center;  background: linear-gradient(200deg, #ffa585, #ffeda0);}";
      style =
        style +
        ".thoitietdem {  width: 100%;  display: flex;  height: 47%;  background: linear-gradient(200deg, #103783, #9bafd9);  flex-direction: column;  align-items: center;  justify-content: center;  color: white;}";
      style = style + ".cv {  width:90%; height:200px;}";
      style = style + "</style>";

      win.document.write(style);
      win.document.write(div.outerHTML);
      win.print();
      /*
      var element = document.getElementById("phannoidung"); // global variable
      var getCanvas; // global variable

      html2canvas(element, {
        onrendered: function (canvas) {
          getCanvas = canvas;
        },
      });

      var imgageData = getCanvas.toDataURL("image/png");
      var newData = imgageData.replace(
        /^data:image\/png/,
        "data:application/octet-stream"
      );
      document.getElementById("btn_xuat").attr("download", "your_pic_name.png").attr("href", newData);*/
    },
  },
};
</script>
    
    <style scoped>
#app {
  width: 100%;
  height: 610px;
  background-color: beige;
  display: flow-root;
}
#chon {
  display: flex;
  align-items: center;
}
#chon > img {
  margin-right: 0.5em;
}
#phantren {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  margin-top: 5px;
  align-items: center;
}
#danhsach {
  margin-left: 10px;
  font-size: 20px;
}
#listcity {
  font-size: 18px;
}
#phannoidung {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.ngay {
  width: 19%;
  height: 90%;
  background-color: #b7e4c7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tieude {
  padding: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  height: 5%;
}
.thoitiet {
  margin-bottom: 0.5em;
  padding: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0);
}
.thoitietngay {
  width: 100%;
  display: flex;
  height: 47%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(200deg, #ffa585, #ffeda0);
}
.thoitietdem {
  width: 100%;
  display: flex;
  height: 47%;
  background: linear-gradient(200deg, #103783, #9bafd9);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}
.cv::placeholder {
  color: black;
}
#btn_xuat {
  margin-left: 20px;
}
#btn_xuat {
  padding: 0.7em;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(
    45deg,
    #432371 0%,
    #faae7b 51%,
    #432371 100%
  );
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#btn_xuat:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

#btn_xuat:active {
  transform: scale(0.95);
}
</style>
    