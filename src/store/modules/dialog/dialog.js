
export default {
    namespaced: true,
    state: {
        which: '',
        display1: false,
        display2: false,
        display3: false,
        confirmMessage: '',
        sendDatas:{},
    },
    mutations: {
        SET_WHICH(state, payload) {
            state.which = payload;
        },
        SET_DISPLAY1(state, payload) {
            state.display1 = payload;
        },
        SET_DISPLAY2(state, payload) {
            state.display2 = payload;
        },
        SET_CONFIRM_MESSAGE(state, payload) {
            state.confirmMessage = payload;
        },
        SET_SEND_DATAS(state, payload){
            state.sendDatas = payload;
        },
        SET_DISPLAY3(state, payload) {
            state.display3 = payload;
        },

    },
    actions: {
        changeWhich({ commit }, which) {
            commit('SET_WHICH', which);
        },
        changeDispaly1({ commit }, status) {
            commit('SET_DISPLAY1', status);
        },
        changeDispaly2({ commit }, status) {
            commit('SET_DISPLAY2', status);
        },
        changeDispaly3({ commit }, status) {
            commit('SET_DISPLAY3', status);
        },
        setConfirmMessage({ commit }, message) {
            commit('SET_CONFIRM_MESSAGE', message);
        },
        setSendDatas({commit}, sendDatas){
            commit('SET_SEND_DATAS', sendDatas);
        }
    },
    getters: {

    }
}