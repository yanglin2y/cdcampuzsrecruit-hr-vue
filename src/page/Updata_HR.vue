<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="修改HR信息">
        <template #left>
          <van-icon name="arrow-left"
                    size="26"
                    @click="gotologin()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :model="hrForm"
             :rules="rules"
             ref="hrForm"
             :label-position="labelPosition"
             label-width="10px"
             class="login-container">
      <el-form-item prop="hrName"
                    label="HR名称">
        <el-input type="text"
                  required="required"
                  v-model="hrForm.hrName"></el-input>
      </el-form-item>
      <el-form-item prop="sex"
                    label="性别">
        <el-select v-model="hrForm.sex"
                   placeholder="请选择性别"
                   style="width:100%">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="mail"
                    label="邮箱">
        <el-input class="phone-input"
                  placeholder="请填写"
                  v-model="hrForm.mail"></el-input>
      </el-form-item>
      <el-form-item prop="position"
                    label="职位">
        <el-input class="phone-input"
                  required="required"
                  placeholder="请填写"
                  v-model="hrForm.position"></el-input>
      </el-form-item>
      <el-form-item prop="department"
                    label="部门">
        <el-input class="phone-input"
                  placeholder="请填写"
                  v-model="hrForm.department"></el-input>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary"
                   @click="submitForm('hrForm')" :disabled="btnDisabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: ["hrInfo"],
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
    var validatePostion = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入职位'))
      } else {
        callback()
      }
    }
    var validateDepartment = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入部门'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        sex: [{ validator: validateSex, trigger: 'blur' }],
        hrName: [{ validator: validateName, trigger: 'blur' }],
        mail: [{ validator: validateEmail, trigger: 'blur' }],
        position: [{ validator: validatePostion, trigger: 'blur' }],
        department: [{ validator: validateDepartment, trigger: 'blur' }],
      },
      labelPosition: "top",
      btnDisabled: true,
      hrForm: {
        mail: this.$route.params.hrInfo.mail,
        hrName: this.$route.params.hrInfo.hrName,
        sex: this.$route.params.hrInfo.sex,
        position: this.$route.params.hrInfo.position,
        department: this.$route.params.hrInfo.department,
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
  watch: {
     hrForm: {
      handler(newValue, oldValue) {
        if (
        this. hrForm.mail!== this.$route.params.hrInfo.mail||
        this. hrForm.hrName!== this.$route.params.hrInfo.hrName||
        this. hrForm.sex!== this.$route.params.hrInfo.sex||
        this. hrForm.position!== this.$route.params.hrInfo.position||
        this. hrForm.department!== this.$route.params.hrInfo.department
        ) {
          this.btnDisabled = false;
        }  else {
          this.btnDisabled = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
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
      this.$router.push({ path: '/' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post('/api/user/updataHrInfo', this.qs.stringify(this.hrForm))
            .then((res) => {
              if (res.data.code === '111111') {
                this.$notify({ type: 'warning', message: res.data.message })
              } else if (res.data.code === '000000') {
                this.$notify({ type: 'success', message: res.data.message })
                this.$router.push({ path: '/' })
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
//@import url(); 引入公共css类
button[disabled] {
  color: white !important;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  text-align: center;
}
.bigbox {
  background: white;
  width: 100%;
  height: 100vh;
  text-align: left;
}
/deep/.van-nav-bar__title {
  font-size: 1.5rem;
  color: rgb(95, 94, 94);
}
/deep/.el-form-item {
  width: 75%;
  margin-left: 2rem;
}
/deep/ .el-form-item__label {
  height: 2.5rem;
}
/deep/ .el-input {
  height: 3rem;
  font-size: 1.4rem;
}
/deep/ .el-form-item__content {
  padding-left: -10rem;
}

/deep/ .el-input__inner {
  padding: 0px;
  border: 0px;
  border-bottom: 1px solid grey;
  border-radius: 0px;
}
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
/deep/ .el-button {
  width: 80%;
  margin-left: 1.3rem;
}
</style>
