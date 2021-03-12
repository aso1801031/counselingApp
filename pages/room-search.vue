<template>
    <div class="serach_main container">
        <v-card 
        elevation="2"
        style="border-radius: 10px;"
        max-width="900"
        class="mx-auto">
            <v-container class="search_card">
                <p class="search_title">相談室を検索</p>
                <!--フォーム-->
                <v-form>
                    <v-row class="row_el_top">
                        <v-col cols="12" sm="5" xs="12">
                            <!--名前-->
                            <v-text-field
                            label="ニックネーム"
                            v-model="nickname"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="5" offset="2" xs="12">
                            <!--性別選択-->
                            <v-select
                            :items="sexs"
                            label="性別"
                            v-model="sex"
                            required></v-select>
                        </v-col>

                        <v-col cols="12" sm="5" xs="12">
                            <!--年齢選択-->
                            <v-select
                            :items="ages"
                            label="年齢"
                            v-model="age"
                            required></v-select>
                        </v-col>

                        <v-col cols="12" sm="5" offset="2" xs="12">
                            <!--カテゴリー選択-->
                            <v-select
                            :items="categorys"
                            label="カテゴリー"
                            v-model="category"
                            required></v-select>
                        </v-col>

                    </v-row>
                    
                    <!--検索ボタン-->
                    <v-card-actions class="mt-15">
                        <v-btn class="mx-auto" outlined depressed elevation="2" color="success" v-on:click="serach()">
                            検索
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-container>
        </v-card>

        <div v-if="!search_result.length == 0">
            <div v-for="result in search_result" :key="result.title">
                <v-card
                class="mx-auto mt-8 detail_card"
                style="border-radius: 10px;"
                elevation="2"
                max-width="900"
                outlined>
                    <v-container>
                        <v-row>
                            <v-col cols="12"  md="6" class="pb-0">
                                <!--ネックネーム-->
                                <v-card-title><h2 class="pb-0">{{result.user.nickname}}</h2></v-card-title>
                            </v-col>
                            <v-col cols="12"  md="6" class="pb-0">
                                <!--タイトル-->
                                <v-card-title><h2 class="pb-0">{{result.title}}</h2></v-card-title>
                            </v-col>
        
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="12"  md="6" class="ml-3">
                                <!--評価-->
                                <p class="mb-2">
                                    <v-icon color="yellow darken-2" large>mdi-star</v-icon> : {{result.user.average}} ,
                                    総相談回数:{{result.user.total}}件
                                </p>
                                <p class="mb-2">{{result.user.age}}</p>
                                <p class="mb-2">{{result.user.sex}}</p>
                                <p class="mb-2">{{result.category}}</p>
                            </v-col>
                            <v-col cols="12" md="4" offset="1">
                                <!--参加ボタン-->
                                <div class="join_btn_div">
                                    <v-btn 
                                    class="pl-15 pr-15"
                                    outlined 
                                    depressed 
                                    elevation="1" 
                                    color="success"
                                    v-on:click="join(result.cou_id)"
                                    x-large>
                                        参加
                                    </v-btn>                  
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>     
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from '~/plugins/firebase';

    export default {
        data: () => ({
            myid:"",
            nickname: null,
            sex: null,
            age: null,
            category: null,
            sexs: ['男性', '女性', 'その他'],
            ages: ["15~19","20~29","30~39"],
            categorys: ["勉強","趣味","学校","ゲーム","スポーツ","仕事","恋愛","その他"],
            search_results: [],
            search_result: [],

        }),
        computed:{
        },
        methods: {
            async serach(){
                //名前検索
                this.search_results=[];
                this.search_result=[];
                let cate_name=""
                if(this.nickname !== null){
                    await firebase.firestore().collection('counseling-rooms').get().then(snapshot => {
                        snapshot.forEach(doc => {
                            console.log("相談者nullcheck:",doc.data().consultant_id,doc.data().consultant_id == null)
                            if(doc.data().consultant_id == null){
                                doc.data().category.get().then(category => {
                                    cate_name = category.data().name;
                                });
                                doc.data().consulted_id.get().then(res => { 
                                    if(this.nickname == res.data().nickname){
                                        console.log("1:検索成功: "+ res.data().nickname,"docid:",doc.id);
                                        this.search_results.push({ title:doc.data().title , user:res.data() , category:cate_name ,cou_id:doc.id, })
                                    }
                                });
                            }
                        });
                    })
                }

                //カテゴリ検索
                if(this.category !== null){
                    await firebase.firestore().collection('counseling-rooms').get().then(snapshot => {
                        snapshot.forEach(doc => {
                            console.log("1カテゴリnullcheck:",doc.data().category,doc.data().category == null)
                            if(doc.data().consultant_id == null){
                                doc.data().category.get().then(category => {
                                    console.log(2,category.data().name)
                                    //cate_name = category.data().name;
                                    if(this.category == category.data().name){
                                        doc.data().consulted_id.get().then(res => { 
                                            console.log("3:検索成功: "+ res.data(),"docid:");
                                            this.search_results.push({ title:doc.data().title , user:res.data() , category:category.data().name ,cou_id:doc.id, })
                                            this.distinct()
                                        });
                                    }
                                });
                            }
                        });
                    })
                }


            },
            async join(id){
                let mypath = firebase.firestore().collection("users").doc(this.myid);
                console.log(id ,mypath);
                await firebase.firestore().collection('counseling-rooms').doc(id).update({
                    consultant_id:mypath,
                });

                window.location.href="/room/"+id;
            },
            distinct(){
                console.log("4",this.search_results);
                this.search_result = [...new Set(this.search_results)];
            }
        },
        created:function () {
            this.myid = this.$store.state.id;
            console.log("ceated storeid:",this.$store.state.id)

        }
    }

</script>

<style>
    .search_card{
        margin: auto;
        padding: 20px;
    }
    .search_title{
        text-align: center;
        font-size: 2em;
    }
    .join_btn_div{
        text-align: right;
        margin-top: 60px;
        margin-left: 30px;
    }
    .join_btn{
        padding: 0px 20px;
    }
</style>
  