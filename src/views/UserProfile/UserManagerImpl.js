import React from "react";
import UserModel from "./UserModel";
import firebase from "../firebase";
import swal from "@sweetalert/with-react";
import { genders } from "views/Properties";

export default class UserManagerImpl extends UserModel {
    constructor(props) {
        super(props);
        this._updateAction = this._updateAction.bind(this);
        this.handleGenderOptions = this.handleGenderOptions.bind(this);
        this.handleRentOptions = this.handleRentOptions.bind(this);
    }

    handleGenderOptions(changeEvent) {
        this.setState({ gender: changeEvent.target.value });
    }

    handleRentOptions(e) {
        this.setState({ rentOption: e.target.value });
    }

    _updateAction(e) {
        e.preventDefault();
        let user = this.state.user;

        swal({
            title: "Please check the details",
            content: (
                <table style={{ fontSize: 12 }}>
                    <tbody>
                        <tr>
                            <td className="modelTitle">Email Address :</td>
                            <td className="modelDesc">{user.emailAddress}</td>
                        </tr>
                        <tr>
                            <td className="modelTitle">Name :</td>
                            <td className="modelDesc">{this.state.name}</td>
                        </tr>
                        <tr>
                            <td className="modelTitle">Date of Birth :</td>
                            <td className="modelDesc">
                                {this.state.dateOfBirth !== "-"
                                    ? this.convertDisplayDate(this.state.dateOfBirth)
                                    : ""}
                            </td>
                        </tr>
                        <tr>
                            <td className="modelTitle">Gender :</td>
                            <td className="modelDesc">{genders[this.state.gender]}</td>
                        </tr>
                        <tr>
                            <td className="modelTitle">Phone Number :</td>
                            <td className="modelDesc">{this.state.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            ),
            icon: "warning",
            buttons: ["Cancel", "Update"]
        }).then((Confirm) => {
            if (Confirm) {
                this.setState({ loading: true });
                firebase
                    .firestore()
                    .collection("users/")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        name: this.state.name,
                        dateOfBirth: new Date(this.state.dateOfBirth),
                        gender: this.state.gender,
                        phoneNumber: this.state.phoneNumber
                    })
                    .then(() => {
                        if (this.state.imageUri != null) {
                            var base64EncodedImageString = this.state.imageUri,
                                metadata = { contentType: "image/jpeg" },
                                imageBuffer = new Buffer(base64EncodedImageString, "base64");
                            return firebase
                                .storage()
                                .ref(`users/${firebase.auth().currentUser.uid}`)
                                .put(imageBuffer, metadata);
                        }
                    })
                    .then(() => {
                        this.setState({ loading: false });
                        swal("Poof! Profile has been updated!", {
                            icon: "success"
                        }).then(() => {
                            if (this.state.rentOption !== this.state.oldOption) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        this.setState({ loading: false });
                        console.log(error);
                        swal("Something wrong with the network!", {
                            icon: "error"
                        });
                    });
            }
        });
    }
}
