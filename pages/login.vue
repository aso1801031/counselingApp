<template>
    <div class="container">
        <v-card class="mx-auto" max-width="900" align="center">
            <v-card-text>
                <!--メールアドレス-->
                <v-row justify="center" align="center" class="mt-5">
                    <v-col cols="3">
                        <h3 class="quickSand" style="text-align:center;">メールアドレス</h3>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field  label="E-mail"  v-model="email">
                        </v-text-field>
                    </v-col>
                </v-row>

                <!--パスワード-->
                <v-row justify="center" align="center" >
                    <v-col cols="3">
                        <h3 class="quickSand" style="text-align:center;">パスワード</h3>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field  label="password" type="password"  v-model="password">
                        </v-text-field>
                    </v-col>
                </v-row>

                <!--ログインボタン-->
                <v-row justify="center" class="mt-6">
                    <v-col cols="4" align="center">
                        <v-btn block height="60" x-large class="accent" @click="submit"><h3>ログイン</h3></v-btn>
                    </v-col>
                </v-row>

                <!--新規登録ボタン-->
                <v-row justify="center" class="mt-4">
                    <v-col cols="4" align="center">
                        <a block height="60" large @click="toregist" class="accent red--text" nuxt><h4>初めての方はこちらから</h4></a>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
    layout:"default2",
    data: () => ({
        email: "",
        password: "",
    }),
    computed:{
    },
    methods: {
        submit(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
            }).then(() => {
                firebase.firestore().collection('users').get().then(snapshot => {
                        snapshot.forEach(doc => {
                        if(doc.data().mailadress === this.email){
                            console.log(1,doc.id, " => ", doc.data());
                            this.$store.commit("changId", doc.id);
                            console.log(2);    
                            this.$router.push("/home");
                        }
                    })
                })
            }).catch((error) => {
                this.error_message = error.message
                console.log(error.message)
                alert(error.message);
            })

        },
        toregist(){
            window.location.href="/registration";
        }

    }

}

</script>

<style>
</style>