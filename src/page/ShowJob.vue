<!--  -->
<template>
  <div class="bigbox" v-cloak>
    <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="查看发布职位">
        <template #left>
          <van-icon name="arrow-left" color="black" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div v-if="this.entList.length===0" class="noshowbox">
        HR还没发布职位
      </div>
      <div class="bigcontext" v-if="this.entList.length!==0">
        <div class="box">
          <div class="context" v-for="(n, inx) in entList" :key="inx" @click="showMsg(n)">
            <div class="mincontext">
              <div style="font-weight: bold; font-size: 1.3rem">{{ n.rpName }}</div>
              <div class="salary" style="font-weight: bold; color: red">
                {{ n.salary.split("-")[0] }}K-{{ n.salary.split("-")[1] }}K
              </div>
            </div>
            <div style="color: grey">
              {{ n.workAddress }}/{{ n.experience }}/{{ n.education }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  props: ['eid'],
  components: {},
  data () {
    // 这里存放数据
    return {
      // salaryList: this.entList.salary.split('-'),
      entList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate () {},
  created () {
    setTimeout(() => {
      this.selectPostionByEnt()
      // this.getState()
    }, 11)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    goto () {
      this.$router.go(-1)
      // this.$router.back()
    },
    selectPostionByEnt () {
      this.axios
        .get('/api/postion/selectRPByEid', {
          params: {
            eid:   localStorage.getItem('eid')
          }
        })
        .then((res) => {
          if (res.data.code === '000000') {
            this.entList = res.data.data
          } else if (res.data.code === '111111') {
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showMsg (n) {
      this.$router.push({
        name: 'showJobInfo',
        params: {
          itemObj: n
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
button[disabled] {
  color: white !important;
}
.noshowbox{
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  margin-left: 9rem;
  font-size: 1.3rem;
  color: grey;
}
.box{
 height: 40vh;
  overflow-y: auto;

}
.bigcontext {
  width: 100%;
  text-align: left;
  margin-left: 1.2rem;
  height: 50vh;
}
.salary {
  flex: auto;
  text-align: right;
  margin-right: 2rem;
}
.mincontext {
  display: flex;
  flex-direction: flex-start;
}
.context {
  border-bottom: 1px solid rgb(216, 211, 211);
  height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
}
.trueAddress2 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
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
  margin-top: 0.4rem;
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
    overflow:hidden
}
.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}
</style>
