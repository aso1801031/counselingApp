import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default({store}) => {
  createPersistedState({})(store)
}
