import React, { Component, lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import firebase from "./views/firebase";
import RegisterUser from "./views/RegisterUser/RegisterUser";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import swal from "@sweetalert/with-react";
import Loader from "react-loader-spinner";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";
import "views/CustomFormat";

const PRODUCTION_MODE = Boolean(true);
if (PRODUCTION_MODE) {
    console.log = console.warn = console.error = () => {};
}

const Login = lazy(() => import("./views/Login/Login.js"));
const Admin = lazy(() => import("layouts/Admin.js"));
const excludedPath = ["/", "/registerUser"];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            showScreen: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.reload();
                console.log(user.emailVerified);
                if (!user.emailVerified) {
                    swal({
                        content: (
                            <span>
                                <p>{i18n.t("verify.email")}</p>
                                <a href="/" onClick={()=>{user.sendEmailVerification()}}>
                                    {i18n.t("verify.resentEmail")}
                                </a>
                            </span>
                        ),
                        icon: "error"
                    });
                    firebase.auth().signOut();
                } else {
                    this.setState({ login: true, showScreen: true });
                }
            } else {
                if (!excludedPath.includes(window.location.pathname)) {
                    window.location.pathname = "";
                }
                this.setState({ login: false, showScreen: true });
            }
        });
    }

    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <Suspense
                        fallback={
                            <div>
                                <div
                                    style={{
                                        position: "fixed",
                                        top: "65%",
                                        left: "50%",
                                        width: "30em",
                                        height: "25em",
                                        marginTop: "-13em",
                                        marginLeft: "-15em",
                                        textAlign: "center"
                                    }}
                                >
                                    <Loader visible={true} type="TailSpin" color="#0099ff" height={100} width={100} />
                                    <br />
                                    {i18n.t("loading.message")}
                                </div>
                            </div>
                        }
                    >
                        {this.state.showScreen && (
                            <React.Fragment>
                                {this.state.login ? (
                                    <React.Fragment>
                                        <Route path="/admin" component={Admin} />
                                        <Redirect from="/" to="/admin/dashboard" />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Switch>
                                            <Route exact={true} path={"/"} component={Login} />
                                            <Route path={"/registerUser"} component={RegisterUser} />
                                        </Switch>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                    </Suspense>
                </Provider>
            </I18nextProvider>
        );
    }
}

export default App;
