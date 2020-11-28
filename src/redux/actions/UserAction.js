import firebase from "views/firebase";
import { actionType } from "../ActionType";

let unsubscribe;

export const loadUser = () => {
    if (unsubscribe) {
        unsubscribe();
    }

    return (dispatch) => {
        dispatch({ type: actionType.LOAD_USER_START });
        unsubscribe = firebase
            .firestore()
            .collection("users/")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(
                async (doc) => {
                    let user = doc.data();
                    user.id = doc.id;
                    user.dateOfBirth = new Date(doc.data().dateOfBirth.seconds * 1000).customFormat("#YYYY#-#MM#-#DD#");
                    user.signedUrl = await firebase
                        .storage()
                        .ref("users/" + firebase.auth().currentUser.uid)
                        .getDownloadURL()
                        .catch((error) => console.log(error));
                    if (user.signedUrl) {
                        user.signedUrl = user.signedUrl.concat("&").concat(new Date().getTime());
                    }
                    dispatch({ type: actionType.LOAD_USER_SUCCESS, payload: user });
                },
                (error) => dispatch({ type: actionType.LOAD_USER_FAILURE, payload: error })
            );
    };
};
