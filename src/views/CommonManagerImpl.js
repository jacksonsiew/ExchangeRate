import React from "react";

export default class CommonManagerImpl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this._create = this._create.bind(this);
        this.filter = this.filter.bind(this);
        this.getKeyByValue = this.getKeyByValue.bind(this);
        this.convertDisplayDate = this.convertDisplayDate.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    _create(pathname) {
        this.props.history.push({ pathname: pathname });
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleNumberChange(e) {
        this.setState({ [e.target.id]: parseFloat(e.target.value) });
    }

    fileChangedHandler(event) {
        if (event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                var result = reader.result.substring(reader.result.indexOf(",") + 1);
                this.setState({ picture: reader.result, imageUri: result });
            }.bind(this);
        }
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }

    filter(arr, criteria) {
        return arr.filter(function (obj) {
            return Object.keys(criteria).every(function (c) {
                return new RegExp(criteria[c]).test(obj[c]);
            });
        });
    }

    convertDisplayDate(value) {
        return new Date(value).customFormat("#DD#/#MM#/#YYYY#");
    }

    convertDate = (value) => {
        return new Date(value * 1000).customFormat("#YYYY#-#MM#-#DD#");
    };
}
