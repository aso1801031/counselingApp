<template>
    <div>
        <v-row class="counseling_area ma-0">
            <v-col cols="9" class="video_area">
                <div><vi/></div>
            </v-col>
            <v-col cols="3" class="chat_area">
                <div class="chat_area_card"><tx/></div>
            </v-col>
    
        </v-row>
        <!--<v-row><tx/></v-row>-->
    </div>
    
  </template>
  
<script>
  import vi from '~/components/Video.vue'
  import tx from '~/components/Chat.vue'
  export default {
      
    components: {
      vi,
      tx,
    },
    data(){
        return {
        }
    },
    created(){
        console.log("sotreId : ",this.$store.state.id)
    },

  }
</script>
<style>
    .video_area{
        text-align: center;
        padding: 0%;
    }
    .chat_area{
    }
    .chat_area_card{
        height: 100%;
    }
    .counseling_area{
        margin: auto;
    }

</style>