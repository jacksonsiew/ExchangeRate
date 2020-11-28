import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import i18n from "./i18n";
import firebase from "./views/firebase";
import loadable from "@loadable/component";

const DashboardPage = loadable(() => import("views/Dashboard/Dashboard.js"));
const UserProfile = loadable(() => import("views/UserProfile/UserProfile.js"));
const ExchangeHistory = loadable(() => import("views/Exchange/ExchangeHistory.js"));

var dashboardRoutes = [];
firebase.auth().onAuthStateChanged((user) => {
    dashboardRoutes.push(
        {
            path: "/dashboard",
            name: i18n.t("dashboard.title"),
            icon: Dashboard,
            component: DashboardPage,
            layout: "/admin"
        },
        {
            path: "/exchangeHistory",
            name: i18n.t("exchange.title"),
            icon: "attach_money",
            component: ExchangeHistory,
            layout: "/admin"
        },
        {
            path: "/user",
            name: i18n.t("user.profile.title"),
            icon: Person,
            component: UserProfile,
            layout: "/admin"
        },
    );
});

export default dashboardRoutes;
