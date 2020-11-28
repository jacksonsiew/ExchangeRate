import CommonManagerImpl from "views/CommonManagerImpl";

export default class AreaModel extends CommonManagerImpl {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailerrorMessage: "",
            passworderrorMessage: "",
            errorMessage: "",
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
}
