import React from "react";
import * as firebase2 from "firebase/app";
import swal from "@sweetalert/with-react";
import firebase from "../firebase";
import RegisterUserModel from "./RegisterUserModel";
import { genders } from "views/Properties";
import moment from "moment";
import i18n from "../../i18n";
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL
};
const secondaryApp = firebase2.initializeApp(config, "Secondary");

export default class RegisterUserManagerImpl extends RegisterUserModel {
    constructor(props) {
        super(props);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.handleGenderOptions = this.handleGenderOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlurChange = this.handleBlurChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIcNumber = this.handleIcNumber.bind(this);
        this.createPasswordLabel = this.createPasswordLabel.bind(this);
    }

    handleGenderOptions(changeEvent) {
        this.setState({ gender: changeEvent.target.value });
    }

    validateEmailAddress() {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            emailAddressErrorMessage:
                this.state.emailAddress && !re.test(this.state.emailAddress)
                    ? i18n.t("register.validation.email.pattern")
                    : ""
        });
        return re.test(this.state.emailAddress);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (
            this.state.emailAddress &&
            this.state.password &&
            this.state.name &&
            this.state.identityNumber &&
            this.state.dateOfBirth &&
            this.state.gender &&
            this.state.phoneNumber &&
            this.state.password.length >= 6 &&
            this.validateEmailAddress()
        ) {
            swal({
                title: i18n.t("dialog.check.detail"),
                content: (
                    <table style={{ fontSize: 10 }}>
                        <tbody>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.emailAddress")}</td>
                                <td className="modelDesc">{this.state.emailAddress}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.name")}</td>
                                <td className="modelDesc">{this.state.name}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.id")}</td>
                                <td className="modelDesc">{this.state.identityNumber}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.dateOfBirth")}</td>
                                <td className="modelDesc">{this.state.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.gender")}</td>
                                <td className="modelDesc">{genders[this.state.gender]}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("register.phoneNumber")}</td>
                                <td className="modelDesc">{this.state.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                ),
                icon: "warning",
                buttons: [i18n.t("common.cancel"), i18n.t("register.button")]
            }).then((Confirm) => {
                if (Confirm) {
                    this.setState({ loading: true });
                    secondaryApp
                        .auth()
                        .createUserWithEmailAndPassword(this.state.emailAddress, this.state.password)
                        .then((response) => {
                            response.user.sendEmailVerification();
                            secondaryApp.auth().signOut();
                            firebase
                                .firestore()
                                .collection("users/")
                                .doc(response.user.uid)
                                .set({
                                    emailAddress: this.state.emailAddress,
                                    name: this.state.name,
                                    identityNumber: this.state.identityNumber,
                                    dateOfBirth: new Date(this.state.dateOfBirth),
                                    gender: this.state.gender,
                                    phoneNumber: this.state.phoneNumber,
                                    createdDatetime: new Date(),
                                    updatedDatetime: null,
                                    AUD: parseInt(0),
                                    MYR: parseInt(0),
                                    SGD: parseInt(0),
                                    USD: parseInt(0),
                                });
                        })
                        .then(() => {
                            this.setState({
                                loading: false,
                                emailAddress: "",
                                password: "",
                                name: "",
                                identityNumber: "",
                                dateOfBirth: "",
                                gender: "",
                                phoneNumber: "",
                                redeemedCredit: false,
                            });
                            swal("Poof! Verification had sent ! Please check your email inbox.", {
                                icon: "success"
                            }).then((confirm) => {
                                if (confirm) {
                                    window.location.pathname = "";
                                }
                            });
                        })
                        .catch((error) => {
                            this.setState({ loading: false });
                            swal(error.message, {
                                icon: "error"
                            });
                        });
                }
            });
        } else {
            swal(i18n.t("register.validation.field"), {
                icon: "warning"
            });
        }
    }

    handlePasswordChange(e) {
        this.setState({ password_message: false, [e.target.id]: e.target.value });
    }

    handleBlurChange() {
        this.setState({ password_message: true });
    }

    handleIcNumber(e) {
        if (e.target.value.length >= 6) {
            var subyear = e.target.value.substring(0, 2);
            var month = e.target.value.substring(2, 4);
            var day = e.target.value.substring(4, 6);
            var year = moment(subyear + "-" + month + "-" + day, "YY-MM-DD").format("YYYY");
            this.setState({ dateOfBirth: year !== "Invalid date" ? year + "-" + month + "-" + day : "" });
        } else {
            this.setState({ dateOfBirth: "" });
        }
        this.setState({ [e.target.id]: e.target.value });
    }

    createPasswordLabel(result) {
        switch (result.score) {
            case 0:
                return "Weak";
            case 1:
                return "Weak";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Strong";
            default:
                return "Weak";
        }
    }
}
