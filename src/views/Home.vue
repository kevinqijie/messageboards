<template>
  <div class="home">
    <nav>
      <span class="tip">欢迎您~</span>
      <span>{{from.Nickname}}</span>
      
      <router-link to="/mylist" class="btn">我的留言</router-link>
      <div class="title">首页</div>
    </nav>
    <div class="iptbox box">
      <textarea placeholder="留下你的足迹" v-model="from.val.value"></textarea>
      <div class="sbubtn" @click="pushdata">发表</div>
    </div>
   <div class="list">
    <div class="box listbox" v-for="(detailsdata,index) in detailsdatas" :key='index'>
     <div class="user">{{detailsdata.Nickname}}:</div>
     <div class="valbox" @click="pushdetails(detailsdata.id)">{{detailsdata.val.value}}</div>
     <div class="btnbox">
       <span class="btn comment" @click="pushdetails(detailsdata.id)">评论{{Object.keys(detailsdata.Point).length-1}}</span>
       <span class="btn Fabulous" @click="postcomment">点赞{{Object.keys(detailsdata.comment).length-1}}</span>
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
      detailsdatas :[],
      from:{
        Nickname : '',
        username : '',
        val :{
          'value' :''
          },
        Point:{
          0:{
            'Nickname':'评论',
            'point' :''
          }
        },
        comment:{
                0:{
                  'Nickname' : '点赞'
                }
                },
        date:''

      }
    }
  },
  components: {
   
  },
  methods:{
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
    },
    pushdetails(data){
      // console.log(data)
    this.$store.commit('receivedetails',data)
     this.$router.push({path:'/detailslist'})
    },
    getlist(){
     this.detailsdatas = [];
      this.axios.get('https://messageboards-5c29b.firebaseio.com/server.json')
      .then((data)=>{
      
         for(let key in data.data){
           data.data[key].id = key
           this.detailsdatas.push(data.data[key])
         }
       
      })
    },
    pushdata(){
      // console.log(this.axios)
     if(this.from.val.value){
            var date = new Date();
      var Year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDate();
      this.from.date = Year+'年'+(month+1)+'月'+day+'日';
      this.axios.post('https://messageboards-5c29b.firebaseio.com/server.json',this.from)
      .then(()=>{
       alert('添加成功')
       this.from.val.value = '';
      this.getlist()
      })
      .catch(err=>{
        console.log(err)
      })
     }else{
       alert('留言不能为空')
     }
    }
  },
  created(){
    if(localStorage.getItem('username')){
      this.from.Nickname = localStorage.getItem('Nickname');
      this.from.username = localStorage.getItem('username')
    this.getlist()
    }else{
      this.$router.push({path:'/login'})
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
  padding: 10px 20px;
  box-sizing: border-box;
 position: relative;
}
nav span {
  float: left;
  margin: 0 3px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
nav span.tip {
  color: #f80627;
  font-size: 15px;
}
nav .btn {
  float: right;
  background: #2ba8ac;
  width: 90px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 3px;
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
  margin: 10px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.iptbox {
  border: #06dff8 3px solid;
  height: 130px;

  position: relative;
}
.iptbox textarea {
  height: 70px;
  width: 100%;
  resize: none;
  border: 1px #707070 solid;
  border-radius: 10px;
  outline: none;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}
.iptbox .sbubtn {
  position: absolute;
  width: 60px;
  height: 30px;
  background: #08acf5;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  bottom: 7px;
  right: 15px;
  cursor: pointer;
}
.list{
  width: 100vw;
}
.box.listbox{
  height: 200px;
  border: 1px #06DFF8 solid;
  position: relative;
  cursor: pointer;
}
.listbox .user{
  position:absolute;
  left: 20px;
  top:20px;
}
.listbox .valbox{
  margin: 40px 30px 0 30px;
  height: 100px;
  border: 1px #707070 solid;
  border-radius: 10px;
  text-align: left;
  padding:10px 20px;
  box-sizing: border-box;
}
.listbox .btnbox{
  float:right;
}
.listbox .btn{
  display: inline-block;
  width: 50px;
  height: 30px;
  background: #B8B5B5;
  text-align: center;
  line-height: 30px;

 cursor: pointer;
  margin: 10px 10px 0 10px;
  border-radius: 3px;
}

</style>

