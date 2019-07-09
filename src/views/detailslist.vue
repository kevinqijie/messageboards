<template>
  <div class="home">
    <nav>
      <router-link to="/" class="btn">返回</router-link>
      <div class="title">详细信息</div>
    </nav>
    <div class="box">
      <div class="usertitle">{{msgs.Nickname}}:</div>
      <div class="listbox">
        <div class="list">
          <div class="val">{{msgs.val.value}}</div>
          <div class="date">{{msgs.date}}</div>
        </div>
        <div class="btnbox">
          <span class="btn listbtn">评论({{Object.keys(msgs.Point).length-1}})</span>
          <span class="btn listbtn" @click="postcomment">点赞({{Object.keys(msgs.comment).length-1}})</span>
        </div>
      </div>
      <div class="plistbox">
        <div class="plist" v-for="(point,index) in msgs.Point" :key="index">
          <span class="username">{{point.Nickname}}：</span>
          <span class="pval">{{point.point}}</span>
        </div>
      </div>
      <div class="iptbox">
        <input type="text" v-model="point.point">
        <span @click="postpoint" class="sbtn">发表</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgs: "",
      id: "",
      point: {
        'Nickname': "",
        'point': ""
      },
      comment: {
        'Nickname': ""
      },
      key: true
    }
  },
  name: "home",
  components: {},
  methods: {
    getdetailslist() {
      this.axios
        .get(
          "https://messageboards-5c29b.firebaseio.com/server/" +
            this.id.id +
            ".json"
        )
        .then(data => {
          this.msgs = data.data;
        });
    },
    postpoint() {
      this.axios
        .post(
          "https://messageboards-5c29b.firebaseio.com/server/" +
            this.id.id +
            "/Point.json",
          this.point
        )
        .then(() => {
          alert("评论成功");
          this.point.point = "";
          this.getdetailslist();
        });
    },
    postcomment() {
      // alert(123)
      if (this.key) {
        this.axios
          .post(
            "https://messageboards-5c29b.firebaseio.com/server/" +
              this.id.id +
              "/comment.json",
            this.comment
          )
          .then(() => {
               this.getdetailslist();
          })
          .catch(err => {
            console.log(err);
          });
        this.key = false;
      } else {
        alert("你已经点过赞了");
      }
    }
  },
  created() {
    this.id = this.$store.state;
    this.point.Nickname = localStorage.getItem("Nickname");
    this.comment.Nickname = localStorage.getItem("Nickname");
    this.getdetailslist();
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
.btn {
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
  box-sizing: border-box;
  /* padding: 10px; */
  width: 100vw;
  margin-bottom: 0;
}
.usertitle {
  width: 120px;
  margin-top: 5px;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 30px 0 20px;
  box-sizing: border-box;
}
.listbox {
  margin: 10px 50px 0 50px;
  height: 200px;
  background: #fff;
  padding: 5px 20px;
  position: relative;
}
.listbox .list .val {
  width: 100%;
  text-align: left;
  height: 130px;
}
.listbox .list .date {
  width: 100%;
  text-align: right;
  height: 30px;

  line-height: 30px;
}

.listbox .btnbox {
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 250px;
}
.btn.listbtn {
  width: 80px;
  background: #eeeeee;
  border: #707070 solid 1px;
  margin-left: 10px;
  text-align: center;
  padding: 0;
  float: right;
}
.plistbox {
  margin: 10px 50px 0 50px;
  padding: 10px 10px;
  height: 200px;
  /* background: #000; */
  overflow: hidden;
  overflow-y: auto;
}
.plistbox .plist {
  width: 100%;
  height: 30px;
  /* background: #000; */
  border-bottom: 2px #707070 dotted;
  margin-top: 5px;
}
.plistbox .plist span {
  float: left;
}
.iptbox {
  width: 100%;
  height: 45px;
  position: fixed;
  border: #0b48d6 2px solid;
  border-radius: 10px;
  box-sizing: border-box;
  bottom: 10px;
  overflow: hidden;
}
.iptbox input {
  height: 100%;
  width: 100%;

  padding: 0 60px 0 10px;
  box-sizing: border-box;
}
.iptbox .sbtn {
  height: 100%;
  width: 60px;
  display: inline-block;
  position: absolute;
  right: 0;
  cursor: pointer;
  line-height: 45px;
  text-align: center;
  background: #08acf5;
}
</style>

