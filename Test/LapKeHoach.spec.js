import { shallowMount } from "@vue/test-utils";
import LapKeHoach from "@/components/LapKeHoach.vue";

describe("LapKeHoach.vue", () => {
  test("renders component", () => {
    const wrapper = shallowMount(LapKeHoach);
    expect(wrapper.exists()).toBe(true);
  });

  test("fetches data on city change", async () => {
    const wrapper = shallowMount(LapKeHoach);
    const fetch_data = jest.spyOn(wrapper.vm, "fetch_data");

    const select = wrapper.find("#listcity");
    await select.setValue(1);

    expect(fetch_data).toHaveBeenCalled();
  });

  test("updates city_key on city change", async () => {
    const wrapper = shallowMount(LapKeHoach);
    const city_key_input = wrapper.find("input[type='hidden']");

    const select = wrapper.find("#listcity");
    await select.setValue(1);

    expect(city_key_input.element.value).toBe("1");
  });

  test("calls Xuat_Ke_Hoach on button click", () => {
    const wrapper = shallowMount(LapKeHoach);
    const Xuat_Ke_Hoach = jest.spyOn(wrapper.vm, "Xuat_Ke_Hoach");

    const button = wrapper.find("#btn_xuat");
    button.trigger("click");

    expect(Xuat_Ke_Hoach).toHaveBeenCalled();
  });

  test("renders days", async () => {
    const wrapper = shallowMount(LapKeHoach);
    await wrapper.setData({
      days: [
        {
          Date: "2023-04-06T07:00:00+07:00",
          Day: { IconPhrase: "Sunny" },
          Night: { IconPhrase: "Clear" },
        },
      ],
    });

    const days = wrapper.findAll(".ngay");
    expect(days).toHaveLength(1);

    const day = days[0];
    expect(day.find(".tieude").text()).toBe("Thứ Tư, 6 Tháng 4 2023");
    expect(day.find(".thoitietngay").text()).toContain("Ngày: Sunny");
    expect(day.find(".thoitietdem").text()).toContain("Đêm: Clear");
  });
});
