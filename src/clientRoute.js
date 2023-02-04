import Dashboard from "client/components/dashboard/Dashboard";
import ClientTrip from "client/components/trip/Trip";
import Clientdocument from "client/components/Document/Document";
import Clientaircraft from "client/components/aircraft/Aircraft";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js" 


var routes = [
    
    {
        path: "/clientIndex",
        name: "Dashboard",
        icon: "ni ni-tv-2",
        component: Dashboard,
        layout: "/client"
    },
    {
        path: "/clientTrip",
        name: "Trip",
        icon: "fa fa-plane",
        component: ClientTrip,
        layout: "/client"
    },
    {
        path: "/clientDocument",
        name: "Document",
        icon: "fa fa-file",
        component: Clientdocument,
        layout: "/client"
    },
    {
        path: "/clientAircraft",
        name: "Aircraft",
        icon: "fa fa-fighter-jet",
        component: Clientaircraft,
        layout: "/client"
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   icon: "ni ni-key-25 text-info",
    //   component: Login,
    //   layout: "/auth"
    // },
    // {
    //   path: "/register",
    //   name: "Register",
    //   icon: "ni ni-circle-08 text-pink",
    //   component: Register,
    //   layout: "/auth"
    // }
];
export default routes;
