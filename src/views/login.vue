<template>
  <div class="home">
    <nav>
      <div class="title">登陆</div>
    </nav>
    <div class="box">
      <h2>用户登陆</h2>
      <div class="lab">
        <label>用户名：</label>
        <input type="text" v-model="from.username">
      </div>

      <div class="lab">
        <label>密码：</label>
        <input type="Password" v-model="from.password">
      </div>
      <div class="btnbox">
        <p>未有账号?请注册</p>
        <button class="login" @click="login">登陆</button>
        <button class="register" @click="toregister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      from: {
        username: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    toregister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      this.axios
        .get("https://messageboards-5c29b.firebaseio.com/registry.json")
        .then(data => {
          for (let key in data.data) {
            if (data.data[key].username === this.from.username) {
              if (data.data[key].password === this.from.password) {
                localStorage.setItem("username", data.data[key].username);
                localStorage.setItem("Nickname", data.data[key].Nickname);
                this.msg = "登陆成功！";
                this.$router.push({ path: "/" });
              } else {
                this.msg = "密码错误！";
              }
              break;
            } else {
              this.msg = "用户名错误！";
            }
          }
          alert(this.msg);
        });
    }
  },
  components: {},
  created() {}
};
</script>
<style scoped>
.home {
  width: 100vw;
  background: #eeeeee;
}
nav {
  width: 100%;
  height: 50px;
  background: #1dd4c1;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
}

nav .title {
  color: #0b48d6;
  font-weight: bold;
  font-size: 20px;
}
label {
  display: inline-block;
  width: 100px;
  text-align: right;
  height: 30px;
  font-size: 20px;
}

input {
  /* height: 30px */
  box-sizing: border-box;
  padding: 3px 5px;
  border-radius: 5px;
}
.btnbox {
  height: 150px;
  /* position: relative; */
}
.btnbox p {
  font-size: 12px;
  margin-right: -200px;
  margin-top: 10px;
}
.btnbox button.register {
  margin-left: 160px;
  margin-right: -20px;
}
span.red {
  background: red;
}
span.y {
  background: #e4f30e;
}
span.gre {
  background: green;
}
button {
  cursor: pointer;
}
</style>

