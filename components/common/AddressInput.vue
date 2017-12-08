<template>
  <div class="form_field">
    <template v-for="f in form">
      <div class="input" v-if="f.type!=='radio'">
        <span>{{f.title}}</span>
        <span>*</span>
        <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check.code" :isChange="f.isChange" :title="f.pattern&&check.tips" v-if="f.type!=='select'" :value="val&&val[f.name]">
        <div class="select" v-else>
          <select name="province_name" id="" @change="changeCity" :isChange="true">
            <option :value="v.name" v-for="v,k in province" :selected="p===v.name">{{v.name}}</option>
          </select>
          <select name="city_name" id="" @change="changeCounty" :isChange="true">
            <option :value="v.name" v-for="v,k in city" :selected="c===v.name">{{v.name}}</option>
          </select>
          <select name="area_name" id="" :isChange="true" @change="changeItem">
            <option :value="v.name" v-for="v,k in county" :selected="n===v.name">{{v.name}}</option>
          </select>
        </div>
        <span :title="f.pattern&&check.tips" :tips="f.placeholder"></span>
      </div>
      <label class="checkbox" v-else>
        <input type="checkbox" :name="f.name" :checked="val&&val[f.name]">
        <span>{{f.title}}</span>
      </label>
    </template>
  </div>
</template>

<script>
  import city from '@/util/city'
  import api from '@/util/function'
  export default {
    data () {
      return {
        check: {code: '^1[34578][0-9]{9}$', tips: '请输入11位手机号'},
        province: [],
        city: [],
        county: [],
        p: '',
        c: '',
        n: ''
      }
    },
    props: {
      form: {
        type: Array
      },
      val: {
        type: Object
      }
    },
    methods: {
      test (e) {
        this.val[e.target.name] = e.target.value
        var ele = e.target
        var ff = document.querySelector('.form')
        api.checkFiled(ele, ff)
      },
      selectCity (arr, value) {
        return arr.filter((v) => v.name === value)
      },
      changeCity (e) {
        this.setCity(e.target.value)
        this.setCounty(this.city[0].name)
        // console.log(this.val)
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
      this.p = this.val && this.val.province_name
      this.c = this.val && this.val.city_name
      this.n = this.val && this.val.area_name
      this.province = city
      this.setCity(this.p)
      this.setCounty(this.c)
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  .address_form{
    padding:40px 130px;
    @include form(v)
  }
</style>
