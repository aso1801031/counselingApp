<template>
    <div class="container">

            <v-card class="mx-auto" max-width="900" align="center">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <h5>評価</h5>
                            <h4>
                                <v-icon color="yellow darken-2">mdi-star</v-icon>
                                {{ totalstar }}
                            </h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>相談に乗った数</h5>
                            <h4>{{ give }}件</h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>相談をした数</h5>
                            <h4>{{ get }}件</h4>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <h5>残チケット</h5>
                            <h4>{{ ticket }}件</h4>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card><br>

            <v-card class="mx-auto" max-width="900" align="center">
                <v-card-text>
                    <v-row>
                        <v-col cols="4" class="pic">
                            <img src="../static/images/1.png" width="200px" height="200px">
                        </v-col>

                        <v-col cols="8">
                            <v-col cols="10">
                                <v-text-field counter="10" v-model="nickname" label="ニックネーム" :value="nickname"></v-text-field>
                            </v-col>
                            <v-col cols="10">
                                <v-textarea outlined name="input-7-4" v-model="profile" label="自己紹介" :value="profile"></v-textarea>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-card-text>
            
                <v-card-actions>
                    <v-btn class="mx-auto" outlined depressed elevation="2" color="success" @click="reveal">
                        編集
                    </v-btn>
                </v-card-actions>
            </v-card>

    </div>
</template>

<script>
import firebase from '~/plugins/firebase'
    export default {
        data: () => ({
            nickname: "",
            profile: "",
            id: "",
            give: "",
            get: "",
            ticket: "",
            totalstar: "",

        }),

        created(){
            var self = this

            const db = firebase.firestore()
            this.id = this.$store.state.id
            if(this.id){
                var docUsers = db.collection('users').doc(this.id);
                docUsers
                    .get()
                    .then(function(doc) {
                        self.nickname = doc.data().nickname
                        self.profile = doc.data().profile
                        self.give = doc.data().give
                        self.get = doc.data().get
                        self.ticket = doc.data().ticket
                        self.totalstar = doc.data().totalstar / doc.data().give
                })
            }
        },
        methods: {
            reveal(){   
                const db = firebase.firestore()
                var docUsers = db.collection('users').doc("3Gm2IH1lTcfiQ0Rq3y1T");
                return docUsers.update({
                    capital: true,
                    nickname: this.nickname,
                    profile: this.profile,
                }).then(() => {
                    alert("更新が完了しました。")
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            }

        },
    }
</script>

<style>
.pic {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>