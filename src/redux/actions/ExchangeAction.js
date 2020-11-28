import firebase from "views/firebase";
import { actionType } from "../ActionType";

let unsubscribeHistory;

export const loadExchangeHistory = () => {
    if (unsubscribeHistory) {
        unsubscribeHistory();
    }
    return (dispatch) => {
        dispatch({ type: actionType.LOAD_EXCHANGE_HISTORY_START });
        unsubscribeHistory = firebase
            .firestore()
            .collection("users/")
            .doc(firebase.auth().currentUser.uid)
            .collection("exchangeHistory/")
            .orderBy("createdDatetime", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    let index = 1,
                        historyList = [];
                    querySnapshot.forEach((doc) => {
                        historyList.push({
                            index: index++,
                            transactionDate: new Date(doc.data().transactionDate.seconds * 1000).customFormat(
                                "#DD#/#MM#/#YYYY#"
                            ),
                            amount: doc.data().amount,
                            exchangeFrom: doc.data().exchangeFrom,
                            exchangeTo: doc.data().exchangeTo,
                            currencyRate: doc.data().currencyRate,
                            receivedAmount: parseFloat(doc.data().receivedAmount).toFixed(5),
                            balance: doc.data().balance
                        });
                    });
                    dispatch({ type: actionType.LOAD_EXCHANGE_HISTORY_SUCCESS, payload: historyList });
                },
                (error) => dispatch({ type: actionType.LOAD_EXCHANGE_HISTORY_FAILURE, payload: error })
            );
    };
};

export const loadRates = () => {
    return (dispatch) => {
        dispatch({ type: actionType.LOAD_RATES_START });
        let url = "https://openexchangerates.org/api/latest.json?app_id="+ process.env.REACT_APP_OPEN_EXCHANGE_API_KEY;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("Error", response.status.toString());
                    throw Error("Error " + response.status);
                }
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson)
                dispatch({ type: actionType.LOAD_RATES_SUCCESS, payload: responseJson?.rates ?? null });
            })
            .catch((error) => {
                console.error(error);
                dispatch({ type: actionType.LOAD_RATES_FAILURE, payload: error });
            });
    };
};
