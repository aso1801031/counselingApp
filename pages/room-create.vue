<template>
    <div class="container">

        <v-card class="mx-auto" max-width="900" align="center">
            <v-card-text>
                <p class="display-1 text--primary">
                    相談室作成
                </p>

                <h5 class="text--primary" align="left"> タイトル</h5>
                <v-col cols="12" sm="7">
                    <v-text-field counter="25" label="タイトル"></v-text-field>
                </v-col>

                <h5 class="text--primary" align="left">カテゴリー</h5>
                <v-radio-group v-model="ex7" column>
                    <v-row>
                        <v-col cols="12" sm="2" md="2"></v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="勉強" value="study"></v-radio>
                            <v-radio label="スポーツ" value="sport"></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="趣味" value="hobby"></v-radio>
                            <v-radio label="仕事" value="job"></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="学校" value="school"></v-radio>
                            <v-radio label="恋愛" value="love"></v-radio>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-radio label="ゲーム" value="game"></v-radio>
                            <v-radio label="その他" value="other"></v-radio>
                        </v-col>
                    </v-row>
                </v-radio-group>
            </v-card-text>
            
            <v-card-actions>
                <v-btn class="mx-auto" align="center" outlined depressed elevation="2" color="success" @click="reveal = true">
                    作成
                </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
export default {
    
}

</script>

<style>
</style>