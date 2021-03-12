<template>
    <v-container fluid fill-height class="home">

        <!--<v-card class="mx-auto" max-width="900" align="center">
            <v-card-text>
                <v-btn class="mx-2" :loading="loading5" :disabled="loading5" fab dark x-large color="purple" @click="loader = 'loading5'">
                    <v-icon dark>
                        mdi-android
                    </v-icon>
                </v-btn>
                
                <p class="display-1 text--primary">
                    相談室作成
                </p>

                <h5 class="text--primary" align="left"> タイトル</h5>
                <v-col cols="12" sm="7">
                    <v-text-field v-model="title" counter="25" label="タイトル"></v-text-field>
                </v-col>

                <h5 class="text--primary" align="left">カテゴリー</h5>
                
            </v-card-text>
            
            <v-card-actions>
                <v-btn class="mx-auto" align="center" outlined depressed elevation="2" color="success" @click="addRoom()">
                    作成
                </v-btn>
            </v-card-actions>
        </v-card>-->

    </v-container>
</template>

<script>
    export default {
        layout:"default1",
    }
    
</script>
    
<style>
.home {
  background: url("../static/images/1990310_m.jpg");
  background-size: cover;
  background-position: center top 38%;
  width: 100%;
  height: 100%;
}
</style>