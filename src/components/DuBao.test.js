import { shallowMount } from '@vue/test-utils'
import DB from '@DuBao.test'

describe('DuBao.vue', () => {
  it('Test chức năng đổi độ F thành độ C - Nguyen Quoc Khanh', () => {
    
    const dubao = shallowMount(DB)
    // const celsius = dubao.vm.FtoC(32)
    expect(dubao.vm.FtoC(32)).toBe(0)
    expect(dubao.vm.FtoC('32')).toBe(0)
  })
})