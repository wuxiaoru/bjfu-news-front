// 在官方的axios的基础上封装一个添加拦截器的axios
// import axios from 'axios'
// 引入Vuex
import store from '../src/store'
// 引入路由
import router from '../src/router'

// 配置默认的请求地址头
axios.defaults.baseURL = process.env.VUE_APP_Back

// 全局添加拦截器的作用是可以在每个API前面加上headers的token验证
axios.interceptors.request.use(config => {
  // 判断token是否存在和是否需要token验证的路由
  if (localStorage.getItem('UserEno')) {
    config.headers.userId = localStorage.getItem('UserEno')
  };
  return config;
})

// 处理退出响应的拦截器 err可以捕获状态，来进行响应的处理
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    const res = response.data;
    // // 如果code是-1 说明用户注销或者token已经过期了 需要消除localstorage和vuex中的token
    // if (res.code === -1) {
    //   // clearHandler();
    // }
  }
  return response.data;
},
  err => {
    console.log(err);
    if (err.response === undefined) {
      //如果没有status的话证明，接口报错，直接到指定的 地址
      console.log(err);
      // window.location.href = 'http://wwww.baidu.com';
    }
    // 判断是否授权
    // if (err.response.status === 401) {
    //   clearHandler();
    // }
  });

export default axios