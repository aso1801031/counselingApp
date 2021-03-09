<template>
  <v-app id="app">
    <!--ヘッダー-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="indigo white--text"
      >
    <h1>
      <nuxt-link to='/home' class="white--text" style="text-decoration: none;">
      Links
      </nuxt-link>
    </h1>
    <v-spacer />
    <div v-for="(item,i) in items"
      :key="i"
      :to="item.to"
      router
      exact>
      <nuxt-link v-bind='item' class="white--text mr-3" style="text-decoration: none;">
        {{item.title}}
      </nuxt-link>
    </div>
    <div>
      <button @click="logout">ログアウト</button>
    </div>
  </v-app-bar>
   
    <!--メイン-->
    <v-main class="blue-grey lighten-5">
        <nuxt />
    </v-main>

    <!--フッター-->
    <v-footer
      :absolute="!fixed"
      app
      class="indigo white--text"
      >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>
<script>
  import firebase from '~/plugins/firebase'
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            title: '募集',
            to: '/room-create'
          },
          {
            title: '検索',
            to: '/room-search'
          },
          {
            title: 'マイページ',
            to: '/mypage'
          },  
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    methods: {
      logout() {
        // firebase.auth().signOut().then(function() {
        //   console.log("signout")
        // }).catch(function(error) {
        //   // An error happened.
        // });
        this.$router.push("/login");
      }
    },
    created: ()=>{
  
    },
  }
</script>
  
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.main_contain{
  margin: 0%;
  padding: 0%;
}
</style>
