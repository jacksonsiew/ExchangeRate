import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Loader from "react-loader-spinner";
import FadeIn from "react-fade-in";
import { Icon } from "@material-ui/core";
import UserManagerImpl from "./UserManagerImpl";
import { genders } from "views/Properties";
import i18n from "../../i18n";
import * as userActions from "../../redux/actions/UserAction";
import { connect } from "react-redux";

class UserProfile extends UserManagerImpl {
    componentDidMount() {
        this.props.loadUser();
        this.intervalID = setInterval(() => {
            const { isUserCacheLoading, user } = this.props;
            this.setState({ loading: isUserCacheLoading });
            if (!isUserCacheLoading) {
                this.setState({
                    user,
                    name: user.name,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    phoneNumber: user.phoneNumber,
                    picture: user.signedUrl,
                    loading: false
                });
                clearInterval(this.intervalID);
            }
        }, 100);
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                    <Loader
                        visible={this.state.loading}
                        type="TailSpin" //Puff
                        color="#0099ff"
                        height={100}
                        width={100}
                    />
                </div>
                {!this.state.loading && (
                    <FadeIn>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="rose">
                                        <h3>{i18n.t("user.profile.header")}</h3>
                                        <strong>{i18n.t("user.profile.subheader")}</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText={i18n.t("user.profile.emailAddress")}
                                                    id="emailAddress"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                    }}
                                                    value={user ? user.emailAddress : ""}
                                                    style={{color: '#000000'}}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={i18n.t("user.profile.name")}
                                                    id="name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText={i18n.t("user.profile.id")}
                                                    id="icNumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                    }}
                                                    value={user ? user.identityNumber : ""}
                                                    style={{color: '#000000'}}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText={i18n.t("user.profile.dateOfBirth")}
                                                    id="dateOfBirth"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    disabled={true}
                                                    type={"date"}
                                                    value={this.state.dateOfBirth}
                                                    onChange={this.handleChange}
                                                    style={{color: '#000000'}}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <FormControl style={{ width: "100%", marginTop: 28 }}>
                                                    <InputLabel htmlFor="grouped-select">
                                                        {i18n.t("user.profile.gender")}
                                                    </InputLabel>
                                                    <Select
                                                        defaultValue={this.state.gender}
                                                        value={this.state.gender}
                                                        input={
                                                            <Input
                                                                id="grouped-select"
                                                                onChange={this.handleGenderOptions}
                                                            />
                                                        }
                                                    >
                                                        {genders !== null &&
                                                            Object.entries(genders).map((gender) => (
                                                                <MenuItem key={gender[1]} value={gender[0]}>
                                                                    {gender[1]}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText={i18n.t("user.profile.phoneNumber")}
                                                    id="phoneNumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    value={this.state.phoneNumber}
                                                    onChange={this.handleChange}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="rose" onClick={this._updateAction}>
                                            {i18n.t("user.profile.update")}
                                            <Icon style={{ fontSize: 18, marginLeft: 10 }}>save</Icon>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card profile>
                                    <CardAvatar profile>
                                        <img
                                            src={this.state.picture || require("../../assets/img/login.png")}
                                            alt="profilePicture"
                                            style={{ minWidth: 120, minHeight: 120 }}
                                        />
                                        <input
                                            id="inputFile"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={this.fileChangedHandler}
                                        />
                                    </CardAvatar>
                                    <CardBody profile>
                                        <div style={{ alignItem: "center" }}>
                                            <Button
                                                color="white"
                                                onClick={(e) => document.getElementById("inputFile").click()}
                                            >
                                                <strong>{i18n.t("user.profile.upload.picture").toUpperCase()}</strong>
                                            </Button>
                                        </div>
                                        <br />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </FadeIn>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserCacheLoading: state.userReducer.isLoading,
    user: state.userReducer.data
});

const mapDispatchToProps = (dispatch) => ({
    loadUser: () => dispatch(userActions.loadUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
