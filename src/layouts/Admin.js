import React from "react";
import { Switch, Route } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "components/Navbars/Navbar";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import loadable from "@loadable/component";

const ExchangeForm = loadable(() => import("../views/Exchange/ExchangeForm"));

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
    const switchRoutes = (
        <Switch>
            <Route path="/admin/exchangeForm" component={ExchangeForm} />
            {routes.map((prop, key) => {
                if (prop.layout === "/admin") {
                    return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
                }
                return null;
            })}
        </Switch>
    );

    const classes = useStyles();
    const mainPanel = React.createRef();
    const [image] = React.useState(bgImage);
    const [color] = React.useState("blue");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [viewMode, setViewMode] = React.useState("desktop");
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setViewMode("desktop");
            setMobileOpen(false);
        } else {
            setViewMode("mobile");
        }
    };
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        resizeFunction();
        window.addEventListener("resize", resizeFunction);
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);
    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Exchange Rates"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                viewMode={viewMode}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar routes={routes} viewMode={viewMode} handleDrawerToggle={handleDrawerToggle} {...rest} />
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
            </div>
        </div>
    );
}
