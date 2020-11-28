import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loader from "react-loader-spinner";
import ExchangeManagerImpl from "./ExchangeManagerImpl";
import { Icon } from "@material-ui/core";
import i18n from "../../i18n";
import { FIRST_PAGE, currenciesType } from "../Properties";
import { connect } from "react-redux";
import * as dashboardAction from "../../redux/actions/DashboardAction";
import * as exchangeAction from "../../redux/actions/ExchangeAction";
import swal from "@sweetalert/with-react";

class ExchangeForm extends ExchangeManagerImpl {
    componentDidMount() {
        this.props.loadConstant();
        this.props.loadRates();
        this.intervalID = setInterval(() => {
            const { isCacheLoading, currencies, isRatesLoading, ratesList } = this.props;
            if (!isCacheLoading && !isRatesLoading) {
                if (!ratesList) {
                    swal(i18n.t("service.error.message"), {
                        icon: "error",
                        closeOnClickOutside: false
                    }).then((confirm) => {
                        if (confirm) {
                            this.props.history.push({
                                pathname: "/admin/exchangeHistory",
                                state: {
                                    activePage: FIRST_PAGE
                                }
                            });
                        }
                    });
                } else {
                    this._initForm(currencies, ratesList);
                }
                clearInterval(this.intervalID);
            }
        }, 100);
    }

    render() {
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
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card profile>
                                <CardHeader color="rose">
                                    <h3>{i18n.t("exchange.new")}</h3>
                                </CardHeader>
                                <CardBody>
                                    <h3 style={{ textAlign: "left" }}>{i18n.t("exchange.availableBalance")}</h3>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <p style={{ textAlign: "left", fontSize: 25 }}>
                                                <strong>{i18n.t("currency.aud")}: </strong>&nbsp;&nbsp;
                                                {this.state.AUD}
                                            </p>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <p style={{ textAlign: "left", fontSize: 25 }}>
                                                <strong>{i18n.t("currency.myr")}:</strong>&nbsp;&nbsp;
                                                {this.state.MYR}
                                            </p>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <p style={{ textAlign: "left", fontSize: 25 }}>
                                                <strong>{i18n.t("currency.sgd")}:</strong>&nbsp;&nbsp;
                                                {this.state.SGD}
                                            </p>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <p style={{ textAlign: "left", fontSize: 25 }}>
                                                <strong>{i18n.t("currency.usd")}:</strong>&nbsp;&nbsp;
                                                {this.state.USD}
                                            </p>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText={i18n.t("exchange.transactionDate")}
                                                id="transactionDate"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type={"date"}
                                                value={this.state.transactionDate}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        this.setState({ transactionDateErrorMessage: null });
                                                    }
                                                    this.handleChange(e);
                                                }}
                                            />
                                            {this.state.transactionDateErrorMessage && (
                                                <span style={{ color: "red" }}>
                                                    {this.state.transactionDateErrorMessage}
                                                </span>
                                            )}
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    marginTop: 30,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <select
                                                    className="form-control searchInput"
                                                    id="exchangeFrom"
                                                    onChange={(e) => {
                                                        this.handleExchangeFrom(e);
                                                    }}
                                                    onBlur={() => this.handleAvailableAmount()}
                                                    value={this.state.exchangeFrom}
                                                >
                                                    <option key="" value="">
                                                        {i18n.t("exchange.from")}
                                                    </option>
                                                    {currenciesType !== null &&
                                                        Object.entries(currenciesType).map(
                                                            (currency) =>
                                                                this.handleDropdownCondition(currency[0]) && (
                                                                    <option key={currency[1]} value={currency[0]}>
                                                                        {currency[1]}
                                                                    </option>
                                                                )
                                                        )}
                                                </select>
                                                {this.state.exchangeFromErrorMessage && (
                                                    <span style={{ color: "red" }}>
                                                        {this.state.exchangeFromErrorMessage}
                                                    </span>
                                                )}
                                            </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText={i18n.t("exchange.amount")}
                                                id="amount"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type={"number"}
                                                value={this.state.amount}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        this.setState({ amountErrorMessage: null });
                                                    }
                                                    this.handleChange(e);
                                                }}
                                                onBlur={() => this.handleAvailableAmount()}
                                            />
                                            {this.state.amountErrorMessage && (
                                                <span style={{ color: "red" }}>{this.state.amountErrorMessage}</span>
                                            )}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    marginTop: 30,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <select
                                                    className="form-control searchInput"
                                                    id="exchangeTo"
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            this.setState({ exchangeToErrorMessage: null });
                                                        }
                                                        this.handleExchangeTo(e);
                                                    }}
                                                    value={this.state.exchangeTo}
                                                >
                                                    <option key="" value="">
                                                        {i18n.t("exchange.to")}
                                                    </option>
                                                    {this.state.exchangeToList.length > 0 &&
                                                        this.state.exchangeToList.map((currency) => (
                                                            <option key={currency} value={currency}>
                                                                {currency}
                                                            </option>
                                                        ))}
                                                </select>
                                                {this.state.exchangeToErrorMessage && (
                                                    <span style={{ color: "red" }}>
                                                        {this.state.exchangeToErrorMessage}
                                                    </span>
                                                )}
                                            </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText={i18n.t("exchange.rate")}
                                                id="currencyRate"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                value={this.state.currencyRate}
                                                style={{ color: "#000000" }}
                                                disabled={true}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText={i18n.t("exchange.receivedAmount")}
                                                id="receivedAmount"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                value={this.state.receivedAmount}
                                                style={{ color: "#000000" }}
                                                disabled={true}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button
                                        color="white"
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: "/admin/exchangeHistory",
                                                state: {
                                                    activePage: FIRST_PAGE
                                                }
                                            });
                                        }}
                                    >
                                        <b>{i18n.t("common.back")}</b>
                                    </Button>
                                    <div>
                                        {this.state.edit && (
                                            <Button color={"danger"} onClick={this._archieve}>
                                                {i18n.t("common.archieve")}&nbsp;&nbsp;&nbsp;
                                                {this.state.loading2 ? (
                                                    <i
                                                        style={{ color: "#ffffff", fontSize: 20 }}
                                                        class="fa fa-spinner fa-spin"
                                                    ></i>
                                                ) : (
                                                    <Icon style={{ fontSize: 18 }}>delete_forever</Icon>
                                                )}
                                            </Button>
                                        )}
                                        &nbsp;&nbsp;&nbsp;
                                        <Button color={"success"} onClick={this.onCreate}>
                                            {i18n.t("common.create")}
                                            &nbsp;&nbsp;&nbsp;
                                            <Icon style={{ fontSize: 18 }}>save</Icon>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
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
    isRatesLoading: state.exchangeReducer.isRatesLoading,
    ratesList: state.exchangeReducer.ratesList
});

const mapDispatchToProps = (dispatch) => ({
    loadConstant: () => dispatch(dashboardAction.loadConstant()),
    loadRates: () => dispatch(exchangeAction.loadRates())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
