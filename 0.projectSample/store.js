import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // this.$store
// Vue.use(axios); // this.$axios

export const SET_WINNER     = 'SET_WINNER'; // import {SET_WINNER, CLICK_CELL, CHANGE_TURN, RESET_GAME, NO_WINNER} from './store';

export default new Vuex.Store({     // import store from './store';
    state: {
    }, // vue의 data와 비슷
    getters: {
    }, // vue의 computed와 비슷
    mutations: {
    }, // state를 수정할 때 사용. 동기적으로
    actions: {        
    }, // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});