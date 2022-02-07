import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login.vue'
import register from '../page/Register.vue'
import myInfo from '../page/MyInfo.vue'
import updataHR from '../page/Updata_HR.vue'
import postJob from '../page/PostJob.vue'
import showJobInfo from '../page/ShowJobInfo.vue'
import showJob from '../page/showJob.vue'
import updataPass from '../page/UpdataPass.vue'
import mymessage from '../page/MyMessage.vue'
import OnlineResume from '../page/OnlineResume.vue'
import OnlineResume2 from '../page/OnlineResume2.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'myInfo',
    component: myInfo
  },{
    path: '/updataHR',
    name: 'updataHR',
    component: updataHR
  }
  , {
    path: '/postJob',
    name: 'postJob',
    component: postJob
  }, {
    path: '/showJobInfo',
    name: 'showJobInfo',
    component: showJobInfo,
  }, {
    path: '/showJob',
    name: 'showJob',
    component: showJob,
  }
  , {
    path: '/updataPass',
    name: 'updataPass',
    component: updataPass,
  },{
    path: '/mymessage',
    name: 'mymessage',
    component: mymessage
  }, {
    path: '/myInfo',
    name: 'myInfo',
    component: myInfo
  },{
    path: 'OnlineResume',
    name: 'OnlineResume',
    component: OnlineResume
  }
  , {
    path: 'OnlineResume2',
    name: 'OnlineResume2',
    component: OnlineResume2
  }




]
})
