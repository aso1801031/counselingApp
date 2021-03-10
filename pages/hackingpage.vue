<template>
    <div class="container">
      <div>
          入力値:{{id}} <br/>
          store:{{$store.state.id}}
        <v-text-field label="id" v-model="id"></v-text-field>
        <v-btn v-on:click="submit()">確定</v-btn>
        <v-btn v-on:click="clear()">clear</v-btn>
      </div>
    </div>
</template>
  
<script>
    import { mapMutations } from 'vuex'

    export default {
        data(){
            return {
                id:"",
            }
        },
        created(){

        },
        methods: {
            submit(){
                this.$store.commit("changId", this.id);
            },
            clear(){
                this.$store.commit("changId", null);
            }
        }

  }
</script>
  
  <style>
  </style>
  