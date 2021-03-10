
export const state = () =>({
  // ログイン時idしゅとく
  id:"",
})

export const mutations = {
  
  // ログイン時id取得
  /*changAdmin_flg(state, admin_flg) {
    state.admin_flg = admin_flg
  },
  changBirth(state, birth) {
    state.birth = birth
  },
  changImagepass(state, imagepass) {
    state.imagepass = imagepass
  },
  changLanguage_id(state, language_id) {
    state.language_id = language_id
  },
  changMailadress(state, mailadress) {
    state.mailadress = mailadress
  },
  changName(state, name) {
    state.name = name
  },
  changPassword(state, password) {
    state.password = password
  },
  changProfile(state, profile) {
    state.profile = profile
  },*/
  changId(state, id){
    state.id = id
  },/*
  refresh:function(state,obj){
    state.mailadress = ""
    state.password = ""
    state.name = ""
    state.birth = ""
    state.language_id = ""
    state.profile = ""
    state.imagepass = ""
    console.log("refresh通ったお"); 
  },
  byebye:function(state, obj){
    state.mailadress = ""
    state.password = ""
  },*/
}
