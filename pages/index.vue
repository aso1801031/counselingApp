<template>
  <v-container fluid fill-height class="home">
      
      <v-card width=20% height=auto color="brown lighten-4">
              
        <v-card-text>
            <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="login()">
            <h2>ログイン</h2>
            </v-btn>
        </v-card-text>

        <v-card-text>
            <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="registration()">
            <h2>新規登録</h2>
            </v-btn>
        </v-card-text>

      </v-card>

  </v-container>
</template>

<script>
  export default {
      layout:"default1",
      methods: {
          login(){
              this.$router.push('/login')
          },
          registration(){
              this.$router.push('/registration')
          },
      }
  }
</script>
  
<style>
.home {
background: url("../static/images/links.jpg");
background-size: cover;
background-position: center top 38%;
width: 100%;
height: 100%;
}
.homeBtn {
  padding: auto;
  margin: auto;
}
</style>