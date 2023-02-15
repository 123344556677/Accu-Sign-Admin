
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Logo from './Accu Sign.png'
// reactstrap components
import { Container } from "reactstrap";
// core components

import CrewSidebar from "components/Sidebar/CrewSidebar.js";


import MainNavbar from "components/Navbars/MainNavbar";
import routes from "crewRoute.js";
import Footer from "components/Footers/AdminFooter";

const Crew = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/crew") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <CrewSidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: Logo,
                    imgAlt: "..."
                }}
            />
            <div className="main-content" ref={mainContent}>
                {/*<AdminNavbar
          {...props}
      brandText={getBrandText(props.location.pathname)}
      />*/}
                <MainNavbar />

                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/crew/crewIndex" />
                </Switch>
<Footer/>
            </div>
        </>
    );
};

export default Crew;