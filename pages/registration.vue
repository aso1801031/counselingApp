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
                                type="email"
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
                            v-model="name"
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
                                    value="men"
                                ></v-radio>
                                <v-radio
                                    label="女"
                                    value="wmen"
                                ></v-radio><v-radio
                                    label="その他"
                                    value="other"
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
            name: "",
            sex: "",
            age: "",
            profile: "",


            
        }),
        created(){  },
        computed:{
            // 入力欄未入力時
            isFormCompleted: function() {
                if (
                    !this.mailadress ||
                    !this.password ||
                    !this.confirmation ||
                    !this.name ||
                    !this.sex ||
                    !this.age ||
                    !this.profile ||
                    this.password != this.confirmation
                ) {
                    console.log("未入力のはず")
                    return false
                }
                console.log("入力済のはず")
                return true
            },
        },
        methods:{
            signup:async function(){

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
  