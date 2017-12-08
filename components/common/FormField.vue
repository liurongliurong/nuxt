<template>
  <div class="form_field">
    <div :class="['input', {addon: f.addon}, {disabled: f.edit}]" v-for="f in form">
      <!-- title -->
      <span>{{f.title}}</span>
      <span>*</span>
      <!-- type -->
      <template v-if="!f.edit">
        <!-- input -->
        <template v-if="f.type!=='select'">
          <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check[f.pattern].code" :value="$parent[f.value]&&$parent[f.value].card_no" v-if="f.value==='bank_card'" :title="f.pattern&&check[f.pattern].tips">
          <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check[f.pattern].code" @change="f.changeEvent&&$parent.$parent.onChange($event,f.name,f.tipsUnit)" :isChange="f.isChange" :title="f.pattern&&check[f.pattern].tips" :maxlength="f.len" v-else>
        </template>
        <!-- select -->
        <div class="sel" v-else-if="f.option">
          <select :name="f.name" isChange="f.isChange">
            <template v-if="f.name==='product_hash_type'">
              <option :value="v.name" v-for="v,k in hashType">{{v.name}}</option>
            </template>
            <template v-else>
              <option :value="v" v-for="v,k in f.option">{{v}}{{f.unit}}</option>
            </template>
          </select>
        </div>
        <!-- select city -->
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
      </template>
      <template v-else>
        <input :type="f.type" :name="f.name" :isChange="f.isChange" disabled v-if="f.name==='open_bank'">
        <input :type="f.type" :name="f.name" :value="$parent[f.name]||$parent.$parent[f.name]" disabled :isChange="f.isChange" v-else>
      </template>
      <!-- tips_info -->
      <div class="tips_info" v-if="f.tipsInfo">
        <template v-if="f.tipsUnit==='hash'">
          <span>{{($parent.product_hash_type||$parent.$parent.product_hash_type).toLowerCase()}}</span>
          <span>{{f.tipsInfo+'：'+($parent[f.name]||$parent.$parent[f.name])+($parent.product_hash_type||$parent.$parent.product_hash_type).toLowerCase()}}</span>
        </template>
        <template v-else>
          <span>{{f.tipsUnit}}</span>
          <template v-if="f.tipsInfo!=='show'">
            <span v-if="f.showUse">{{f.tipsInfo+'：'+$parent.$parent.have_use_time+f.tipsUnit}}</span>
            <span v-else>{{f.tipsInfo+'：'+$parent.$parent[f.name]+f.tipsUnit}}</span>
          </template>
        </template>
      </div>
      <!-- addon -->
      <template v-if="f.addon">
        <canvas id="code" width="90" height="40" v-if="f.addon===1" @click="changeCode"></canvas>
        <div class="count_btn btn" v-if="f.addon===2" @click="getCode">{{str}}</div>
      </template>
      <!-- tips -->
      <span :title="f.pattern&&check[f.pattern].tips" :error="(f.pattern&&check[f.pattern].error)||f.error" :tips="f.placeholder" :success="f.pattern&&check[f.pattern].success" v-if="!f.edit"></span>
    </div>
  </div>
</template>

<script>
  import util from '@/util/index'
  import api from '@/util/function'
  import city from '@/util/city'
  import { mapState } from 'vuex'
  export default {
    name: 'form_field',
    props: {
      form: {
        type: Array
      }
    },
    data () {
      return {
        province: [],
        city: [],
        county: [],
        p: '',
        c: '',
        n: '',
        str: '获取验证码',
        check: {tel: {code: '^1[34578][0-9]{9}$', tips: '请输入11位手机号'}, password: {code: '^[0-9a-zA-Z_]{6,16}$', tips: '密码应在6-16位之间的字母数字和下划线'}, imgCode: {code: '^[0-9a-zA-Z]{4}$', tips: '请输入4位字符', error: '图形验证码错误，请重新输入'}, telCode: {code: '^[0-9]{6}$', tips: '请输入6位数字', success: '发送成功'}, idCard: {code: '^([0-9]{15}$|^[0-9]{18}$|^[0-9]{17}([0-9]|X|x))$', tips: '身份证号应是18位'}, bankCard: {code: '^[0-9]{16,21}$', tips: '请输入16至21位的银行卡号'}, computeAddress: {code: '^[0-9a-zA-Z]{34,}$', tips: '请输入至少34位的字符'}, money: {code: '^[2-9][0-9]|[0-9]{3,}$', tips: '请输入至少20的整数'}, coin: {code: '^[1-9][0-9]*|[1-9][0-9]*[.][0-9]{1,8}|0[.][0-9]{2}[1-9][0-9]{0,5}|0[.][1-9]{1}[0-9]{0,7}|0[.]0[1-9]{1}[0-9]{0,6}$', tips: '请输入大于0.001的整数或8位小数'}, float: {code: '^[0-9]+(.[0-9]{1,2})?$', tips: '请输入整数或两位小数'}, int: {code: '^[0-9]+$', tips: '请输入整数'}, bigMoney: {code: '^[1-9][0-9]{2,}$', tips: '请输入至少100的整数'}}
      }
    },
    mounted () {
      this.province = city
      this.setCity(this.p)
      this.setCounty(this.c)
      if (!document.querySelector('#code')) return false
      this.changeCode()
    },
    methods: {
      test (e) {
        var ele = e.target
        var ff = document.querySelector('.form')
        api.checkFiled(ele, ff)
      },
      changeCode () {
        var ele = document.querySelector('#code')
        localStorage.setItem('code', api.createCode(ele))
      },
      getCode () {
        var form = document.querySelector('.form')
        var ele = document.querySelector('.count_btn')
        var telEle = form.dep_tel || form.mobile
        var isTel = api.checkCode(telEle)
        if (isTel) {
          telEle.focus()
          return false
        }
        if (ele.getAttribute('disabled') === 'true') return false
        util.post('send_code', {sign: api.serialize({token: this.token, mobile: form.dep_tel ? form.dep_tel.value : form.mobile.value})}).then(res => {
          api.setTips(form.code, 'success')
          api.countDown()
          ele.setAttribute('disabled', true)
        })
      },
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
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        hashType: state => state.hashType
      })
    },
    filters: {
      cardformat: api.cardReadable,
      decimal: api.decimal
    }
  }
</script>
