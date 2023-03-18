<template>
  <div id="dubao">
    <div id="dau">
      <span id="chon"><img src="https://i.imgur.com/8JZWqEp.png"/>Chọn địa điểm:</span>
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
    </div>
    <div id="thongtin">
      <div id="anh">
        <img id="anhtp" v-bind:src="this.citytemp.src" />
        <div id="phuanhtp">
          <div id="tencuatp">{{ this.citytemp.name }}</div>
          <div id="chugiaichung">{{ this.motachinh }}</div>
        </div>
      </div>
      <div id="ngay">
        <div class="ngaydem">
          <p class="h1"><img class="icon" src="https://i.imgur.com/2ZuZ6fT.png"/>Ngày</p> 
          <p class="h2">{{ this.Vue_Get_Ngay(this.day_mont_year[0]) }}</p>
        </div>
        <div class="iconto">
          <img class="icont" v-bind:src="this.url_icon_ngay" alt="" />
        </div>
        <div class="thongtinngay">
          <div class="mota">
            {{ this.DescriptionDay[0] }}
          </div>
          <div class="nhietdo">
            Nhiệt độ cao nhất: {{ this.FtoC(this.TemperaArrMax[0]) }} *C
          </div>
        </div>
        <div class="ngaytieptheo">
          <div class="tungngay" v-for="ma in ngay" :key="ma">
            <div class="tungngay_day">
              {{ this.Vue_Get_Ngay(this.day_mont_year[ma]) }}
            </div>
            <img
              class="mini_icont"
              v-bind:src="this.get_url_icon_day(ma)"
              alt=""
            />
            <div class="tungngay_mota">
              {{ this.DescriptionDay[ma] }}
              <br />
              {{ this.FtoC(this.TemperaArrMax[ma]) }}*C
            </div>
          </div>
        </div>
      </div>
      <div id="dem">
        <div class="ngaydem">
         <p class="h1"><img class="icon" src="https://i.imgur.com/dNQ6rPX.png"/> Đêm</p>
         <p class="h2">{{ this.Vue_Get_Ngay(this.day_mont_year[0]) }}</p>
        </div>
        <div class="iconto">
          <img class="icont" v-bind:src="this.get_url_icon_night(0)" alt="" />
        </div>
        <div class="thongtinngay">
          <div class="mota">
            {{ this.DescriptionNight[0] }}
          </div>
          <div class="nhietdo">
            Nhiệt độ thấp nhất: {{ this.FtoC(this.TemperaArrMin[0]) }} *C
          </div>
        </div>
        <div class="ngaytieptheo">
          <div class="tungngay2" v-for="ma in ngay" :key="ma">
            <div class="tungngay_day">
              {{ this.Vue_Get_Ngay(this.day_mont_year[ma]) }}
            </div>
            <img
              class="mini_icont"
              v-bind:src="this.get_url_icon_night(ma)"
              alt=""
            />
            <div class="tungngay_mota">
              {{ this.DescriptionNight[ma] }}
              <br />
              {{ this.FtoC(this.TemperaArrMin[ma]) }}*C
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <script>
const apikey = "49iGRb0e4oMjyWeN8IJ29jGqVoHymMi0";
export default {
  name: "dubao",
  data: function () {
    return {
      cities: [
        {
          name: "An Giang",
          id: 351821,
          src: "https://www.vietnambooking.com/wp-content/uploads/2020/07/khu-du-lich-nui-sap.jpg",
        },
        {
          name: "Bà Rịa- Vũng Tàu",
          id: 352095,
          src: "https://media.baodautu.vn/Images/manhcuong/2020/04/29/ba-ria---vung-tau-thuc-hien-dong-bo-nhieu-giai-phap-phat-trien1588170854.jpg",
        },
        {
          name: "Bạc Liêu",
          id: 352113,
          src: "https://phucuongtourist.com/wp-content/uploads/2021/01/tp-bac-lieu.jpg",
        },
        {
          name: "Bắc Giang",
          id: 352098,
          src: "https://cdn.vietnamtours247.com/2020/02/van-hoa-bac-giang-co-gi-thu-vi.png",
        },
        // { name: "Bắc Kạn", id: 352107, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtp45LrZJjSUbtnF0NSfq3JeNXhmq4REQ8AA&usqp=CAU" ,},
        // { name: "Bắc Ninh", id: 352118, src: "https://dutoanf1.com.vn/wp-content/uploads/2018/08/bac-ninh-1024x715.jpg", },
        // { name: "Bến Tre", id: 352226, src: "https://i.doanhnhansaigon.vn/2020/07/23/bentre-1595472166_750x0.jpg" ,},
        // { name: "Bình Dương", id: 352246, src: "https://i.doanhnhansaigon.vn/2020/07/23/bentre-1595472166_750x0.jpg" ,},
        // { name: "Bình Định", id: 171, src: "https://media.baodautu.vn/Images/chicuong/2021/02/09/Binh_Dinh_-_1_copy.jpg" ,},
        // { name: "Bình Phước", id: 426222, src: "https://binhphuoc.gov.vn/uploads/binhphuoc/news/2022_03/binh-phuoc-21322.jpg" ,},
        // { name: "Bình Thuận", id: 352262, src: "https://image.thanhnien.vn/w1024/Uploaded/2023/puqgfdmzs-co/2021_10_04/lagi-binh-thuan-1-4831.png", },
        // { name: "Cà Mau", id: 352499, src: "https://fileapi.surego.vn//Upload/NewsImage/R637096778929414583.png" ,},
        // { name: "Cao Bằng", id: 352511, src: "https://media-cdn.tripadvisor.com/media/photo-s/13/d3/4a/fe/angel-eye-mountain.jpg" ,},
        // { name: "Cần Thơ", id: 352508, src: "https://statics.vinpearl.com/cantho_1661238771.jpg", },
        // { name: "Đà Nẵng", id: 352954, src: "https://statics.vinpearl.com/du-lich-da-nang_1657939501.JPG" ,},
        // { name: "Đắk Lắk", id: 354247, src: "https://bmgroup.asia/wp-content/uploads/2022/09/dlk1.jpg", },
        // { name: "Đắk Nông", id: 352968, src: "https://media.baodautu.vn/Images/hoanganh/2022/04/12/Dak_Nong_2.jpg", },
        // { name: "Điện Biên", id: 353002, src: "https://consosukien.vn/pic/News/Nam_2021/637573052714736621.jpg", },
        // { name: "Đồng Nai", id: 353021, src: "https://znews-photo.zingcdn.me/w660/Uploaded/qxjwpprjv/2022_02_20/DJI_0439_zing_28_.jpg" ,},
        // { name: "Đồng Tháp", id: 353033, src: "https://hinhanhdephd.com/wp-content/uploads/2016/03/thanh-pho-cao-lanh-ve-dem.jpg", },
        // { name: "Hà Giang", id: 353389, src: "https://4.bp.blogspot.com/-eUyjmRfuG0I/VDu40J8AhZI/AAAAAAAACAg/kZ-zDTU59lA/s1600/23.jpg", },
        // { name: "Hà Nam", id: 353404, src: "https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/8a10a0d3761897b0017665518e9b6a91/052022/tppl.5_20220511105809.jpg" ,},
        // { name: "Hà Nội", id: 353412, src: "https://file3.qdnd.vn/data/images/0/2022/10/09/phucthang/hanoi%201.jpg?dpi=150&quality=100&w=870" ,},
        // { name: "Hà Tĩnh", id: 353418, src: "https://image.thanhnien.vn/w1024/Uploaded/2023/qxwpth-zl/2022_04_23/image1-6770.png", },
        // { name: "Hải Dương", id: 353501, src: "https://media.baodautu.vn/Images/chicuong/2021/08/07/19.jpg", },
        // { name: "Hải Phòng", id: 353511, src: "https://media.vneconomy.vn/images/upload/2022/04/28/hai-phong-no-luc-doi-moi-53744.jpg", },
        // { name: "Hậu Giang", id: 353559, src: "https://cdn3.ivivu.com/2022/06/haugiang.png", },
        // { name: "Hòa Bình", id: 353983, src: "https://nld.mediacdn.vn/2018/11/9/2hoabinh01-15417634867141723055756.jpg", },
        { name: "Thành Phố Hồ Chí Minh", id: 353981, src: "https://vietnamnomad.com/wp-content/uploads/2021/01/Ho-Chi-Minh-City-Travel-Guide-2021-Vietnamnomad.jpg", },
        { name: "Hưng Yên", id: 353992, src: "http://photos.wikimapia.org/p/00/02/46/74/20_full.jpg", },
        { name: "Khánh Hòa", id: 354222, src: "https://bqldann.khanhhoa.gov.vn/media/cats/gioi-thieu/tong-quan-ve-khanh-hoa-2.jpg" ,},
        { name: "Kiên Giang", id: 4493, src: "https://media.vneconomy.vn/w800/images/upload/2021/04/19/minh-hoa-1617355789457347618470-220-8-1366-2048-crop-16173557952901779903477.jpg", },
        { name: "Kon Tum", id: 354242, src: "https://quantri.kontum.gov.vn///Images/images/Tin%20so%20nganh/29-09-2022%20t1(1).jpg" ,},
        { name: "Lai Châu", id: 353000, src: "http://laichau.gov.vn/upload/2000066/fck/files/v__n_th___ng_1_0b9f9.JPG" ,},
        { name: "Lạng Sơn", id: 354293, src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/%C4%90%C3%AAm_L%E1%BA%A1ng_S%C6%A1n.jpg", },
        { name: "Lào Cai", id: 354305, src: "https://lamdong.gov.vn/sites/skhdt/cohoivatiemnang/Shared%20Documents/da-lat-ldd.jpg", },
        { name: "Lâm Đồng", id: 354287, src: "https://cungphuot.info/wp-content/uploads/2020/06/kinh-nghiem-du-lich-bao-loc.jpg", },
        { name: "Long An", id: 354470, src: "https://image.thanhnien.vn/w1024/Uploaded/2022/urwqwc-zl/2022_01_16/water-point-1-9934.jpg", },
        { name: "Nam Định", id: 355085, src: "https://consosukien.vn/pic/News/Nam_2022/thanh-pho-nam-dinh-doi-moi-va-phat-trien.jpg", },
        { name: "Nghệ An", id: 355417, src: "https://photo-cms-baonghean.zadn.vn/w1000/Uploaded/2022/jwwqjwkwj/2019_07_20/dan_so9378261_2072019.jpg", },
        { name: "Ninh Bình", id: 355447, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg/1280px-Tam_Coc_by_Tuan_Mai_%22007%22_%288888350545%29.jpg", },
        { name: "Phú Thọ", id: 356356, src: "https://cdn.vietnambiz.vn/171464876016439296/2021/6/12/t32-tra-my-000-1555051860-16234618628921201923566.jpg", },
        { name: "Phú Yên", id: 355595, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mui_Dai_Lanh_PhuYen.jpg/1280px-Mui_Dai_Lanh_PhuYen.jpg", },
        { name: "Quảng Bình", id: 355698, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/T%C6%B0%E1%BB%A3ng_M%E1%BA%B9_Su%E1%BB%91t_b%C3%AAn_s%C3%B4ng_Nh%E1%BA%ADt_L%E1%BB%87_2%2C_%C4%90%E1%BB%93ng_H%E1%BB%9Bi%2C_Qu%E1%BA%A3ng_B%C3%ACnh.jpeg/1920px-T%C6%B0%E1%BB%A3ng_M%E1%BA%B9_Su%E1%BB%91t_b%C3%AAn_s%C3%B4ng_Nh%E1%BA%ADt_L%E1%BB%87_2%2C_%C4%90%E1%BB%93ng_H%E1%BB%9Bi%2C_Qu%E1%BA%A3ng_B%C3%ACnh.jpeg", },
        { name: "Quảng Nam", id: 355712, src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Japanese_covered-bridge_of_Hoi_An_in_2015_06.jpg/1920px-Japanese_covered-bridge_of_Hoi_An_in_2015_06.jpg", },
        { name: "Quảng Ngãi", id: 355727, src: "https://media.vneconomy.vn/images/upload/2021/12/07/quang-ngai-sap-co-to-hop-cham-soc-phuc-hoi-suc-khoe-du-lich-nghi-duong-570-ti-dong-1573897120.jpeg", },
        { name: "Quảng Ninh", id: 355736, src: "https://vcdn1-dulich.vnecdn.net/2022/06/28/HaLongQuangNinh-1656400350-7365-1656400353.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=Hv6AI2cqlrNNfMR5v-ocuw", },
        { name: "Quảng Trị", id: 426609, src: "https://www.quangtri.gov.vn/o/3cmsnew-portlet/ViewImage?imagename=DJI_0299_1618562528082.jpg", },
        { name: "Sóc Trăng", id: 355938, src: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/4/21/1036299/Thanh-Pho-Soc--Trang-01.jpg", },
        { name: "Sơn La", id: 355945, src: "https://ipc.sonla.gov.vn/DataFiles/2021/09/Files/20210922-161803-Av9sjJbk.jpg", },
        { name: "Tây Ninh", id: 356171, src: "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-tay-ninh-1.jpg?tr=dpr-2,w-675", },
        { name: "Thái Bình", id: 356177, src: "https://sovhttdl.thaibinh.gov.vn/upload/80611/fck/c23164924ba9e3bcc9affdcaa8b21edf.jpg", },
        { name: "Thái Nguyên", id: 356182, src: "https://upload.wikimedia.org/wikipedia/commons/f/f6/TPTN2021.jpg", },
        { name: "Thanh Hóa", id: 356184, src: "https://statics.vinpearl.com/gia-phong-Vinpearl-Thanh-Hoa-hinh-anh8_1623994876.jpg", },
        { name: "Thừa Thiên - Huế", id: 356204, src: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Ngomon2.jpg", },
        { name: "Tiền Giang", id: 356212, src: "https://cdn3.ivivu.com/2022/06/ti%E1%BB%81n-giang.jpg", },
        { name: "Trà Vinh", id: 356248, src: "https://vcdn1-kinhdoanh.vnecdn.net/2022/03/31/0-8501-1648699456.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=p9YiRGIpHtQf8bmrB0EDyw", },
        { name: "Tuyên Quang", id: 356319, src: "https://cdnimg.vietnamplus.vn/uploaded/pcfo/2021_02_02/ttxvn_0202_tuyen_quang.jpg", },
        { name: "Vĩnh Long", id: 356354, src: "https://dutoanf1.com.vn/wp-content/uploads/2018/09/vinh-long.jpg", },
        { name: "Vĩnh Phúc", id: 356357, src: "https://cdn.vietnambiz.vn/171464876016439296/2021/6/9/tr31-1597089675567-16231996499561164743698.jpg", },
        { name: "Yên Bái", id: 356425, src: "https://www.yenbai.gov.vn/noidung/hinhanhvideo/Lists/HinhAnh/Attachments/205/6%20B%C3%B3ng%20chi%E1%BB%81u%20tr%C3%AAn%20th%C3%A0nh%20ph%E1%BB%91%20-%20Ho%C3%A0ng%20%C4%90%C3%B4.jpg", },
      ],
      citiesrc:
        "https://www.vietnambooking.com/wp-content/uploads/2020/07/khu-du-lich-nui-sap.jpg",
      city_key: 351821,
      citytemp: {
        name: "An Giang",
        id: "351821",
        src: "https://www.vietnambooking.com/wp-content/uploads/2020/07/khu-du-lich-nui-sap.jpg",
      },
      url_icon_ngay: "",
      url_icon_dem: "",
      motachinh: "",
      days: [],
      TemperaArrMin: [],
      TemperaArrMax: [],
      DescriptionDay: [],
      DescriptionNight: [],
      day_mont_year: [],
      ngay: [1, 2, 3, 4],
    };
  },

  mounted() {
    this.fetch_data();
  },
  methods: {
    // get data api
    fetch_data() {
      var url =
        "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
        this.city_key;
      var param = "?language=vi&apikey=" + apikey;
      fetch(url + param)
        .then((res) => {
          //console.log(res);

          return res.json();
        })
        .then((res) => {
          console.log(res);
          this.days = res.DailyForecasts;
          this.url_icon_ngay = this.url_icon_day();
          this.url_icon_dem = this.url_icon_night();
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
          //console.log(this.day_mont_year);
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
    url_icon_day() {
      if (this.days[0]) {
        let icon = this.days[0].Day.Icon;
        if (icon == 1 || icon == 2)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/1.svg";
        if (icon == 3 || icon == 4 || icon == 5 || icon == 6)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/2.svg";
        if (icon == 7 || icon == 8 || icon == 11)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/3.svg";
        if (icon == 12 || icon == 13 || icon == 14 || icon == 18)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/4.svg";
        if (icon == 15 || icon == 16 || icon == 17)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/5.svg";
      }
      return false;
    },

    url_icon_night() {
      if (this.days[0]) {
        let icon = this.days[0].Night.Icon;
        if (icon == 33 || icon == 34)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/10.svg";
        if (icon == 35 || icon == 36 || icon == 37 || icon == 38)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/11.svg";
        if (icon == 7 || icon == 8 || icon == 11)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/3.svg";
        if (icon == 12 || icon == 13 || icon == 14 || icon == 18)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/4.svg";
      }
      return false;
    },

    //
    get_url_icon_day(chen_ma) {
      if (this.days[chen_ma]) {
        let icon = this.days[chen_ma].Day.Icon;
        if (icon == 1 || icon == 2)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/1.svg";
        if (icon == 3 || icon == 4 || icon == 5 || icon == 6)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/2.svg";
        if (icon == 7 || icon == 8 || icon == 11)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/3.svg";
        if (icon == 12 || icon == 13 || icon == 14 || icon == 18)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/4.svg";
        if (icon == 15 || icon == 16 || icon == 17)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/5.svg";
      }
      return false;
    },

    get_url_icon_night(chen_ma) {
      if (this.days[chen_ma]) {
        let icon = this.days[chen_ma].Night.Icon;
        if (icon == 33 || icon == 34)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/10.svg";
        if (icon == 35 || icon == 36 || icon == 37 || icon == 38)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/11.svg";
        if (icon == 7 || icon == 8 || icon == 11)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/3.svg";
        if (icon == 12 || icon == 13 || icon == 14 || icon == 18)
          return "https://raw.githubusercontent.com/hungkieu/hungkieu.github.io/0edbcbb633b4061b249f603541673aa9f4eb4394/weather/svg/4.svg";
      }
      return false;
    },

    //
    Vue_Get_Ngay(dmy) {
      let a = new Date(dmy);
      return a.toLocaleDateString();
    },
    //
    FtoC(f) {
      return Math.round(((f - 32) * 5) / 9);
    },
  },
};
</script>
    
    <style scoped>
#dubao {
  width: 100%;
  height: 95vh;
}
#dau {
    width: 100%;
    display: flex;
    /* margin-top: 10px; */
    justify-content: center;
    align-items: center;
    height: 3.5em;
}
.icon{
  width: 2em;
  height: 2em;
}
#chon{
  display: flex;
    align-items: center;
}
#chon > img{
  margin-right: 0.5em;
}
.h1{
  display: flex;
    justify-content: center;
    align-items: center;
    margin-block-end: 0;
    margin-block-start: 0;
}
.h2{
  margin-block-end: 0;
    margin-block-start: 0;
}
#danhsach {
  margin-left: 5px;
  width: 15%;
  font-size: 18px;
}
#listcity {
  font-size: 18px;
  padding: 0.2em;
  width: 15em;
  overflow: hidden;
}

#ghichu {
  width: 85%;
  font-size: 17px;
  text-align: center;
}
#thongtin {
  width: 100%;
    height: 530px;
    display: flex;
    justify-content: space-around;
}
#anh {
  width: 30%;
  height: 100%;
  position: relative;
}
#anhtp {
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
}
#phuanhtp{
  top:0%;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
  background-color: rgba(0, 0, 0, 0.3); 
  display: flow-root;
  
}
#tencuatp{
  padding: 20px;
  margin-top: 5%;
  margin-left: 5%;
  color: white;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.3); 
  border-radius: 0.5em;
  font-size: 30px;
  text-align: center;
}
#chugiaichung{
  padding: 20px;
  margin-top: 65%;
  margin-left: 5%;
  color: white;
  width: 80%;
  height: 20%;
  background-color: rgba(255, 255, 255, 0.3); 
  border-radius: 0.5em;
  font-size: 20px;
  text-align: center;
}
#ngay {
  width: 34%;
  height: 100%;
  background: linear-gradient(200deg, #e4e95d, #e89d1f);
  display: flow-root;
  color: black;
  border-radius: 0.5em;
}
#dem {
  width: 34%;
  height: 100%;
  background: linear-gradient(200deg, #00458e, #000328);
  display: flow-root;
  color: white;
  border-radius: 0.5em;
}
.ngaydem {
  width: 100%;
  font-size: 25px;
  text-align: center;
  padding-top: 5%;
  /* color: white; */
}
.iconto {
  width: 100%;
  height: 30%;
  justify-content: center;
  justify-items: center;
  display: flex;
}
.icont {
  width: 9em;
  height: 9em;
}
.thongtinngay {
  width: 100%;
  font-size: 22px;
  height: 13%;
  text-align: center;
}
.mota {
  width: 100%;
}
.nhietdo {
  width: 100%;
}
.ngaytieptheo {
    width: 100%;
    height: 33%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.tungngay {
  width: 23%;
  height: 100%;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.tungngay2 {
  width: 23%;
  height: 100%;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(243, 237, 237, 0) 0px 3px 8px;
}
.tungngay {
background-image: repeating-linear-gradient(60deg, #db7706, #db7706 0px, transparent 30px, transparent 30px, #db7706 37px), repeating-linear-gradient(150deg, #db7706, #db7706 0px, transparent 30px, transparent 30px, #db7706 37px), repeating-linear-gradient(240deg, #db7706, #db7706 0px, transparent 30px, transparent 30px, #db7706 37px), repeating-linear-gradient(330deg, #db7706, #db7706 0px, transparent 30px, transparent 30px, #db7706 37px);
background-size: 2px calc(100% + 74px), calc(100% + 74px) 2px, 2px calc(100% + 74px) , calc(100% + 74px) 2px;
background-position: 0 0, 0 0, 100% 0, 0 100%;
background-repeat: no-repeat;
animation: borderAnimation 1s infinite linear;
}
.tungngay2 {
background-image: repeating-linear-gradient(60deg, #7da2ca, #7da2ca 0px, transparent 30px, transparent 30px, #7da2ca 37px), repeating-linear-gradient(150deg, #7da2ca, #7da2ca 0px, transparent 30px, transparent 30px, #7da2ca 37px), repeating-linear-gradient(240deg, #7da2ca, #7da2ca 0px, transparent 30px, transparent 30px, #7da2ca 37px), repeating-linear-gradient(330deg, #7da2ca, #7da2ca 0px, transparent 30px, transparent 30px, #7da2ca 37px);
background-size: 2px calc(100% + 74px), calc(100% + 74px) 2px, 2px calc(100% + 74px) , calc(100% + 74px) 2px;
background-position: 0 0, 0 0, 100% 0, 0 100%;
background-repeat: no-repeat;
animation: borderAnimation 1s infinite linear;
}
@keyframes borderAnimation {
from { background-position: 0 0, -74px 0, 100% -74px, 0 100%; }
to { background-position: 0 -74px, 0 0, 100% 0, -74px 100%; }
}
.tungngay_day {
  width: 100%;
  font-size: 15px;
  text-align: center;
}
.mini_icont {
  width: 70%;
  height: 50%;
}
.tungngay_mota {
  width: 100%;
  font-size: 15px;
  text-align: center;
}
</style>