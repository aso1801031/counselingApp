<template>
    <div class="container">

            <v-card class="mx-auto" max-width="900" align="center">
                <v-card-text>
                    <p class="display-1 text--primary">
                        相談室作成
                    </p>

                    <v-col cols="12" sm="6">
                        <v-text-field counter="25" label="タイトル"></v-text-field>
                    </v-col>

                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <v-checkbox label="勉強" value="study"></v-checkbox>
                            <v-checkbox label="スポーツ" value="sport"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-checkbox label="趣味" value="hobby"></v-checkbox>
                            <v-checkbox label="仕事" value="job"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-checkbox label="学校" value="school"></v-checkbox>
                            <v-checkbox label="ゲーム" value="game"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-checkbox label="恋愛" value="love"></v-checkbox>
                            <v-checkbox label="その他" value="other"></v-checkbox>
                        </v-col>
                    </v-row>
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
    data () {
      return {
        states: [
          '5', '4', '3', '2','1'
        ]
      }
    }
}

</script>

<style>
</style>