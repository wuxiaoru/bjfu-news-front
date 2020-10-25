<template>
  <!-- 窗体 -->
  <div class="login_container">
    <!-- loading动画 -->
    <img src="@/assets/loading.gif" class="login_box" alt="">
    <h2 class="login_box" style="top:60%">正在读取用户信息</h2>
  </div>
</template>

<script>
export default {
  created(){
    // 获取地址栏上的ticket 如果有 需要调接口获取用户信息 没有ticket 去localstorage拿用户信息
    if (this.$route.query.ticket) {
      alert(this.$route.query.ticket)
      this.$axios
      .get("/?ticket="+ this.$route.query.ticket)
      .then(res => {
        if (res.success) {
          localStorage.setItem("RoleType", res.role.toString());
          if (res.userInfo != undefined) {
            // localStorage.setItem(
            //   "UserId",
            //   res.userInfo.id == undefined ? "" : res.userInfo.id
            // );
            localStorage.setItem(
              "UserEno",
              res.userInfo.eno == undefined ? "" : res.userInfo.eno
            );
            localStorage.setItem(
              "UserName",
              res.userInfo.userName == undefined
                ? ""
                : res.userInfo.userName
            );
            // localStorage.setItem(
            //   "UserUnit",
            //   res.userInfo.unit == undefined ? "" : res.userInfo.unit
            // );
            // localStorage.setItem(
            //   "UserJob",
            //   res.userInfo.job == undefined ? "" : res.userInfo.job
            // );
            // localStorage.setItem(
            //   "UserMail",
            //   res.userInfo.mail == undefined ? "" : res.userInfo.mail
            // );
            // localStorage.setItem(
            //   "UserOfficePhone",
            //   res.userInfo.officePhone == undefined
            //     ? ""
            //     : res.userInfo.officePhone
            // );
            // localStorage.setItem(
            //   "UserMobile",
            //   res.userInfo.mobile == undefined ? "" : res.userInfo.mobile
            // );
          }
          // 如果 res.role 为空，证明是新用户，需要跳转improve-info界面
          if (res.role.length == 0) {
            localStorage.setItem(
              "UserEno",
              res.eno == undefined ? "" : res.eno
            );
            this.$router.push("/improve-info");
          } else {
            this.$router.push("/home-main");
          }
        }   
      }); 
    } else {
      if (!localStorage.getItem('UserId')) {
        window.location.href = "http://cas.bjfu.edu.cn/cas/login?service=http://tgxt.bjfu.edu.cn/NewsManager/"
      }
    }    
  }
};
</script>

<style lang="less" scoped>
// 窗体的背景颜色
.login_container {
  background-color: #fff;
  height: 100%;
}
// 登录框
.login_box {
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
