<template>
    <div class="main_div">
        <v-card 
            elevation="2"
            style="border-radius: 10px;"
            class="pr-16 pl-10 mt-16 pt-10 pb-3 mb-16"
            >
            <v-container class="signup_card pt-16">
                <!--form-->
                <v-form>

                    <!-- e-mail  -->
                    <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-5">メールアドレス</h3>
                        </v-col>
                        <v-col cols="12" md="8">                           
                                <v-text-field
                                v-model="mailadress"
                                label="メールアドレス"
                                ></v-text-field>                            
                        </v-col>
                    </v-row>

                    <!-- password -->                
                    <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-10">パスワード</h3>
                        </v-col>
                        <v-col cols="12" md="4">                        
                            <v-text-field
                            v-model="password"
                            label="パスワード"
                            type="password"
                            class="mt-5"
                            ></v-text-field>                      
                        </v-col>
                        <v-col cols="12" md="4">                        
                            <v-text-field
                            v-model="confirmation"
                            label="再入力"
                            type="password"
                            class="mt-5"
                            ></v-text-field>                      
                        </v-col>
                    </v-row>
                    
                    <!-- name  -->
                    <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-10">ニックネーム</h3>
                        </v-col>
                        <v-col cols="12" md="8">                            
                            <v-text-field
                            v-model="nickname"
                            label="ニックネーム"
                            class="mt-5"
                            ></v-text-field>                           
                        </v-col>
                    </v-row>

                    <!-- sex  -->
                    <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-10">性別</h3>
                        </v-col>
                        <v-col cols="12" md="8">                            
                            <v-radio-group
                                class="mt-9"
                                v-model="sex"
                                row
                                >
                                <v-radio
                                    label="男"
                                    value="男"
                                ></v-radio>
                                <v-radio
                                    label="女"
                                    value="女"
                                ></v-radio><v-radio
                                    label="その他"
                                    value="その他"
                                ></v-radio>
                            </v-radio-group>                   
                        </v-col>
                    </v-row>

                    <!-- age -->
                    <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-10">年齢</h3>
                        </v-col>
                        <v-col cols="12" md="4">                            
                            <v-text-field
                            v-model="age"
                            label="年齢"
                            class="mt-5 mr-16"
                            ></v-text-field>                            
                        </v-col>
                        <v-col cols="12" md="4">                                                        
                        </v-col>
                    </v-row>

                    <!-- Profile -->
                     <v-row>
                        <v-col cols="12" md="4" align=center class="mb-16">
                            <h3 class="mt-10">自己紹介</h3>
                        </v-col>
                        <v-col cols="12" md="8">                            
                            <v-textarea
                            v-model="profile"
                            auto-grow
                            class="mt-5"
                            label="自己紹介"
                            rows="1"
                            ></v-textarea>                            
                        </v-col>
                    </v-row>
                    
                    <!--signup_btn-->
                    <div class="signup_btn mb-16 mt-10">
                        <v-btn 
                        :disabled="!isFormCompleted"
                        class="accent"
                        elevation="3"
                        height="80"
                        width="300"
                        x-large
                        @click="signup">
                            新規登録
                        </v-btn>              
                    </div>
                    <!--return_btn-->
                    <div class="return_btn mb-10">
                        <v-btn 
                        class="accent"
                        elevation="3"
                        x-large
                        @click="submit">
                            戻る
                        </v-btn>              
                    </div>
                </v-form>
                
            </v-container>
        </v-card>  
    </div>
</template>

<script>
    import firebase from '~/plugins/firebase'
    var db = firebase.firestore();
    
    export default {
        data: () => ({
            displayButtons: true,
            mailadress: "",
            password: "",
            confirmation: "",
            nickname: "",
            sex: "",
            age: "",
            profile: "",     
            num: 0,       
        }),
        created(){  },
        computed:{
            // 入力欄未入力時
            isFormCompleted: function() {
                if (
                    !this.mailadress ||
                    !this.password ||
                    !this.confirmation ||
                    !this.nickname ||
                    !this.sex ||
                    !this.age ||
                    !this.profile ||
                    this.password != this.confirmation
                ) {
                    return false
                }
                return true
            },
        },
        methods:{
            signup:async function(){
                // firebase auth insert処理(mailadress,password)
                firebase.auth().createUserWithEmailAndPassword(this.mailadress,this.password)
                .then(ok => { 
                    // cloud firebase insert処理
                    var self = this
                    self.num = Math.floor( Math.random() * (8 + 1 - 1) ) + 1;
                    const db = firebase.firestore()
                    let dbUsers = db.collection('users')
                    dbUsers
                    .add({
                        mailadress: this.mailadress,
                        password: this.password,
                        nickname: this.nickname,
                        sex: this.sex,
                        age: this.age,
                        profile: this.profile,
                        totalstar: 0,//評価された星の合計
                        ticket: 10,
                        get: 0,//相談に乗ってもらった数
                        give: 0,//相談に乗った数
                        imagepass: "images/"+self.num+".png",
                    }).then(function(docRef){
                        location.href = "login";
                    })
                }, 
                
                error => { 
                    console.log("Register error", error); 
                    alert(error);
                    this.$router.push('registration')
                });
            },
            submit:function(){
                this.$router.push('login')
            }
        }
    }
</script>

<style>
    .main_div{
        width: 75%; 
        margin: auto;
    }
    .signup_card{
        margin-top: 30px;
        margin-bottom: 40px;
        width: 85%;
    }
    .signup_btn{
        text-align: center;
        letter-spacing: 0.5px;
    }
    .return_btn{
        text-align: center;
        letter-spacing: 0.5px;
    }
    .v-btn:not(.v-btn--round).v-size--x-large {
        min-width: 180px;
    }
    .detail_card{
        margin: 0%;
    }
    .image_tile{
        margin-left: 20px;
        border-radius: 10px;
    }

</style>
  