import React from "react";
import Loader from "react-loader-spinner";
import i18n from "../../i18n";
import Button from "components/CustomButtons/Button.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "components/Card/CardHeader.js";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import RegisterUserManagerImpl from "./RegisterUserManagerImpl";
import Background from "../../assets/img/background.jpg";
import { genders } from "views/Properties";
import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';

export default class RegisterUser extends RegisterUserManagerImpl {
    render() {
        const testedResult = zxcvbn(this.state.password);
        return (
            <Grid container component="main" style={{ height: this.state.height * 0.9 }}>
                <CssBaseline />
                <div className="darkoverlay">
                    <div className="background">
                        <img src={Background} alt="Logo" style={{ objectFit: "fill" }} />
                    </div>
                </div>
                <Card className="form" style={{ marginTop: 50 }}>
                    <CardHeader color="rose">
                        <h4
                            style={{
                                fontSize: "28px",
                                textAlign: "center"
                            }}
                        >
                            {i18n.t("register.title")}
                        </h4>
                    </CardHeader>
                    <CardBody style={{ padding: "0 50px" }}>
                        <TextField
                            id="emailAddress"
                            value={this.state.emailAddress}
                            style={{
                                marginTop: "20px"
                            }}
                            onBlur={() => {
                                this.validateEmailAddress();
                            }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("register.emailAddress")}
                            type="email"
                            onChange={this.handleChange}
                        />
                        {this.state.emailAddressErrorMessage && (
                            <span style={{ color: "red", fontSize: 15, paddingTop: 0 }}>
                                {this.state.emailAddressErrorMessage}
                            </span>
                        )}
                        <TextField
                            id="password"
                            value={this.state.password}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("register.password")}
                            type="password"
                            onChange={this.handlePasswordChange}
                            onBlur={this.handleBlurChange}
                        />
                        <div className="password-strength-meter">
                            <progress
                                className={`password-strength-meter-progress strength-${this.createPasswordLabel(
                                    testedResult
                                )}`}
                                value={testedResult.score}
                                max="4"
                            />
                            <label
                                id="message2"
                                className="password-strength-meter-label"
                                style={{ color: "#000000", fontSize: 10 }}
                            >
                                {this.state.password &&
                                    (this.state.password_message && this.state.password.length < 6 ? (
                                        <label style={{ fontSize: 15, color: "red" }}>
                                            {i18n.t("register.passwordLength")}
                                        </label>
                                    ) : (
                                        <span style={{ fontSize: 15 }}>
                                            <strong style={{ color: "#000000" }}>Password strength:</strong>{" "}
                                            {this.createPasswordLabel(testedResult)}
                                        </span>
                                    ))}
                            </label>
                        </div>
                        <TextField
                            id="name"
                            value={this.state.name}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("register.name")}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="identityNumber"
                            value={this.state.identityNumber}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("register.id")}
                            onChange={this.handleIcNumber}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="dateOfBirth"
                                    disabled={true}
                                    value={this.state.dateOfBirth}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label={i18n.t("register.dateOfBirth")}
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    variant="outlined"
                                    style={{
                                        width: "100%",
                                        marginTop: 16
                                    }}
                                >
                                    <InputLabel>{i18n.t("register.gender")}</InputLabel>
                                    <Select
                                        defaultValue={this.state.gender}
                                        value={this.state.gender}
                                        onChange={this.handleGenderOptions}
                                    >
                                        {genders !== null &&
                                            Object.entries(genders).map((gender) => (
                                                <MenuItem key={gender[1]} value={gender[0]}>
                                                    {gender[1]}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <TextField
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("register.phoneNumber")}
                            onChange={this.handleChange}
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button
                                    style={{ marginTop: "15px", fontSize: "18px", fontweight: "bold", color: "black" }}
                                    variant="contained"
                                    color="white"
                                    size="large"
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: "/"
                                        });
                                    }}
                                    fullWidth
                                >
                                    {i18n.t('common.back')}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                {!this.state.loading && (
                                    <Button
                                        style={{ marginTop: "15px", fontSize: "18px", fontweight: "bold" }}
                                        variant="contained"
                                        color="rose"
                                        size="large"
                                        onClick={this.handleSubmit}
                                        fullWidth
                                    >
                                        {i18n.t("register.btn")}
                                    </Button>
                                )}
                                <div style={{ paddingTop: "15px", paddingLeft: "50px" }}>
                                    <Loader
                                        visible={this.state.loading}
                                        type="ThreeDots"
                                        color="#0099ff"
                                        height={50}
                                        width={100}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </Grid>
        );
    }
}
