<template>
  <div class="home">
    <nav>
      <router-link to="/mylist" class='btn' >返回</router-link>
       <div class="title">修改留言</div>
    </nav>
   
   <div class="list">
    <div class="box listbox">
     <textarea class="valbox" :placeholder='msgs.val.value' v-model="val.value"></textarea>
     <div class="btnbox">
       <span  class="btn comment" @click="postmodifylist">确认修改</span>
       <router-link to='/mylist' class="btn Fabulous">取消</router-link>
     </div>
    </div>
  </div>
    
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
    id:'',
    msgs:'' ,
    val:{
       'value' : ''
    }
   
    }
  },
  components: {},
   created(){
   this.id = this.$store.state;
   this.getmodifylist();
  },
  methods:{
  getmodifylist(){
    this.axios
        .get(
          "https://messageboards-5c29b.firebaseio.com/server/" +
            this.id.modifyid +
            ".json"
        )
        .then(data => {
          this.msgs = data.data;
          });
  },
  postmodifylist(){
    // alert(this.from)
     this.axios
        .patch(
          "https://messageboards-5c29b.firebaseio.com/server/" +
            this.id.modifyid +
            "/val.json",
            this.val
        )
        .then(() => {
          alert('修改成功')
          this.val.value = ''
          this.getmodifylist();
          });
  }
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
nav .title{
  color: #0B48D6;
  font-weight: bold;
  font-size: 20px;
}
.box {
  margin:40px 10px 0 10px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.list{
  width: 100vw;
}
.box.listbox{
  height: 250px;
  /* border: 1px #06DFF8 solid; */
  position: relative;
}
.listbox .valbox{
  display: block;
  margin: 20px 0 10px ;
  height: 150px;
  width: 100%;
  border: 1px #707070 dotted;

  text-align: left;
  padding:10px 20px;
  box-sizing: border-box;
  resize: none;
  border-radius: 10px;
  outline: none;
}
.listbox .btnbox{
  float:right;
}
.listbox .btn{
  display: inline-block;
  width: 90px;
  height: 30px;
  background: #B8B5B5;
  text-align: center;
  line-height: 30px;

 cursor: pointer;
  margin: 10px 10px 0 10px;
  border-radius: 3px;
}

</style>

