import firebase from "views/firebase";
import { constantType } from "../ActionType";

/** OUTSTANDING */
let unsubscribe;
let unsubscribeFreeCredit;
let loaded = false;
let loadedFreeCredit = false;

export const getFreeCredit = () =>{
    if(unsubscribeFreeCredit){
        unsubscribe();
    }

    return (dispatch) => {
        if (!loadedFreeCredit) {
            dispatch({ type: constantType.LOAD_FREE_CREDIT_CONSTANT_START });

            unsubscribe = firebase
                .firestore()
                .collection("users/")
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot(
                    async (doc) => {
                        if(!doc.data().redeemedCredit){
                            await firebase.firestore().collection('users/').doc(firebase.auth().currentUser.uid).update({
                                USD: parseFloat(doc.data().USD) + 100,
                                redeemedCredit: true
                            })
                        }
                        dispatch({
                            type: constantType.LOAD_FREE_CREDIT_CONSTANT_SUCCESS
                        });
                    },
                    (error) =>
                        dispatch({
                            type: constantType.LOAD_FREE_CREDIT_CONSTANT_FAILURE,
                            payload: error
                        })
                );
        } else {
            dispatch({ type: constantType.LOAD_FREE_CREDIT_CONSTANT_END });
        }
    };
}

export const loadConstant = () => {
    if (unsubscribe) {
        unsubscribe();
    }

    return (dispatch) => {
        if (!loaded) {
            dispatch({ type: constantType.LOAD_DASHBOARD_CONSTANT_START });

            unsubscribe = firebase
                .firestore()
                .collection("users/")
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot(
                    async (doc) => {
                        const payload = {
                            AUD: parseFloat(doc.data().AUD).toFixed(6),
                            MYR: parseFloat(doc.data().MYR).toFixed(4),
                            SGD: parseFloat(doc.data().SGD).toFixed(4),
                            USD: parseFloat(doc.data().USD).toFixed(4)
                        };
                        loaded = true;
                        dispatch({
                            type: constantType.LOAD_DASHBOARD_CONSTANT_SUCCESS,
                            payload
                        });
                    },
                    (error) =>
                        dispatch({
                            type: constantType.LOAD_DASHBOARD_CONSTANT_FAILURE,
                            payload: error
                        })
                );
        } else {
            dispatch({ type: constantType.LOAD_DASHBOARD_CONSTANT_END });
        }
    };
};