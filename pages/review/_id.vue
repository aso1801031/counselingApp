<template>
    <div class="container">

        <v-card class="mx-auto" max-width="600" align="center">
            <v-card-text>
                <p class="display-1 text--primary"><!-- ユーザー名に後で変更 -->
                    {{consultanted_name}}さんの対応はどうでしたか？
                </p>

                <v-col cols="6"><!-- 星プルダウン -->
                    <v-select color="yellow" :items="states" v-model="stars" menu-props="auto" label="星いくつ？" hide-details prepend-icon="mdi-star" single-line></v-select>
                </v-col>
            </v-card-text>
            
            <v-card-actions>
                <v-btn class="mx-auto" align="center" outlined depressed elevation="2" color="success" @click="returnHome()">
                    完了
                </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
    
    data () {
      return {
        roomId: this.$route.params.id,
        consultanted_name: "",
        consultanted_id: null,
        stars:null,
        ave_stars:0,
        states: [
          5, 4, 3, 2,1
        ],
      }
    },
    created(){
        firebase.firestore().collection("counseling-rooms").doc(this.roomId)
        .get().then(doc =>  {
            doc.data().consulted_id.get().then(consultanted => {
                this.consultanted_name = consultanted.data().nickname;
                this.consultanted_id = consultanted.id;
                console.log(this.consultanted_id,this.consultanted_name);
            })
        });
    },
    methods:{
        async returnHome(){
            console.log(1,this.stars);
            await firebase.firestore().collection("counseling-rooms").doc(this.roomId)
            .get().then(doc =>  {
                doc.data().consulted_id.get().then(consultanted => {
                    if(consultanted.data().average == 0){
                        this.ave_stars=this.stars
                    }else{
                        this.ave_stars = Math.round(((consultanted.data().average+this.stars)/2)*10)/10;
                    }
                    let userRef = firebase.firestore().collection('users').doc(this.consultanted_id);
                    userRef.update({
                        /* 一致した場合 */
                        average: this.ave_stars,
                    }).then(function(userRef){
                        window.location.href="/home";
                    }).catch(function(error){
                        console.log('失敗...',error);
                    })

                })
            });
            
        }
    }
}

</script>

<style>
</style>