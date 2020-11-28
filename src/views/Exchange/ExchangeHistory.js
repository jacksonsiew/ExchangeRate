import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Loader from "react-loader-spinner";
import FadeIn from "react-fade-in";
import { Icon } from "@material-ui/core";
import i18n from "../../i18n";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { NUM_OF_RECORDS_PER_PAGE, currenciesType } from "../Properties";
import ExchangeManagerImpl from "./ExchangeManagerImpl";
import * as exchangeAction from "../../redux/actions/ExchangeAction";

class ExchangeHistory extends ExchangeManagerImpl {
    componentDidMount() {
        this.setState({ loading: true });
        this.props.loadExchangeHistory();
        this.intervalID = setInterval(() => {
            const { isHistoryLoading, historyList } = this.props;
            if (!isHistoryLoading) {
                this._init(historyList);
                clearInterval(this.intervalID);
            }
        }, 100);
    }

    render() {
        let displayResult = this.state.displayResult;
        return (
            <div>
                <GridContainer>
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    >
                        <Loader
                            visible={this.state.loading}
                            type="TailSpin" //Puff
                            color="#0099ff"
                            height={100}
                            width={100}
                        />
                    </div>

                    {!this.state.loading && displayResult != null && (
                        <GridItem xs={12} sm={12} md={12}>
                            <div>
                                <button
                                    class="btn btn-primary"
                                    type="submit"
                                    href="#"
                                    onClick={() => this._create("/admin/exchangeForm")}
                                >
                                    {i18n.t("common.exchange")} <Icon style={{ fontSize: 16, paddingTop: 2 }}>add</Icon>
                                </button>
                            </div>
                            <br />
                            <FadeIn>
                                <Card>
                                    <CardHeader color="rose">
                                        <h3>{i18n.t("exchange.history")}</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="primary"
                                            tableHead={[
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("common.number")}</p>
                                                </div>,
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("exchange.transactionDate")}</p>
                                                    <input
                                                        type="date"
                                                        className="form-control searchInput"
                                                        id="transactionDate"
                                                        placeholder="search..."
                                                        onChange={(value) => {
                                                            this.searchTransactionDate(value);
                                                        }}
                                                    />
                                                </div>,
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("exchange.amount")}</p>
                                                    <input
                                                        type="number"
                                                        className="form-control searchInput"
                                                        id="amount"
                                                        placeholder="search..."
                                                        onChange={(value) => {
                                                            this.searchAmount(value);
                                                        }}
                                                    />
                                                </div>,
                                                <div>
                                                    <p className="searchLabel">{i18n.t("exchange.from")}</p>
                                                    <select
                                                        className="form-control searchInput"
                                                        id="exchangeFrom"
                                                        onChange={(value) => {
                                                            this.searchExchangeFrom(value);
                                                        }}
                                                    >
                                                        <option value="">{i18n.t("dropdown.all")}</option>
                                                        {Object.keys(currenciesType).map((key) => (
                                                            <option key={key} value={currenciesType[key]}>
                                                                {currenciesType[key]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>,
                                                <div>
                                                    <p className="searchLabel">{i18n.t("exchange.to")}</p>
                                                    <select
                                                        className="form-control searchInput"
                                                        id="exchangeTo"
                                                        onChange={(value) => {
                                                            this.searchExchangeTo(value);
                                                        }}
                                                    >
                                                        <option value="">{i18n.t("dropdown.all")}</option>
                                                        {Object.keys(currenciesType).map(
                                                            (key) =>
                                                                this.state.exchangeFrom !== key && (
                                                                    <option key={key} value={currenciesType[key]}>
                                                                        {currenciesType[key]}
                                                                    </option>
                                                                )
                                                        )}
                                                    </select>
                                                </div>,
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("exchange.rate")}</p>
                                                    <input
                                                        type="number"
                                                        className="form-control searchInput"
                                                        id="currencyRate"
                                                        placeholder="search..."
                                                        onChange={(value) => {
                                                            this.searchCurrencyRate(value);
                                                        }}
                                                    />
                                                </div>,
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("exchange.receivedAmount")}</p>
                                                    <input
                                                        type="number"
                                                        className="form-control searchInput"
                                                        id="receivedAmount"
                                                        placeholder="search..."
                                                        onChange={(value) => {
                                                            this.searchReceivedAmount(value);
                                                        }}
                                                    />
                                                </div>,
                                                <div style={{ width: "100%" }}>
                                                    <p className="searchLabel">{i18n.t("exchange.balance")}</p>
                                                    <input
                                                        type="number"
                                                        className="form-control searchInput"
                                                        id="balance"
                                                        placeholder="search..."
                                                        onChange={(value) => {
                                                            this.searchBalance(value);
                                                        }}
                                                    />
                                                </div>
                                            ]}
                                            tableData={
                                                displayResult.length > 0
                                                    ? displayResult[parseInt(this.state.activePage) - 1]
                                                    : displayResult
                                            }
                                        />
                                    </CardBody>
                                </Card>
                            </FadeIn>
                        </GridItem>
                    )}
                </GridContainer>
                {!this.state.loading && displayResult != null && (
                    <div style={{ float: "right", bottom: 40, right: 30 }}>
                        <FadeIn>
                            <Pagination
                                hideNavigation
                                pageRangeDisplayed={NUM_OF_RECORDS_PER_PAGE}
                                activePage={this.state.activePage}
                                itemsCountPerPage={NUM_OF_RECORDS_PER_PAGE}
                                totalItemsCount={this.state.dataCount}
                                onChange={this.handlePageChange}
                            />
                        </FadeIn>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isHistoryLoading: state.exchangeReducer.isHistoryLoading,
    historyList: state.exchangeReducer.historyList
});

const mapDispatchToProps = (dispatch) => ({
    loadExchangeHistory: () => dispatch(exchangeAction.loadExchangeHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeHistory);
