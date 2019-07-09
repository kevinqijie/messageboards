<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
   

  // methods:{
  //   get(){
  //   this.axios.get('https://messageboards-5c29b.firebaseio.com/server.json')
  //   .then(data=>{
  //     // console.log(data.data)
  //     var Data = data.data;
  //     for(let key in Data){
  //      if(Data[key].username == 'aa'){
  //        console.log(11)
  //      }else{
  //        console.log('不存在')
  //      }
  //     }
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  //   }
  // }
}
</script>

<style lang="scss">
body{
  margin: 0;
  background: #eeeeee;

}
a{
  text-decoration: none;
  color: #000;
}
input{
  outline: none;
  border: none;
}
body::-webkit-scrollbar {
    width:0;
    height:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
  color: #2c3e50;
 width: 100vw;
 height: 100vh;
 
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
