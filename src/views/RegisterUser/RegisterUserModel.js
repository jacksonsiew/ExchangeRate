import CommonManagerImpl from "views/CommonManagerImpl";
import "./RegisterUser.css";
import "../CustomStyle.css";

export default class RegisterUserModel extends CommonManagerImpl {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: "",
            name: "",
            identityNumber: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            errorMessage: "",
            loading: false,
            password_message: false,
        };
    }
}
