<template>
  <div class="select">
    <select name="province_name" @change="changeCity" :isChange="true">
      <option :value="v.name" v-for="v,k in province" :selected="p===v.name">{{v.name}}</option>
    </select>
    <select name="city_name" @change="changeCounty" :isChange="true">
      <option :value="v.name" v-for="v,k in city" :selected="c===v.name">{{v.name}}</option>
    </select>
    <select name="area_name" @change="changeItem" :isChange="true">
      <option :value="v.name" v-for="v,k in county" :selected="n===v.name">{{v.name}}</option>
    </select>
  </div>
</template>

<script>
  import city from '@/util/city'
  export default {
    name: 'selectCity',
    props: {
      payNo: {
        type: Number
      }
    },
    data () {
      return {
        province: [],
        city: [],
        county: [],
        p: '',
        c: '',
        n: ''
      }
    },
    methods: {
      selectCity (arr, value) {
        return arr.filter((v) => v.name === value)
      },
      changeCity (e) {
        this.setCity(e.target.value)
        this.setCounty(this.city[0].name)
      },
      changeCounty (e) {
        this.setCounty(e.target.value)
      },
      changeItem (e) {
        this.n = e.target.value
      },
      setCity (v) {
        this.p = v
        var cities = this.selectCity(city, v)
        cities = cities.length ? cities[0] : city[0]
        this.city = cities.city
      },
      setCounty (v) {
        this.c = v
        var counties = this.selectCity(this.city, v)
        counties = counties.length ? counties[0] : this.city[0]
        this.county = counties.county
      }
    },
    mounted () {
      this.province = city
      this.setCity(this.p)
      this.setCounty(this.c)
    }
  }
</script>
