<template>
  <div class="form_field">
    <template v-for="f in form">
      <div :class="['input', {addon: f.addon}, {disabled: f.edit}]" v-if="f.type!=='radio'">
        <!-- title -->
        <span class="form_title">{{f.title}}</span>
        <span class="form_icon">*</span>
        <!-- type -->
        <template v-if="!f.edit">
          <template v-if="f.type!=='select'">
            <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check[f.pattern].code" :title="f.pattern&&check[f.pattern].tips" :value="bank_card&&bank_card.card_no" v-if="f.value">
            <input :type="f.type" :name="f.name" autocomplete="off" :placeholder="f.placeholder" @blur="test" :pattern="f.pattern&&check[f.pattern].code" :title="f.pattern&&check[f.pattern].tips" :isChange="f.isChange" :maxlength="f.len" @change="f.changeEvent&&onChange($event,f.name)" @input="f.focusEvent&&onFocus($event)" v-else>
          </template>
          <div class="sel" v-else-if="f.option">
            <select :name="f.name" @change="f.changeEvent&&onChange($event)" :isChange="f.isChange">
              <template v-if="f.name==='product_hash_type'">
                <option :value="v.name" v-for="v,k in hashType">{{v.name}}</option>
              </template>
              <template v-else>
                <option :value="v.id" v-for="v,k in f.option">{{v.item}}{{f.unit||''}}</option>
              </template>
            </select>
          </div>
          <select-city v-else></select-city>
        </template>
        <input :type="f.type" :name="f.name" :value="f.value===undefined?((f.name==='mobile')?mobile:data[f.name]):f.value" disabled :isChange="f.isChange" v-else>
        <!-- tips_info -->
        <div class="tips_info" v-if="f.tipsInfo">
          <span>{{f.tipsUnit}}</span>
          <span v-if="f.tipsInfo!=='show'">{{f.tipsInfo+'：'+f.value2+f.tipsUnit}}</span>
        </div>
        <!-- addon -->
        <template v-if="f.addon">
          <canvas id="code" width="90" height="40" v-if="f.addon===1" @click="changeCode"></canvas>
          <div class="count_btn" v-if="f.addon===2" @click="getCode(f.value2, f.value3, $event)">{{str}}</div>
        </template>
        <!-- tips -->
        <span class="tips" :title="f.pattern&&check[f.pattern].tips" :error="(f.pattern&&check[f.pattern].error)||f.error" :tips="f.placeholder" :success="f.pattern&&check[f.pattern].success" v-if="!f.edit"></span>
        <!-- password level -->
        <div class="password_level" v-if="f.focusEvent">
          <span class="item" v-for="i in 3"></span>
        </div>
      </div>
      <label class="checkbox" v-else>
        <input type="checkbox" :name="f.name">
        <span>{{f.title}}</span>
      </label>
    </template>
  </div>
</template>

<script>
  import util from '@/util'
  import api from '@/util/function'
  import city from '@/util/city'
  import { mapState } from 'vuex'
  import SelectCity from '@/components/common/SelectCity'
  export default {
    name: 'form_field',
    components: {
      SelectCity
    },
    props: {
      form: {
        type: Array
      },
      mode: {
        type: Number
      }
    },
    data () {
      return {
        str: '获取验证码',
        check: {
          tel: {code: '^1[34578][0-9]{9}$', tips: '请输入11位手机号'},
          password: {code: '^[0-9a-zA-Z_]{6,16}$', tips: '密码应在6-16位之间的字母数字'},
          imgCode: {code: '^[0-9a-zA-Z]{4}$', tips: '请输入4位字符', error: '图形验证码错误'},
          telCode: {code: '^[0-9]{6}$', tips: '请输入6位数字', success: '发送成功'},
          idCard: {code: '^([0-9]{15}$|^[0-9]{18}$|^[0-9]{17}([0-9]|X|x))$', tips: '身份证号应是18位'},
          bankCard: {code: '^[0-9]{16,21}$', tips: '请输入16至21位的银行卡号'},
          computeAddress: {code: '^[0-9a-zA-Z]{34,}$', tips: '请输入至少34位的字符'},
          money: {code: '^[2-9][0-9]|[0-9]{3,}$', tips: '请输入至少20的整数'},
          coin: {code: '^[1-9][0-9]*|[1-9][0-9]*[.][0-9]{1,8}|0[.][0-9]{2}[1-9][0-9]{0,5}|0[.][1-9]{1}[0-9]{0,7}|0[.]0[1-9]{1}[0-9]{0,6}$', tips: '请输入大于或者等于0.001的有效值'},
          float: {code: '^[0-9]+(.[0-9]{1,2})?$', tips: '请输入整数或两位小数'},
          int: {code: '^[0-9]+$', tips: '请输入整数'},
          bigMoney: {code: '^[1-9][0-9]{2,}$', tips: '请输入至少100的整数'}
        },
        data: {card_type: '中国大陆身份证'}
      }
    },
    mounted () {
      if (!document.querySelector('#code')) return false
      this.changeCode()
    },
    methods: {
      test (e) {
        var ele = e.target
        if (e.target.className) {
          e.target.className = ''
        }
        if (!ele.value) return false
        var ff = ele.parentNode.parentNode.parentNode
        if (ele.name === 'password1') {
          api.checkFiled(ele, this.isMobile || this.mode, ff.password)
        } else {
          api.checkFiled(ele, this.isMobile || this.mode)
        }
      },
      changeCode () {
        var ele = document.querySelector('#code')
        api.setStorge('suanli', {imgCode: api.createCode(ele)})
      },
      getCode (price, num, e) {
        var ele = e.target
        var form = ele.parentNode.parentNode.parentNode
        var telEle = form.dep_tel || form.mobile
        var imgCode = form.imgCode
        if (telEle && api.checkOne(telEle, this.isMobile || this.mode)) return false
        if (telEle.getAttribute('data-error') === 'true') {
          api.setTips(telEle, 'error', this.isMobile || this.mode, '该用户已存在')
          return false
        }
        if (imgCode && api.checkOne(imgCode, this.isMobile || this.mode)) return false
        if (price && num) {
          var money = price * num
          if (+this.balance < money) {
            api.tips('余额不足，请先充值')
            return false
          }
        }
        if (ele.getAttribute('disabled') === 'true') return false
        api.countDown(e)
        ele.setAttribute('disabled', true)
        util.post('send_code', {token: this.token, mobile: form.dep_tel ? form.dep_tel.value : form.mobile.value}).then((res) => {
          if (!(this.isMobile || this.mode)) {
            api.setTips(form.code, 'success')
          } else {
            api.tips('发送成功')
          }
        })
      },
      onChange (e, name, unit) {
        this.$emit('onChange', {e, name, unit})
      },
      onFocus (e) {
        this.$emit('onFocus', e)
      }
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        bank_card: state => state.info.bank_card,
        mobile: state => state.info.mobile,
        hashType: state => state.hashType,
        isMobile: state => state.isMobile,
        balance: state => state.info.balance
      })
    },
    filters: {
      cardformat: api.cardReadable,
      decimal: api.decimal
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '~assets/css/style.scss';
  .form_field .input{
    canvas,.count_btn{
      position: absolute;
      top: 8px;
      right: 8px;
      width:90px;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
    }
    .count_btn{
      text-align: center;
      background: #327fff;
      color: #fff;
      font-size: 14px;
    }
    @media screen and (max-width: $mobile) {
      canvas,.count_btn{
        width: 80px;
        height: 28px;
        line-height: 28px;
        top: 10px;
        right: 10px;
        font-size: 12px;
      }
    }
  }
</style>
