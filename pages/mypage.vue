<template>
    <div class="container">

            <v-card class="mx-auto" max-width="900" align="center">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <h5>評価</h5>
                            <h4>
                                <v-icon color="yellow darken-2">mdi-star</v-icon>
                                4.5
                            </h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>相談に乗った数</h5>
                            <h4>10件</h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>相談をした数</h5>
                            <h4>7件</h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>残チケット</h5>
                            <h4>3枚</h4>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card><br>

            <v-card class="mx-auto" max-width="900" align="center">
                <v-card-text>
                    <v-row>
                        <v-col cols="4" align-items-center>
                            <h4>写真</h4>
                        </v-col>

                        <v-col cols="8">
                            <v-col cols="8">
                                <v-text-field counter="10" label="ニックネーム"></v-text-field>
                            </v-col>
                            <v-col cols="8">
                                <v-textarea outlined name="input-7-4" label="自己紹介" value=""></v-textarea>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-card-text>
            
                <v-card-actions>
                    <v-btn class="mx-auto" outlined depressed elevation="2" color="success" @click="reveal = true">
                        編集
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