import CommonManagerImpl from "views/CommonManagerImpl";
import { FIRST_PAGE } from "../Properties";
import "../CustomStyle.css";

export default class ExchangeModel extends CommonManagerImpl {
    constructor(props) {
        super(props);
        this.state = {
            historyList: null,
            ratesList: null,
            displayResult: null,
            loading: true,
            exchangeToList:[],
            AUD: 0,
            MYR: 0,
            SGD: 0,
            USD: 0,
            transactionDate: "-",
            amount: null,
            exchangeFrom: null,
            exchangeTo: null,
            currencyRate: "-",
            receivedAmount: "-",
            balance: null,
            transactionDateErrorMessage: null,
            exchangeFromErrorMessage: null,
            amountErrorMessage: null,
            exchangeToErrorMessage: null, 
            activePage: this.props.location.state?.activePage ?? FIRST_PAGE,
            dataCount: 0
        };
    }
    stateList = [];
    cityList = [];
    backups = [];
}
