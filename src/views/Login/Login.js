import React from "react";

import Loader from "react-loader-spinner";
import i18n from "../../i18n";
import Button2 from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import Logos from "../../assets/img/logo.png";
import "./Login.css";
import Background from "../../assets/img/background.jpg";
import LoginManagerImpl from './LoginManagerImpl';

export default class Login extends LoginManagerImpl {

    render() {
        return (
            <Grid container component="main" style={{ height: "100%" }}>
                <CssBaseline />
                <div className="darkoverlay">
                    <div className="background">
                        <img src={Background} alt="Logo" style={{ objectFit: "fill" }} />
                    </div>
                </div>
                <Card className="form" style={{ height: this.state.height * 0.9 }}>
                    <CardBody style={{ padding: "50px" }}>
                        <img
                            style={{
                                display: "block",
                                margin: "0 auto",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}
                            height="150"
                            width="280"
                            src={Logos}
                            alt={"logo"}
                        />
                        <h3
                            style={{
                                fontFamily: "Franklin Gothic",
                                fontWeight: "bold",
                                marginTop: "0px",
                                textAlign: "center"
                            }}
                        >
                            {i18n.t("welcome.title")}
                        </h3>
                        <TextField
                            style={{ marginTop: "40px" }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("welcome.emailAddress")}
                            autoFocus
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        {this.state.emailerrorMessage && (
                            <div>
                                <p style={{ color: "red", fontSize: 15 }}>{this.state.emailerrorMessage}</p>
                            </div>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label={i18n.t("welcome.password")}
                            value={this.state.password}
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                        />
                        {this.state.passworderrorMessage && (
                            <div>
                                <p style={{ color: "red", fontSize: 15 }}>{this.state.passworderrorMessage}</p>
                            </div>
                        )}
                        <div style={{ paddingLeft: "100px", paddingRight: "100px", textAlign: "center" }}>
                            {!this.state.loading && (
                                <Button2
                                    style={{ marginTop: "15px", fontSize: "20px" }}
                                    variant="outlined"
                                    color="secondary"
                                    size="medium"
                                    onClick={this.handleSubmit}
                                    fullWidth
                                >
                                    {i18n.t("welcome.login")}
                                </Button2>
                            )}
                            <div style={{ paddingTop: "15px" }}>
                                <Loader
                                    visible={this.state.loading}
                                    type="ThreeDots"
                                    color="#0099ff"
                                    height={50}
                                    width={100}
                                />
                            </div>
                        </div>
                        <Box mt={4}>
                            <div variant="body2" color="textSecondary" align="center">
                                {i18n.t("welcome.create") + ` `}
                                <a href="/registerUser">{i18n.t("welcome.registerhere")}</a>
                            </div>
                        </Box>
                    </CardBody>
                </Card>
            </Grid>
        );
    }
}
