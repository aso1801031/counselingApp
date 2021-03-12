<template>
    <div class="container">

        <v-card class="mx-auto" max-width="900" align="center">
            <v-card-text>
                <p class="display-1 text--primary">
                    相談室作成
                </p>

                <h5 class="text--primary" align="left"> タイトル</h5>
                <v-col cols="12" sm="7">
                    <v-text-field v-model="title" counter="25" label="タイトル"></v-text-field>
                </v-col>

                <h5 class="text--primary" align="left">カテゴリー</h5>
                <v-radio-group v-model="category" column>
                    <v-row>
                        <v-col cols="12" sm="2" md="2"></v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="勉強" value=1></v-radio>
                            <v-radio label="スポーツ" value=2></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="趣味" value=3></v-radio>
                            <v-radio label="仕事" value=4></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="学校" value=5></v-radio>
                            <v-radio label="恋愛" value=6></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="ゲーム" value=7></v-radio>
                            <v-radio label="その他" value=8></v-radio>
                        </v-col>
                    </v-row>
                </v-radio-group>
            </v-card-text>
            
            <v-card-actions>
                <v-btn class="mx-auto" align="center" outlined depressed elevation="2" color="success" @click="addRoom()">
                    作成
                </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
import firebase from '~/plugins/firebase'
var db = firebase.firestore();

export default {
    data(){
        return{
            db: null,
            room: null,
            myid: "",
            title: "",
            category: "",
        }
    },
    created(){
        this.db = firebase.firestore();
        this.room = this.db.collection('counseling-rooms');
        this.myid = this.$store.state.id;

    },
    methods: {
        addRoom(){
            if(this.title === "" || this.category === ""){ return }
            let mypath = firebase.firestore().collection("users").doc(this.myid);
            let catepath = firebase.firestore().collection("categorys").doc(this.category);
            console.log(mypath,catepath);

            this.room.add({
                title: this.title,
                category: catepath,
                consulted_id: mypath,
                consultant_id: null,                
            }).then(function(docRef){
                console.log('成功！',docRef.id);
                window.location.href="/room/"+docRef.id;
            }).catch(function(error){
                console.log('失敗...',error);
            })
        }
    }
}

</script>

<style>
</style>