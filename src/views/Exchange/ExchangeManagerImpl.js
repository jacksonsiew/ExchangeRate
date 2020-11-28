import React from "react";
import ExchangeModel from "./ExchangeModel";
import firebase from "../firebase";
import swal from "@sweetalert/with-react";
import i18n from "../../i18n";
import { NUM_OF_RECORDS_PER_PAGE, FIRST_PAGE, currenciesType } from "../Properties";
import currency from 'currency.js';

export default class ExchangeManagerImpl extends ExchangeModel {
    constructor(props) {
        super(props);
        this._init = this._init.bind(this);
        this.searchTransactionDate = this.searchTransactionDate.bind(this);
        this.searchAmount = this.searchAmount.bind(this);
        this.searchExchangeFrom = this.searchExchangeFrom.bind(this);
        this.searchExchangeTo = this.searchExchangeTo.bind(this);
        this.searchCurrencyRate = this.searchCurrencyRate.bind(this);
        this.searchReceivedAmount = this.searchReceivedAmount.bind(this);
        this.searchBalance = this.searchBalance.bind(this);
        this._initForm = this._initForm.bind(this);
        this.handleAvailableAmount = this.handleAvailableAmount.bind(this);
        this.handleExchangeFrom = this.handleExchangeFrom.bind(this);
        this.handleExchangeTo = this.handleExchangeTo.bind(this);
        this.handleDropdownCondition = this.handleDropdownCondition.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    _init(historyList) {
        var output = [];
        if (historyList.length > 0) {
            historyList.forEach((history) => {
                output.push(Object.values(history));
            });
        }
        this.backups = historyList;
        let dataCount = output.length;
        let displayResult = [];
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        this.setState({ displayResult, dataCount, historyList, loading: false });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchTransactionDate(e, start, count) {
        let value = e.target.value ? new Date(e.target.value).customFormat("#DD#/#MM#/#YYYY#") : "";
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.transactionDate.indexOf(value) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchAmount(e, start, count) {
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.amount.toString().indexOf(e.target.value) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchExchangeFrom(e, start, count) {
        let searchInput = this.getKeyByValue(currenciesType, e.target.value) || "";
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.exchangeFrom.indexOf(searchInput) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchExchangeTo(e, start, count) {
        let searchInput = this.getKeyByValue(currenciesType, e.target.value) || "";
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.exchangeTo.indexOf(searchInput) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchCurrencyRate(e, start, count) {
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.currencyRate.toString().indexOf(e.target.value) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchReceivedAmount(e, start, count) {
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.receivedAmount.toString().indexOf(e.target.value) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    /**
     *
     * @param {*} e Required
     * @param {*} start Optional
     * @param {*} count Optional
     */
    searchBalance(e, start, count) {
        let output = [];
        let displayResult = [];
        this.backups
            .filter((x) => x.balance.toString().indexOf(e.target.value) > -1)
            .forEach((result) => {
                output.push(count ? Object.values(result).splice(start, count) : Object.values(result).splice(start));
            });
        let dataCount = output.length;
        while (output.length > 0) {
            let temp = output.splice(NUM_OF_RECORDS_PER_PAGE);
            displayResult.push(output);
            output = temp;
        }
        return this.setState({ displayResult, dataCount, activePage: FIRST_PAGE });
    }

    _initForm(currencies, ratesList) {
        this.setState({
            ratesList,
            AUD: currencies.AUD,
            MYR: currencies.MYR,
            SGD: currencies.SGD,
            USD: currencies.USD,
            exchangeToList: Object.keys(currenciesType),
            loading: false
        });
    }

    handleExchangeFrom(changeEvent) {
        const exchangeToList = Object.keys(currenciesType).filter((e) => {
            return e !== changeEvent.target.value;
        });
        this.setState({
            exchangeToList,
            exchangeTo: this.state.exchangeTo !== changeEvent.target.value ? this.state.exchangeTo : "",
            currencyRate: this.state.exchangeTo !== changeEvent.target.value ? this.state.currencyRate : "-",
            receivedAmount: this.state.exchangeTo !== changeEvent.target.value ? this.state.receivedAmount : "-",
            exchangeFrom: changeEvent.target.value,
            exchangeFromErrorMessage: null
        });
    }

    handleExchangeTo(changeEvent) {
        this.setState({
            currencyRate: changeEvent.target.value ? this.state.ratesList[changeEvent.target.value] : "-",
            receivedAmount: changeEvent.target.value
                ? currency(this.state.amount, {precision: 5}).multiply(this.state.ratesList[changeEvent.target.value])
                : "-",
            exchangeTo: changeEvent.target.value,
            exchangeToErrorMessage: null
        });
    }

    handleAvailableAmount() {
        const conditionAUD = this.state.exchangeFrom === "AUD" && this.state.AUD - this.state.amount < 0;
        const conditionMYR = this.state.exchangeFrom === "MYR" && this.state.MYR - this.state.amount < 0;
        const conditionSGD = this.state.exchangeFrom === "SGD" && this.state.SGD - this.state.amount < 0;
        const conditionUSD = this.state.exchangeFrom === "USD" && this.state.USD - this.state.amount < 0;
        if (this.state.amount === 0) {
            this.setState({ amount: "" });
            swal(i18n.t("exchange.block.zero"), {
                icon: "error"
            });
        } else if (conditionAUD || conditionMYR || conditionSGD || conditionUSD) {
            this.setState({ amount: "" });
            swal(
                i18n.t("exchange.insufficient", {
                    type: this.state.exchangeFrom
                }),
                {
                    icon: "error"
                }
            );
        } else {
            const balance =
                this.state.exchangeFrom === "AUD"
                    ? parseFloat(this.state.AUD) - parseFloat(this.state.amount)
                    : this.state.exchangeFrom === "MYR"
                    ? parseFloat(this.state.MYR) - parseFloat(this.state.amount)
                    : this.state.exchangeFrom === "SGD"
                    ? parseFloat(this.state.SGD) - parseFloat(this.state.amount)
                    : parseFloat(this.state.USD) - parseFloat(this.state.amount);
            this.setState({ balance, exchangeTo: "", currencyRate: "-", receivedAmount: "-" });
        }
    }

    handleDropdownCondition(currency) {
        return (
            (currency === "AUD" && parseInt(this.state.AUD) !== 0) ||
            (currency === "MYR" && parseInt(this.state.MYR) !== 0) ||
            (currency === "SGD" && parseInt(this.state.SGD) !== 0) ||
            (currency === "USD" && parseInt(this.state.USD) !== 0)
        );
    }

    onCreate(e) {
        e.preventDefault();
        this.setState({
            transactionDateErrorMessage: null,
            exchangeFromErrorMessage: null,
            amountErrorMessage: null,
            exchangeToErrorMessage: null
        });
        if (
            this.state.transactionDate &&
            this.state.transactionDate !== "-" &&
            this.state.exchangeFrom &&
            this.state.amount &&
            this.state.exchangeTo
        ) {
            swal({
                title: i18n.t("dialog.check.detail"),
                content: (
                    <table style={{ fontSize: 10 }}>
                        <tbody>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.transactionDate")} :</td>
                                <td className="modelDesc">{this.convertDisplayDate(this.state.transactionDate)}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.amount")} :</td>
                                <td className="modelDesc">{this.state.amount}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.from")} :</td>
                                <td className="modelDesc">{this.state.exchangeFrom}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.to")} :</td>
                                <td className="modelDesc">{this.state.exchangeTo}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.rate")} :</td>
                                <td className="modelDesc">{this.state.currencyRate}</td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.receivedAmount")} :</td>
                                <td className="modelDesc">
                                    <strong>{parseFloat(this.state.receivedAmount).toFixed(5)}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td className="modelTitle">{i18n.t("exchange.balance")} :</td>
                                <td className="modelDesc">
                                    <strong>{this.state.balance}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ),
                icon: "warning",
                buttons: [i18n.t("common.cancel"), i18n.t("common.create")]
            }).then((confirm) => {
                if (confirm) {
                    this.setState({ loading: true });
                    firebase
                        .firestore()
                        .collection("users/")
                        .doc(firebase.auth().currentUser.uid)
                        .collection("exchangeHistory/")
                        .add({
                            transactionDate: new Date(this.state.transactionDate),
                            amount: parseFloat(this.state.amount),
                            exchangeFrom: this.state.exchangeFrom,
                            exchangeTo: this.state.exchangeTo,
                            currencyRate: parseFloat(this.state.currencyRate),
                            receivedAmount: parseFloat(this.state.receivedAmount),
                            balance: parseFloat(this.state.balance),
                            createdDatetime: new Date()
                        })
                        .then(() => {
                            const totalAmount =
                                this.state.exchangeFrom === "AUD"
                                    ? this.state.AUD
                                    : this.state.exchangeFrom === "MYR"
                                    ? this.state.MYR
                                    : this.state.exchangeFrom === "SGD"
                                    ? this.state.SGD
                                    : this.state.USD;
                            const increasedAmount =
                                this.state.exchangeTo === "AUD"
                                    ? this.state.AUD
                                    : this.state.exchangeTo === "MYR"
                                    ? this.state.MYR
                                    : this.state.exchangeTo === "SGD"
                                    ? this.state.SGD
                                    : this.state.USD;
                            return firebase
                                .firestore()
                                .collection("users/")
                                .doc(firebase.auth().currentUser.uid)
                                .update({
                                    [this.state.exchangeFrom]: parseFloat(totalAmount) - parseFloat(this.state.amount),
                                    [this.state.exchangeTo]: parseFloat(increasedAmount) + parseFloat(this.state.receivedAmount)
                                });
                        })
                        .then(() => {
                            this.setState({ loading: false });
                            swal(i18n.t("common.create.success"), {
                                icon: "success"
                            });
                            this.props.history.push({ pathname: "/admin/exchangeHistory" });
                        })
                        .catch((error) => {
                            this.setState({ loading: false });
                            swal(i18n.t("network.error"), {
                                icon: "error"
                            });
                            console.log(error);
                        });
                }
            });
        } else {
            this.setState({
                transactionDateErrorMessage:
                    (!this.state.transactionDate || this.state.transactionDate === "-") &&
                    i18n.t("exchange.input.validation.transaction"),
                exchangeFromErrorMessage: !this.state.exchangeFrom && i18n.t("exchange.input.validation.from"),
                amountErrorMessage: !this.state.amount && i18n.t("exchange.input.validation.to"),
                exchangeToErrorMessage: !this.state.exchangeTo && i18n.t("exchange.input.validation.amount")
            });
        }
    }
}
