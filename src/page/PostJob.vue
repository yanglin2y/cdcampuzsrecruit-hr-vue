<!--  -->
<template>
  <div class="bigbox">
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="发布职位">
        <template #left>
          <van-icon name="arrow-left"
                    size="26"
                    @click="gotologin()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <el-form :model="rpForm"
             :rules="rules"
             ref="rpForm"
             :label-position="labelPosition"
             label-width="10px"
             class="login-container">
      <el-form-item prop="rpName"
                    label="职位名称">
        <el-input type="text"
                  required="required"
                  placeholder="请输入职位名称"
                  v-model="rpForm.rpName"></el-input>
      </el-form-item>
      <el-form-item label="学历要求">
        <el-select v-model="rpForm.education"
                   placeholder="请选择">
          <el-option label="专科"
                     value="专科"></el-option>
          <el-option label="本科"
                     value="本科"></el-option>
          <el-option label="硕士"
                     value="硕士"></el-option>
          <el-option label="博士"
                     value="博士"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="minsalary"
                    label="最低工资">
        <el-input type="text"
                  required="required"
                  placeholder="请输入最低工资"
                  v-model="rpForm.minsalary"></el-input>
      </el-form-item>
      <el-form-item prop="maxsalary"
                    label="最高工资">
        <el-input type="text"
                  required="required"
                  placeholder="请输入最高工资"
                  v-model="rpForm.maxsalary"></el-input>
      </el-form-item>
      <el-form-item prop="workAddress"
                    label="工作地址">
        <el-input type="text"
                  required="required"
                  placeholder="请输入工作地址"
                  v-model="rpForm.workAddress"></el-input>
      </el-form-item>
      <el-form-item prop="experience"
                    label="工作经验">
        <el-input type="text"
                  required="required"
                  placeholder="请输入工作经验"
                  v-model="rpForm.experience"></el-input>
      </el-form-item>
      <el-form-item label="工作内容"
                    prop="jobResponsibilities">
        <el-input type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  placeholder="请输入内容"
                  maxlength="700"
                  show-word-limit
                  v-model="rpForm.jobResponsibilities">
        </el-input>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary"
                   @click="submitForm('rpForm')"
                   >发布职位</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: ["eid"],
  components: {},
  data() {

    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入职位名称'))
      } else {
        callback()
      }
    }
    var education = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学历要求'))
      } else {
        callback()
      }
    }
    var minsalary = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入最低薪资'));
      }
      setTimeout(() => {
        var jug = /^\d+$/.test(value)
        if (!jug) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);

    }
    var maxsalary = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入最高薪资'));
      }
      setTimeout(() => {
        var jug = /^\d+$/.test(value)
        if (!jug) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    }
    var workAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工作地址'))
      } else {
        callback()
      }
    }
    var experience = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工作经验'))
      } else {
        callback()
      }
    }
    var jobResponsibilities = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工作内容'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        rpName: [{ validator: validateName, trigger: 'blur' }],
        education: [{ validator: education, trigger: 'blur' }],
        minsalary: [{ validator: minsalary, trigger: 'blur' }],
        maxsalary: [{ validator: maxsalary, trigger: 'blur' }],
        salary: minsalary + '-' + maxsalary,
        workAddress: [{ validator: workAddress, trigger: 'blur' }],
        experience: [{ validator: experience, trigger: 'blur' }],
        jobResponsibilities: [{ validator: jobResponsibilities, trigger: 'blur' }],
      },
      labelPosition: "top",
      btnDisabled: true,
      rpForm: {
        eid: this.$route.params.eid,
        entName: '',
        employeesNum: '',
        rpName: '',
        education: '',
        minsalary: '',
        maxsalary: '',
        salary: '',
        workAddress: '',
        experience: '',
        jobResponsibilities: '',

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

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    setTimeout(() => {
      if (this.$route.params.eid === undefined) {
        this.$router.push("/")
      }
    }, 10)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() {


  }, // 生命周期 - 创建之前
  // 方法集合
  methods: {
    gotologin() {
      this.$router.push({ path: '/' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.rpForm.salary= this.rpForm.minsalary + '-' +  this.rpForm.maxsalary
          this.axios
            .post('/api/postion/postJob', this.qs.stringify(this.rpForm))
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
  width: 80%;
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
  margin-top: 1rem;
}
</style>
