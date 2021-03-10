<template>
    <div class="container">

        <v-card class="mx-auto" max-width="600" align="center">
            <v-card-text>
                <p class="display-1 text--primary"><!-- ユーザー名に後で変更 -->
                    ○○さんの対応はどうでしたか？
                </p>

                <v-col cols="6"><!-- 星プルダウン -->
                    <v-select color="yellow" :items="states" menu-props="auto" label="星いくつ？" hide-details prepend-icon="mdi-star" single-line></v-select>
                </v-col>
            </v-card-text>
            
            <v-card-actions>
                <v-btn class="mx-auto" align="center" outlined depressed elevation="2" color="success" @click="reveal = true">
                    完了
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