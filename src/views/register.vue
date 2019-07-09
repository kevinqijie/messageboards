<template>
  <div class="home">
    <nav>
      <div class="title">注册</div>
    </nav>
    <div class="box">
        <h2>用户注册</h2>
        <div class="lab">
            <label>用户名：</label><input type="text" v-model="from.username" @blur="Testingusername">
        </div>
        <div class="lab">
            <label>昵称：</label><input type="text" v-model="from.Nickname" @blur="TestingNickname"> 
        </div>
        <div class="lab">
            <label>密码：</label><input type="Password" v-model="from.password" @blur="getpasswordleg">
        </div>
        <div class="lab pstip">
            <label class="tip">密码强度：</label> 
            <span></span>
            <span></span>
            <span></span>
            <i>{{this.tip}}</i>
        </div>
        <div class="lab">
            <label>确认密码：</label><input type="Password" v-model="testingp" @blur="TestingPassword">
        </div>
        <div class="lab">
            <label>邮箱：</label><input type="email" v-model="from.email">
        </div>
        <div class="lab">
            <label>联系电话：</label><input type="text" v-model="from.tel">
        </div>
        <div class="btnbox">
            <p>已有账号请登录</p>
            <button class="login" @click="tologin">登陆</button>
            <button class="register" @click="register">注册</button>
        </div>
    </div>
   </div>
</template>

<script>
import { fstat } from 'fs';
export default {
  name: "home",
  data () {
    return {
     tip:'弱',
     from:{
         'username':'',
         'Nickname':'',
         'password':'',
         'email':'',
         'tel':''
          },
      timer:false,
      testingp:''    
    }
  },
  methods:{
      tologin(){
          this.$router.push({path:'/login'})
        // alert(123)
      },
      Testingusername(){
        this.axios.get('https://messageboards-5c29b.firebaseio.com/registry.json')
        .then(data=>{
            for(let key in data.data){
                if(data.data[key].username == this.from.username){
                    alert('用户名已存在');
                    this.from.username = ''
                }
            }
        })
      },
      TestingNickname(){
        this.axios.get('https://messageboards-5c29b.firebaseio.com/registry.json')
        .then(data=>{
            for(let key in data.data){
                if(data.data[key].Nickname == this.from.Nickname){
                    alert('昵称已存在');
                    this.from.Nickname = ''
                }
            }
        })
      },
      TestingPassword(){
          if(this.testingp == this.from.password){
             
          }else{
              alert('两次密码不一样')
          }
      },
      getpasswordleg(){
            var tip = document.getElementsByClassName('pstip')[0];
             document.getElementsByTagName('span')[0].className = 'w'
               document.getElementsByTagName('span')[1].className = 'w'
                 document.getElementsByTagName('span')[2].className = 'w'
          if(this.from.password.length < 6){
              this.tip = '弱';
            document.getElementsByTagName('span')[0].className = 'red'
          }else if(this.from.password.length >=6 && this.from.password.length <16){
              this.tip = '中'
             
             document.getElementsByTagName('span')[0].className = 'y'
               document.getElementsByTagName('span')[1].className = 'y'
          }else{
              this.tip = '强'
                document.getElementsByTagName('span')[0].className = 'gre'
               document.getElementsByTagName('span')[1].className = 'gre'
                 document.getElementsByTagName('span')[2].className = 'gre'
          }
      },
      register(){
          this.timer = false;
          for(let key in this.from){
            if(this.from[key] === ''){
                // console.log(key)
                 this.timer = true
                // return false
            }
            }
           if(this.timer){
            alert('以上信息均不能为空')
           }else{
             this.axios.post('https://messageboards-5c29b.firebaseio.com/registry.json',this.from)
             .then(()=>{
                 alert('注册成功,请去登陆')
                 this.from = {
         'username':'',
         'Nickname':'',
         'password':'',
         'email':'',
         'tel':''
          };
          this.testingp = ''
             }) 
           }
    
      }

  },
  components: {},
   created(){
 
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

nav .title{
  color: #0B48D6;
  font-weight: bold;
  font-size: 20px;
}
label{
    display: inline-block;
    width: 100px;
    text-align: right;
    height:30px;
    font-size: 20px;
}
label.tip{
    font-size: 12px;
    height: 20px;
}
.pstip span{
    display: inline-block;
    width: 30px;
    background: #fff;
    height: 10px;
   margin-left: 3px;
   
}
.pstip i{
    margin-right: -60px;
    margin-left: 3px;
}
input{
    /* height: 30px */
    box-sizing: border-box;
    padding: 3px 5px;
    border-radius: 5px;
}
.btnbox{
    height: 150px;
    /* position: relative; */
}
.btnbox p{
    font-size: 12px;
    margin-right: 170px;
    margin-top:10px;
}
.btnbox button.register{
    margin-left:160px;
    margin-right: -20px;
}
span.red{
    background: red;
}
span.y{
    background: #E4F30E;
}
span.gre{
    background: green;
}
span.w{
    background: #fff;
}
button{
    cursor: pointer;
}




</style>

