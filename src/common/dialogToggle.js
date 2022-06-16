import { computed } from 'vue';
import { useStore } from 'vuex';
import constant from "@/common/constant.js";

export const dialogToggleAction = () => {
    const store = useStore();

    const display1 = computed(() => store.state.dialog.display1);
    const which = computed(() => store.state.dialog.which);
    const datas = computed(() => store.state.dialog.sendDatas);

    const display2 = computed(() => store.state.dialog.display2);
    const message = computed(() => store.state.dialog.confirmMessage);

    const display3 = computed(() => store.state.dialog.display3);

    //dialog1
    const closeDialog1 = () => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY1, false);
        store.dispatch(constant.store.dialog.CHANGEWHICH, '');
        store.dispatch(constant.store.token.SETSTATUS, {data:true});
    };
    const showDialog1 = (which, sendDatas) => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY1, true);
        if(sendDatas){
            store.dispatch(constant.store.dialog.SETSENDDATAS, sendDatas.value);
        }
        store.dispatch(constant.store.dialog.CHANGEWHICH, which);
    };

    //dialog2
    const closeDialog2 = () => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY2, false);
    };
    const showDialog2 = (message) => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY2, true);
        store.dispatch(constant.store.dialog.SETMESSAGE, message);
    };

    //dialog2
    const closeDialog3 = () => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY3, false);
    };
    const showDialog3 = () => {
        store.dispatch(constant.store.dialog.CHANGDISPLAY3, true);
    };

    return {
        display1,
        which,
        datas,
        closeDialog1,
        showDialog1,
        display2,
        message,
        showDialog2,
        showDialog3,
        closeDialog2,
        closeDialog3,
        display3,
    }
}