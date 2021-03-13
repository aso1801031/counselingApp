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
        consultanted_id: null,//相談に乗った人
        consultant_id: null,//相談した人
        consultanted_ticket: null,
        give:null, //相談に乗った数
        get:null, //相談した数
        consultant_ticket: null,
        totalstar:null, //相談に乗った人の星の合計
        stars:null,
        ave_star: null,
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
                this.consultanted_id = consultanted.id; //相談に乗った人
                this.consultanted_ticket = consultanted.data().ticket; //相談に乗った人のチケット
                this.totalstar = consultanted.data().totalstar; //相談に乗った人の星の数
                this.give = consultanted.data().give; //相談に乗った人の相談に乗った回数
                console.log("相談に乗った人：",this.consultanted_id,this.consultanted_name,
                this.consultanted_ticket,this.totalstar,this.give);
            });
            doc.data().consultant_id.get().then(consultant => {
                this.consultant_id = consultant.id //相談した人
                this.get = consultant.data().get;
                console.log("相談した人：",this.consultant_id,this.get);

            })

        });
    },
    methods:{
        async returnHome(){
            console.log(1,this.stars);
            await firebase.firestore().collection("counseling-rooms").doc(this.roomId)
            .get().then(doc =>  {
                doc.data().consulted_id.get().then(consultanted => {
                    //相談に乗った人の情報更新
                    let userRef = firebase.firestore().collection('users').doc(this.consultanted_id);
                    userRef.update({
                        give:this.give+1,
                        ticket:this.consultanted_ticket+1,
                        totalstar: this.totalstar + this.stars,
                    });
                });
                doc.data().consultant_id.get().then(consultant =>{
                    //相談した人の情報更新
                    let userRef1 = firebase.firestore().collection('users').doc(this.consultant_id);
                    userRef1.update({
                        get:this.get+1,
                    }).then(function(userRef1){
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