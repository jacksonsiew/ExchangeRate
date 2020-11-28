import React from "react";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import { Slideshow } from "./SlideShow";
import { successColor, whiteColor, grayColor, hexToRgb } from "assets/jss/material-dashboard-react.js";
import Loader from "react-loader-spinner";
import i18n from "../../i18n";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core/styles";
import * as dashboardAction from "../../redux/actions/DashboardAction";
import * as exchangeAction from "../../redux/actions/ExchangeAction";

const StyledTooltip = withStyles({
    tooltip: {
        backgroundColor: "black"
    }
})(Tooltip);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currencies: null,
            ratesList: null
        };
    }

    componentDidMount() {
        this.props.loadConstant();
        this.props.getFreeCredit();
        this.props.loadRates();
        this.intervalID = setInterval(() => {
            const { isCacheLoading, currencies, isFreeCreditLoading, isRatesLoading, ratesList } = this.props;
            if (!isCacheLoading && !isFreeCreditLoading && !isRatesLoading) {
                this.setState({ currencies, loading: false, ratesList });
                clearInterval(this.intervalID);
            }
        }, 100);
    }

    render() {
        let { currencies } = this.state;

        const dashboardStyle = {
            successText: {
                color: successColor[0]
            },
            upArrowCardCategory: {
                width: "16px",
                height: "16px"
            },
            stats: {
                color: grayColor[0],
                display: "inline-flex",
                fontSize: "12px",
                lineHeight: "22px",
                "& svg": {
                    top: "4px",
                    width: "16px",
                    height: "16px",
                    position: "relative",
                    marginRight: "3px",
                    marginLeft: "3px"
                },
                "& .fab,& .fas,& .far,& .fal,& .material-icons": {
                    top: "4px",
                    fontSize: "16px",
                    position: "relative",
                    marginRight: "3px",
                    marginLeft: "3px"
                }
            },
            cardCategory: {
                color: grayColor[0],
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                paddingTop: "10px",
                marginBottom: "0"
            },
            cardCategoryWhite: {
                color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                marginBottom: "0"
            },
            cardTitle: {
                color: grayColor[2],
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none",
                "& small": {
                    color: grayColor[1],
                    fontWeight: "400",
                    lineHeight: "1"
                }
            },
            cardTitleWhite: {
                color: whiteColor,
                marginTop: "0px",
                minHeight: "auto",
                fontWeight: "300",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                marginBottom: "3px",
                textDecoration: "none",
                "& small": {
                    color: grayColor[1],
                    fontWeight: "400",
                    lineHeight: "1"
                }
            }
        };

        return (
            <div>
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <Loader visible={this.state.loading} type="TailSpin" color="#0099ff" height={100} width={100} />
                </div>
                {!this.state.loading && (
                    <div style={{ marginTop: 30 }}>
                        <CardHeader color="rose">
                            <h3>{i18n.t("dashboard.welcome")}</h3>
                            <strong>{i18n.t("dashboard.welcome2")}</strong>
                        </CardHeader>
                        <br />
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="success" stats icon style={{ color: "#000000" }}>
                                        <CardIcon color="success" style={{ color: "#ffffff" }}>
                                            <Icon>attach_money</Icon>
                                        </CardIcon>
                                        <p
                                            style={{ fontWeight: "bold", paddingTop: 5 }}
                                            className={dashboardStyle.cardCategory}
                                        >
                                            {i18n.t("dashboard.title.aud")}
                                        </p>
                                        <h3 className={dashboardStyle.cardTitle}>{currencies.AUD}</h3>
                                    </CardHeader>
                                    <CardFooter stats></CardFooter>
                                </Card>
                            </GridItem>

                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="info" stats icon style={{ color: "#000000" }}>
                                        <CardIcon color="info" style={{ color: "#ffffff" }}>
                                            <Icon>attach_money</Icon>
                                        </CardIcon>
                                        <p
                                            style={{ fontWeight: "bold", paddingTop: 5 }}
                                            className={dashboardStyle.cardCategory}
                                        >
                                            {i18n.t("dashboard.title.myr")}
                                        </p>
                                        <h3 className={dashboardStyle.cardTitle}>{currencies.MYR}</h3>
                                    </CardHeader>
                                    <CardFooter stats></CardFooter>
                                </Card>
                            </GridItem>

                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="warning" stats icon style={{ color: "#000000" }}>
                                        <CardIcon color="warning" style={{ color: "#ffffff" }}>
                                            <Icon>attach_money</Icon>
                                        </CardIcon>
                                        <p
                                            style={{ fontWeight: "bold", paddingTop: 5 }}
                                            className={dashboardStyle.cardCategory}
                                        >
                                            {i18n.t("dashboard.title.sgd")}
                                        </p>
                                        <h3 className={dashboardStyle.cardTitle}>{currencies.SGD}</h3>
                                    </CardHeader>
                                    <CardFooter stats></CardFooter>
                                </Card>
                            </GridItem>

                            <GridItem xs={12} sm={6} md={3}>
                                <Card>
                                    <CardHeader color="danger" stats icon style={{ color: "#000000" }}>
                                        <CardIcon color="danger" style={{ color: "#ffffff" }}>
                                            <Icon>attach_money</Icon>
                                        </CardIcon>
                                        <p
                                            style={{ fontWeight: "bold", paddingTop: 5 }}
                                            className={dashboardStyle.cardCategory}
                                        >
                                            {i18n.t("dashboard.title.usd")}
                                        </p>
                                        <h3 className={dashboardStyle.cardTitle}>{currencies.USD}</h3>
                                    </CardHeader>
                                    <CardFooter stats></CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                )}

                <br />
                {!this.state.loading && (
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                            <strong>{i18n.t("dashboard.currentRate")}</strong>{" "}
                            <StyledTooltip title={i18n.t("tooltip.message")}>
                                <HelpIcon style={{ color: "#000000" }} />
                            </StyledTooltip>
                            <hr />
                            <table>
                                <tr>
                                    <td>
                                        <p>{i18n.t("dashboard.title.aud")} : </p>
                                    </td>
                                    <td>
                                        <p>
                                            {this.state.ratesList != null
                                                ? this.state.ratesList["AUD"]
                                                : i18n.t("service.error")}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>{i18n.t("dashboard.title.myr")} : </p>
                                    </td>
                                    <td>
                                        <p>
                                            {this.state.ratesList != null
                                                ? this.state.ratesList["MYR"]
                                                : i18n.t("service.error")}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>{i18n.t("dashboard.title.sgd")} : </p>
                                    </td>
                                    <td>
                                        <p>
                                            {this.state.ratesList != null
                                                ? this.state.ratesList["SGD"]
                                                : i18n.t("service.error")}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>{i18n.t("dashboard.title.usd")} : </p>
                                    </td>
                                    <td>
                                        <p>
                                            {this.state.ratesList != null
                                                ? this.state.ratesList["USD"]
                                                : i18n.t("service.error")}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <strong>
                                {i18n.t("dashboard.lastUpdate")}:&nbsp;&nbsp;&nbsp;
                                {new Date().customFormat("#YYYY#-#MM#-#DD# #h#:#mm#:#ss##ampm#")}
                            </strong>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                            <Slideshow />
                        </GridItem>
                    </GridContainer>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isCacheLoading: state.dashboardReducer.isLoadingConstant,
    currencies: state.dashboardReducer.data,
    isFreeCreditLoading: state.dashboardReducer.isLoadingFreeCreditConstant,
    isRatesLoading: state.exchangeReducer.isRatesLoading,
    ratesList: state.exchangeReducer.ratesList
});

const mapDispatchToProps = (dispatch) => ({
    loadConstant: () => dispatch(dashboardAction.loadConstant()),
    getFreeCredit: () => dispatch(dashboardAction.getFreeCredit()),
    loadRates: () => dispatch(exchangeAction.loadRates())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
