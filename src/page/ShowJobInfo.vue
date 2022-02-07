<!--  -->
<template>
  <div class="bigbox"
       v-cloak>
    <van-sticky :offset-top="0.0001"
                class="headerTitile">
      <van-nav-bar title="职位详细">
        <template #left>
          <van-icon name="arrow-left"
                    color="black"
                    size="24"
                    @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="jobInfo">
        <div class="rpName">{{ this.$route.params.itemObj.rpName }}</div>
        <div class="rpInfo">
          <span style="color: #ff9912">{{ salaryList[0] }}K-{{ salaryList[1] }}K</span>/{{
            this.$route.params.itemObj.workAddress
          }}/{{ this.$route.params.itemObj.experience }}/{{
            this.$route.params.itemObj.education
          }}
        </div>
      </div>

      <div class="jobDescri">
        <div class="jobDescriName">职位描述</div>
        <div style="margin-top: 0.7rem">
          <p class="jobDlength">
            {{ this.$route.params.itemObj.jobResponsibilities }}
          </p>
        </div>
      </div>
      <div class="workAddress">
        <div class="workAddressName">工作地址</div>
        <div class="trueAddress">
          {{ this.$route.params.itemObj.workAddress }}
        </div>
      </div>
      <div class="workAddress2">
        <div class="workAddressName">收到的简历</div>
        <div class="">
          <div v-if="this.aprList.length===0"
               class="noshowbox">
            还没有收到简历
          </div>
          <div class="bigcontext"
               v-if="this.aprList.length!==0">
            <div class="box">
              <div class="context"
                   v-for="(n, inx) in aprList"
                   :key="inx"
                   @click="showMsg(n.uid)">
                <div class="mincontext">
                  <div style="font-weight: bold; font-size: 1.3rem">{{ n.apName }}</div>
                  <div class="education">{{ n.education }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <el-button type="danger"
                 @click="delPostion()">删除</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'show-job',
  props: ['itemObj', 'buttonjug'],
  components: {},
  data() {
    // 这里存放数据
    return {
      aprList: [],
      salaryList: this.$route.params.itemObj.salary.split('-'),
      hr: {},
      time: '',
      rpForm: {
        eid: this.$route.params.itemObj.eid,
        hrid: this.$route.params.itemObj.hrid,
        rpid: this.$route.params.itemObj.rpid,
        rpName: this.$route.params.itemObj.rpName,
        workAddress: this.$route.params.itemObj.workAddress,
        education: this.$route.params.itemObj.education,
        salary: this.$route.params.itemObj.salary,
        experience: this.$route.params.itemObj.experience,
        entName: this.$route.params.itemObj.entName,
        entImg: ''

      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  },
  created() {
    setTimeout(() => {
      this.selectHrResume(this.$route.params.itemObj.rpid)
      console.log(this.$route.params.itemObj.rpid)
    }, 11)
  },
  // 方法集合
  methods: {
    showMsg(n) {
      this.$router.replace({
        name: 'OnlineResume',
        params: {
          uid: n,
          rpid:this.rpForm.rpid
        }
      })
    },
    selectHrResume(n) {
      this.axios
        .get('/api/resume/selectHrResume', {
          params: {
            rpid: n
          }
        }
        )
        .then((res) => {
          if (res.data.code === '000000') {
            this.aprList = res.data.data
          } else if (res.data.code === '111111') {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    delPostion() {
      const params = new URLSearchParams()
      params.append('rpid', this.rpForm.rpid)
      this.$dialog.confirm({
        message: '是否删除'
      })
        .then(() => {
          this.axios
            .post('/api/postion/delPostion', params
            )
            .then((res) => {
              if (res.data.code === '000000') {
                this.$notify({ type: 'success', message: '删除成功' })
                this.$router.replace({ path: '/showJob' })
              } else if (res.data.code === '111111') {
                this.$notify({ type: 'warning', message: res.data.message })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    goto() {
      this.$router.back()
    },

  }
}
</script>
<style lang="less" scoped>
.box {
  overflow-y: auto;
}
.education {
  font-weight: bold;
  font-size: 1.3rem;
  margin-left: 2rem;
}
.bigcontext {
  width: 100%;
  text-align: left;
}
.mincontext {
  display: flex;
  flex-direction: flex-start;
}
.context {
  border-bottom: 1px solid rgb(216, 211, 211);
  height: 2.5rem;
  width: 40%;
  display: flex;
  flex-direction: row;
  margin-top: 0.8rem;
}

/deep/ .el-button {
  width: 80%;
  margin-bottom: 1rem;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: var(--footer-height);
  text-align: center;
}
.trueAddress {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
.workAddressName {
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
.workAddress {
  margin-left: 1.2rem;
  text-align: left;
}
.workAddress2 {
  margin-left: 1.2rem;
  text-align: left;
  width: 86%;
}
/** HR信息 */
.hrInfo {
  margin-top: 0.2rem;
  margin-left: 1rem;
}
.hrContent {
  display: flex;
  flex-direction: flex-start;
  margin-top: 1rem;
}
.hr {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.hrTitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/**职位描述 */
.jobDlength {
  width: 20rem;
  font-size: 1.07rem;
}
.jobDescri {
  margin-left: 1.2rem;
  text-align: left;
  margin-top: 2rem;
}
.jobDescriName {
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
}
/*职业信息 */
.jobInfo {
  margin-left: 1.2rem;
  text-align: left;
}
.rpInfo {
  margin-top: 0.1rem;
  font-size: 1.12rem;
}
.rpName {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}
/* 企业信息*/
.entContainer {
  display: flex;
  flex-direction: column;
}
.entMessage {
  margin-left: 1.2rem;
  margin-top: 0.2rem;
  font-size: 1.1rem;
  color: grey;
}
.entName {
  margin-left: 1.2rem;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;
}
.entInfo {
  margin-top: 2rem;
  text-align: left;
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.img {
  text-align: right;
  flex: auto;
  margin-right: 1rem;
}
/*大容器*/
.bigbox {
  background: white;
  height: 100vh;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 84vh;
}
</style>
