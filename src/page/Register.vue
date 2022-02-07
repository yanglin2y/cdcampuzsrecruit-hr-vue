<!--  -->
<template>
  <div class="bigBox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="HR注册">
        <template #left>
          <van-icon name="arrow-left"
                    size="26"
                    @click="gotologin()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :model="entForm"
             :rules="rules"
             ref="entForm"
             class="login-container">
      <el-form-item prop="hrName">
        <el-input type="text"
                  placeholder="用户名称"
                  required="required"
                  v-model="entForm.hrName"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="sex"
                    prefix-icon="el-icon-mobile-phone">
        <el-select v-model="entForm.sex"
                   placeholder="请选择性别"
                   style="width:100%">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="mail">
        <el-input class="phone-input"
                  placeholder="邮箱"
                  v-model="entForm.mail"
                  prefix-icon="el-icon-mobile-phone"></el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input type="text"
                  placeholder="登陆账户"
                  required="required"
                  v-model="entForm.account"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  placeholder="请输入密码"
                  v-model="entForm.password"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password"
                  placeholder="请再次输入密码"
                  v-model="entForm.checkPass"
                  prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary"
                   @click="submitForm('entForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import utils from '../js/util.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择性别'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名称'))
      } else {
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      var length = Object.keys(value).length;
      if (value === '') {
        callback(new Error('请输入登陆账户'))
      } else if (length < 7) {
        callback(new Error('账号长度必须大于7'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由6-20位字母+数字组合'))
      } else if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.entForm.checkPass !== '') {
          this.$refs.entForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.entForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        sex: [{ validator: validateSex, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
        hrName: [{ validator: validateName, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        mail: [{ validator: validateEmail, trigger: 'blur' }],
      },

      entForm: {
        mail:'',
        hrName: '',
        account: '',
        password: '',
        sex: '',
        checkPas: '',
      },
      options: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }],
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    gotologin() {
      this.$router.push({ path: '/login' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entForm.password = utils.encrypt(this.entForm.password)
          this.axios
            .post('/api/user/register', this.qs.stringify(this.entForm))
            .then((res) => {
              if (res.data.code === '111111') {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'warning', message: res.data.message })
              } else if (res.data.code === '000000') {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'success', message: res.data.message })
                this.$router.push({ path: '/login' })
              } else {
                this.entForm.password = this.entForm.checkPass
                this.$notify({ type: 'warning', message: '服务繁忙, 请重试' })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.bigBox {
  height: 100vh;
  width: 100%;
  background: white;
  position: absolute;
}
.login-container {
  margin-top: 1rem;
  width: 80%;
  margin-left: 3rem;
}
</style>
