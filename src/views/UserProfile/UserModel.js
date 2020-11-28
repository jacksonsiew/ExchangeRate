import "../CustomStyle.css";
import CommonManagerImpl from "views/CommonManagerImpl";

export default class UnitModel extends CommonManagerImpl {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user ?? null,
            name: this.props.user?.name ?? "",
            dateOfBirth: this.props.user?.dateOfBirth ?? "-",
            gender: this.props.user?.gender ?? "m",
            phoneNumber: this.props.user?.phoneNumber ?? "",
            picture: this.props.user?.signedUrl ?? null,
            imageUri: null,
            loading: this.props.user ? false : true
        };
    }
}
