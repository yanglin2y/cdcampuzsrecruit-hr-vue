<!--  -->
<template>
  <div class="bigBox">
    <div class="demo_warp"
         id="my">
      <div v-if="this.aprList.length===0"
           class="noshowbox">
        还没有人通过初筛
      </div>
      <div class="bigcontext"
           v-if="this.aprList.length!==0">
        <div class="box">
          <div style="height:.7rem"></div>
          <div class="context"
               v-for="(n, inx) in aprList"
               :key="inx"
               @click="showMsg(n.uid)">
            <div class="mincontext">
              <div class="apName"><span style="font-weight: bold;">姓名：</span>{{ n.apName }}</div>
              <div class="education"><span style="font-weight: bold;">学历：</span>{{ n.education }}</div>
              <div class="rpName"><span style="font-weight: bold;">职位：</span>{{ n.rpName }}</div>
            </div>
            <van-divider />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ResumeItem from './Resume_Item.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ResumeItem },
  data() {
    // 这里存放数据
    return {
      aprList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    setTimeout(() => {
      this.selectHrResumeByHrid()

    }, 100)
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
     showMsg(n) {
      this.$router.replace({
        name: 'OnlineResume2',
        params: {
          uid: n,
        }
      })
    },
    selectHrResumeByHrid() {
      this.axios
        .get('/api/resume/selectHrResumeByHrid')
        .then((res) => {
          if (res.data.code === '000000') {
            this.aprList = res.data.data
          } else if (res.data.code === '111111') {

          } else {
            this.$message('服务繁忙, 请重试')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }

  }
}

</script>
<style lang='less' scoped>
.rpName{
    font-size: 1.3rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
}
.apName {
  font-size: 1.3rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
}
.education {
  font-size: 1.3rem;
  margin-left:1rem;
  margin-top: 0.5rem;
}
.bigcontext {
  width: 100%;
  text-align: left;
}
.mincontext {
  display: flex;
  flex-direction: flex-start;

}
.waitsee {
  overflow-y: auto;
  height: 82vh;
}
.bigBox {
  height: 100vh;
  width: 100%;
  background: white;
  border-radius: 1rem;
}
.demo_warp .tab_tit {
  font-size: 1.3rem;
  display: flex;
  flex: 1;
}
.demo_warp .active {
  color: black;
  font-weight: bold;
}
.demo_warp ul li {
  list-style: none;
  width: 23%;
  text-align: center;

  margin-top: 0.2rem;
  margin-left: 0.5rem;
}
.demo_warp .tab_con {
  width: 100%;
  height: 100vh;
  text-align: center;
}
</style>
