<template>
    <div class="video_main">
        <p class="time mt-10 mb-10">{{ formatTime }}</p>
        <v-card class="video_card">
            <v-row>
                <v-col>
                    <div class="video_el bg-secondary">
                        <video id="my-video" autoplay playsinline></video> 
                    </div>
                </v-col>
                <v-col>
                    <div class="video_el bg-secondary">
                        <video id="their-video" autoplay playsinline></video>
                    </div>
                </v-col>    
            </v-row>
            <v-row class="mt-0">
                <v-col class="pt-0">
                    {{this.myname}}    
                </v-col>
                <v-col class="pt-0">
                    {{this.othername}}      
                </v-col>
            </v-row>
            <div class="mt-15">
                <v-btn class="ma-10" color="dark" fab dark v-if="!muteFlg" v-on:click="mute()">                
                    <v-icon large>mdi-microphone</v-icon>
                </v-btn>
                <v-btn class="ma-10" color="dark" fab dark v-if="muteFlg"  v-on:click="unmute()">                
                    <v-icon large>mdi-microphone-off</v-icon>
                </v-btn>
                <v-btn class="ma-10" color="dark" fab dark v-if="soundFlg" v-on:click="nosound()">                
                    <v-icon large>mdi-headphones</v-icon>
                </v-btn>
                <v-btn class="ma-10" color="dark" fab dark v-if="!soundFlg" v-on:click="sound()">                
                    <v-icon large>mdi-headphones-off</v-icon>
                </v-btn>
                <v-btn class="ma-10" color="dark" fab dark　v-on:click="complete()">                
                    <v-icon large>mdi-exit-to-app</v-icon>
                </v-btn>
            </div>
        </v-card>
    </div>        
</template>
  
<script>
    import Peer from 'skyway-js';
    import firebase from '~/plugins/firebase';
    require('array-foreach-async');

    export default {   
      data () {
        return {
          APIKey: 'c30ada52-34c6-4f36-a752-63e28d908689',
          localStream: null,
          peerId: '',
          calltoid: '',
          roomId: this.$route.params.id,
          myname: null,
          myid: this.$store.state.id,//ストアid
          othername: null,
          muteFlg: true,
          soundFlg: true,
          min: 10,
          sec: 0,

        }
      },
    
      methods: {    
        connectLocalCamera: async function(){
          const constraints = {
            audio: true,
            video: false,
          };
    
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          document.getElementById('my-video').srcObject = stream;
          this.localStream = stream;
          this.localStream.getAudioTracks().forEach((track) => (track.enabled = false));

        },
    
        makeCall: function () {
          console.log('makeCall');
          const call = this.peer.call(this.calltoid, this.localStream);
          this.connect(call);
        },
    
        connect: function (call) {
          call.on('stream', stream => {
            const el = document.getElementById('their-video');
            el.srcObject = stream;
            el.play();
          });
        },
        //ミュート処理
        mute(){
            this.muteFlg=true;
            this.localStream.getAudioTracks().forEach((track) => (track.enabled = false));

        },
        //ミュート解除
        unmute(){
            this.muteFlg=false;
            this.localStream.getAudioTracks().forEach((track) => (track.enabled = true));
        },
        //相手をミュート
        nosound(){
            this.soundFlg=false;
        },
        //相手のミュート解除
        sound(){
            this.soundFlg=true;
        },
        //カウントダウン機能
        count() {
            if (this.sec <= 0 && this.min >= 1) {
                this.min --;
                this.sec = 59;
            } else if(this.sec <= 0 && this.min <= 0) {
                this.complete();
            } else {
                this.sec --;
            }
        },
        //タイマースタート処理
        start() {
        let self = this;
        this.timerObj = setInterval(function() {self.count()}, 1000)
        },
        //カウント終了処理
        complete() {
            clearInterval(this.timerObj);
            console.log("カウントダウン終了");
            //レビュ画面遷移、firebase room削除処理、
        }

      },
      async mounted(){
        this.peer = new Peer(this.myid,{ key: this.APIKey,debug: 3,});
    
        await this.peer.on('open', () => {
            this.peerId = this.peer.id
            this.connectLocalCamera();
        });
    
        await this.peer.on('call', call => {
            console.log("コールされました")
            call.answer(this.localStream);
            this.connect(call);
        });
    
      },
      async created(){
        await firebase.firestore().collection("counseling-rooms").doc(this.roomId)
        .onSnapshot(doc =>  {
            //被相談者が自分の場合
            doc.data().consulted_id.get().then(consulted_id => {
                if(consulted_id.id == this.myid){
                    //自分の名前登録
                    this.myname=consulted_id.data().nickname;

                    //相手の名前登録
                    if(doc.data().consultant_id !== null){
                        doc.data().consultant_id.get().then(consultant_id => {
                            this.othername=consultant_id.data().nickname;
                            this.calltoid=consultant_id.id;
                            this.makeCall()
                            this.start()
                        })
                    }

                }
            })
            //相談者が自分の場合
            if(doc.data().consultant_id !== null){
                doc.data().consultant_id.get().then(consultant_id => {
                    if(consultant_id.id == this.myid){
                        //自分の名前登録
                        this.myname=consultant_id.data().nickname;

                        //相手の名前
                        doc.data().consulted_id.get().then(consulted_id => {
                            this.othername=consulted_id.data().nickname;
                            this.calltoid=consulted_id.id;
                            this.makeCall()
                        
                            this.start()

                        }

                    )}
                })
            }


            /*doc.data().consulted_id.get().then(consulted_id => {
                doc.data().consultant_id.get().then(consultant_id => {
                    if(consulted_id.id == this.myid){
                        console.log("id",consulted_id.id)
                        this.myname=consulted_id.data().nickname;
                    }else if(){

                    }

                })
            })*/


        });

      },
        computed: {
            formatTime() {
            let timeStrings = [
                this.min.toString(),
                this.sec.toString()
            ].map(function(str) {
                if (str.length < 2) {
                return "0" + str
                } else {
                return str
                }
            })
            return timeStrings[0] + ":" + timeStrings[1]
            }
        }
    }
</script>

<style>
    .video_main{
    }
    .time{
        font-size: 2.5em;
    }
    .video_card{
        width: 90%;
        margin: auto;
    }
    .video_el{
        width: 200px;
        height: 200px;
        margin: 25px auto;
        margin-bottom: 5px;
        border-radius: 15px;
    }
</style>