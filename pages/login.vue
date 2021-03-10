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
                        <v-text-field  label="E-mail"  v-model="email" :rules="emailRules">
                        </v-text-field>
                    </v-col>
                </v-row>

                <!--パスワード-->
                <v-row justify="center" align="center" >
                    <v-col cols="3">
                        <h3 class="quickSand" style="text-align:center;">パスワード</h3>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field  label="password"  v-model="password" :rules="[v => !!v || 'Password is required']" type="password">
                        </v-text-field>
                    </v-col>
                </v-row>

                <!--エラーメッセージ-->
                <v-row justify="center" class="mt-0 error--text">
                    <v-col cols="4" align="center">
                        {{error_message}}
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
                        <a block height="60" large to="/member-registration" class="accent red--text" nuxt><h4>初めての方はこちらから</h4></a>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    
}

</script>

<style>
</style>