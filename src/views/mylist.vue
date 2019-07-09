<template>
  <div class="home">
    <nav>
      <router-link to="/" class="btn">返回</router-link>
      <div class="title">我的留言</div>
    </nav>
    <div class="list" v-for="msg in msgs">
      <div class="box listbox">
        <div class="user">{{msg.Nickname}}:</div>
        <div class="valbox" @click="pushmodify(msg.id)">{{msg.val.value}}</div>
        <div class="btnbox">
          <span to="/modifylist" class="btn comment" @click="pushmodify(msg.id)">修改</span>
          <span class="btn Fabulous" @click="delmylist(msg.id)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      Nickname: "",
      msgs: []
    };
  },
  components: {},
  methods: {
    delmylist(data) {
      this.axios
        .delete(
          "https://messageboards-5c29b.firebaseio.com/server/" + data + ".json"
        )
        .then(() => {
          alert("删除成功");
          this.getmylist();
        });
    },
    pushmodify(data) {
      this.$store.commit("receivemodify", data);
      this.$router.push({ path: "/modifylist" });
    },
    getmylist() {
      this.msgs = [];
      this.axios
        .get("https://messageboards-5c29b.firebaseio.com/server.json")
        .then(data => {
          for (let key in data.data) {
            data.data[key].id = key;
            if (data.data[key].Nickname == this.Nickname) {
              this.msgs.push(data.data[key]);
            }
          }
        });
    }
  },
  created() {
    this.Nickname = localStorage.getItem("Nickname");
    this.getmylist();
  }
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
nav .btn {
  float: left;
  background: #2ba8ac;
  width: 60px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;

  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #000;
}
nav .title {
  color: #0b48d6;
  font-weight: bold;
  font-size: 20px;
}
.box {
  margin: 10px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.list {
  width: 100vw;
}
.box.listbox {
  height: 200px;
  border: 1px #06dff8 solid;
  position: relative;
}
.listbox .user {
  position: absolute;
  left: 20px;
  top: 20px;
}
.listbox .valbox {
  margin: 40px 30px 0 30px;
  height: 100px;
  border: 1px #707070 solid;
  border-radius: 10px;
  text-align: left;
  padding: 10px 20px;
  box-sizing: border-box;
}
.listbox .btnbox {
  float: right;
}
.listbox .btn {
  display: inline-block;
  width: 50px;
  height: 30px;
  background: #b8b5b5;
  text-align: center;
  line-height: 30px;

  cursor: pointer;
  margin: 10px 10px 0 10px;
  border-radius: 3px;
}
</style>

