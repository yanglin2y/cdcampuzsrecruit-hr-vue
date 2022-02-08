<!--  -->
<template>
  <div class="mybody">
   <van-sticky :offset-top="0.0001" class="headerTitile">
      <van-nav-bar title="搜索">
        <template #left>
          <van-icon name="arrow-left" color="white" size="24" @click="goto()" />
        </template>
      </van-nav-bar>
           <van-search
        class="searchbar"
        v-model="searchValue"
        placeholder="请输入公司"
        background="#119cbe"
        @keydown.enter="keypush()"
      />
    </van-sticky>
     <div class="workAddress2">
        <div class="">
          <div class="bigcontext"
               v-if="this.entList.length!==0">
            <div class="box">
              <div class="context"
                   v-for="(n, inx) in entList"
                   :key="inx"
                   @click="showMsg(n.entName,n.eid)">
                <div class="mincontext">
                  <div style="font-weight: bold; font-size: 1.3rem;margin-top:1rem">{{ n.entName }}</div>
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

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {  },
  data () {
    // 这里存放数据
    return {
      entList: [],
       searchValue:''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  // 方法集合
  methods: {
    showMsg(entName,eid){
      const params = new FormData()
	    params.append('entName', entName)
      params.append('eid', eid)
        this.$dialog.confirm({
        message: '是否选择'
      })
        .then(() => {
          this.axios
            .post('/api/user/postHr',params)
            .then((res) => {
              if (res.data.code === '111111') {
                this.$notify({ type: 'warning', message: res.data.message })
              } else if (res.data.code === '000000') {
                this.$notify({ type: 'success', message: res.data.message })
              } else {
                this.$notify({ type: 'warning', message: '服务繁忙, 请重试' })
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
    keypush () {
      this.entList = []
      this.selctPostionByCondition()
    },
    selctPostionByCondition () {
      this.axios
        .get('/api/ent/selectEntInfoByEntName', {
          params: {  entName: this.searchValue }
        })
        .then((res) => {
          if (res.data.code === '000000') {
              this.entList = res.data.data
          } else {
            this.$message('服务繁忙, 请重试')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goto () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
.workAddress2{
  height: 87vh;
  overflow-y: auto;
}
.vlist{
  height: 87vh;
 overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.messageBox{
  height: 87vh;
  margin-top: .1rem;
}
.mybody{
  height: 100vh;
  width: 100%;
  background: white;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 1.4rem;
  border: 0px;
}
.van-nav-bar {
  background-color: #119cbe;
  border: 0px;
}
.van-hairline--bottom:after {
  border-bottom-width: 0px;
}
</style>
