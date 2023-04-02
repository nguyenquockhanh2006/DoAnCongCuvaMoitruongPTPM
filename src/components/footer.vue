<template>
  <div id="chan">
    <div id="lienhe">
        <p>THÀNH VIÊN</p>
        <p>Nhóm 3:</p>
        <p>Nguyễn Quốc Khánh</p>
        <p>Duy Nhân</p>
        <p>Nhưỡng</p>
    </div>
    <div>
        <p>HỖ TRỢ</p>
        <P>Email: weather@gmail.com</P>
        <p>Số điện thoại: 0901234567</p>
        <p>Địa chỉ: Đại học Công nghệ Thành phố Hồ Chí Minh</p>
    </div>
    <div id="truyenthong">
        <p>TRUYỀN THÔNG</p>
        <div id="hinh">
            <img src="https://i.imgur.com/YawotYj.png"/>
            <img src="https://i.imgur.com/cfXfsgO.png"/>
            <img src="https://i.imgur.com/GLRZ3rr.png"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Footer",
}
</script>

<style>
#chan{
    background: linear-gradient(200deg, #f74c06, #f9bc2c);
    padding: 1em;
    height: 10em;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-bottom: 2em;
}
#lienhe{
    width: 15%;
}
#hinh{
    display: flex;
    justify-content: space-evenly;
}
#hinh > img{
    width: 5em;
    height: 5em;
    border-radius: 50%;
}
#truyenthong{
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>