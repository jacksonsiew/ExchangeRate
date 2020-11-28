import { auth } from "firebase";
import firebaseApp from "../firebase";
import swal from "@sweetalert/with-react";
import i18n from "../../i18n";
import LoginModel from "./LoginModel";

export default class LoginManagerImpl extends LoginModel {
    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        if (email !== "" && password !== "") {
            this.setState({ loading: true, emailerrorMessage: null, passworderrorMessage: null });
            firebaseApp
                .auth()
                .setPersistence(auth.Auth.Persistence.SESSION)
                .then(() => {
                    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
                })
                .then(() => {
                    this.setState({ loading: false });
                })
                .catch((error) => {
                    if (error.message === i18n.t("welcome.default.error")) {
                        this.setState({ errorMessage: i18n.t("welcome.error") });
                        swal(this.state.errorMessage);
                    } else {
                        this.setState({ errorMessage: error.message });
                        swal(this.state.errorMessage);
                    }
                    this.setState({ loading: false });
                });
        } else if (email === "") {
            this.setState({ emailerrorMessage: i18n.t("welcome.error.field.emailAddress"), loading: false });
        } else if (password === "") {
            this.setState({ passworderrorMessage: i18n.t("welcome.error.field.password"), loading: false });
        }
    }
}
