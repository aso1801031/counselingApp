<template>
    <v-container fluid fill-height class="home">
        
        <v-card width=20% height=auto color="brown lighten-4">
                
                <v-card-text>
                    <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="moveMypage()">
                    <h2>マイページ</h2>
                    </v-btn>
                </v-card-text>

                <v-card-text>
                    <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="moveRoomCreate()">
                    <h2>相談室募集</h2>
                    </v-btn>
                </v-card-text>

                <v-card-text>
                    <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="moveRoomSearch()">
                    <h2>相談室検索</h2>
                    </v-btn>
                </v-card-text>

                <v-card-text>
                    <v-btn class="homeBtn" large color="indigo" dark width=100% height=100px @click="logout()">
                    <h2>ログアウト</h2>
                    </v-btn>
                </v-card-text>

        </v-card>

    </v-container>
</template>

<script>
    export default {
        layout:"default1",
        methods: {
            moveMypage(){
                this.$router.push('../mypage')
            },
            moveRoomCreate(){
                this.$router.push('../room-create')
            },
            moveRoomSearch(){
                this.$router.push('../room-search')
            },
            logout() {
                // firebase.auth().signOut().then(function() {
                //   console.log("signout")
                // }).catch(function(error) {
                //   // An error happened.
                // });
                this.$router.push("/login");
            }
        }
    }
</script>
    
<style>
.home {
  background: url("../static/images/background.jpg");
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