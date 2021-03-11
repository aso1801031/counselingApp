<template>
    <v-card class="chat_main">
        <div v-for="data in getMessages" :key="data.msg">
            <div v-if="data.myFlg" class="mymsg">
                <v-card-text>{{data.msg}}</v-card-text>    
            </div>
            <div v-else class="othermsg">                
                <v-card-text>{{data.msg}}</v-card-text>    
            </div>
        </div>
        <v-container>
            <v-card-actions class="chat_action">
                <div class="send_area">
                    <v-textarea
                    filled
                    auto-grow
                    label="メッセージ"
                    rows="3"
                    row-height="30"
                    outlined
                    v-model="message"
                    class="message_box"
                  ></v-textarea>    
                  <div class="send_btn">
                    <v-btn color="indigo" v-on:click="pushMessage" dark>送信</v-btn>
                  </div>
                </div>        
            </v-card-actions>
    
        </v-container>
    </v-card>
</template>

<script>
import firebase from '~/plugins/firebase'
import 'firebase/firestore';
require('array-foreach-async');

export default {
    data(){
        return {
            message:"",
            getMessages: [],
            myid: this.$store.state.id,//ストアid
            otherid:"",
            roomid: this.$route.params.id,

        }
    },
    created(){
        this.getMsg()
    },
    methods:{
        async pushMessage(){
            if(this.message != ""){
                console.log("[TextChat]: pushing message!")
                var messageData = await {
                    message:this.message,
                    senderid:firebase.firestore().collection("users").doc(this.myid),
                    timestamp:firebase.firestore.FieldValue.serverTimestamp()
                }
                console.log("[TextChat]:",messageData)
                await firebase.firestore()
                .collection('counseling-rooms')
                .doc(this.roomid)
                .collection('chat-room')
                .doc()
                .set(messageData)

                this.message="";                    
            }
        },
        async getMsg(){
            this.getMessages=[];
            var ref = await firebase.firestore()
                .collection('counseling-rooms')
                .doc(this.roomid)
                .collection('chat-room')
                .orderBy("timestamp", "asc");

            await ref.onSnapshot( (doc) => {
                doc.docChanges().forEachAsync(async change =>{
                    if (change.type === 'added') {
                        if(change.doc.data().senderid.id == this.myid){
                            this.getMessages.push({myFlg:true,msg:change.doc.data().message})
                        }else{
                            this.getMessages.push({myFlg:false,msg:change.doc.data().message})
                        }

                    }
                })
            }) 


        }

    }
}
</script>

<style>
    .chat_main{
        margin: 0%;
        height: 88vh;
        position:relative;
    }
    .chat_action{
        padding: 0%;
    }
    .send_area{
        width: 90%;
        position:absolute;
        bottom:0;
        text-align: center;
    }
    .send_btn{
        text-align: right;
        margin: 10px;
        margin-top: 0px;
    }
    .mymsg{
        text-align: right;
    }
    .othermsg{
        text-align: left;
    }
    .message_box{
        text-align: center;
    }
</style>