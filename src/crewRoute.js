
import Dashboard from "crew/components/dashboard/Dashboard";
import CrewDocument from "crew/components/Document/Document";
import CrewTrip from "crew/components/Trip/trip";
import Profile from "views/examples/Profile";
import UpdatePassword from "views/examples/updatePassword";





var routes = [

    {
        path: "/crewIndex",
        name: "Dashboard",
        icon: "ni ni-tv-2",
        component:Dashboard ,
        layout: "/crew"
    },
    {
        path: "/crewTrip",
        name: "Trip",
        icon: "fa fa-plane",
        component:CrewTrip ,
        layout: "/crew"
    },
    {
        path: "/crewDocument",
        name: "Document",
        icon: "fa fa-file",
        component: CrewDocument,
        layout: "/crew"
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "fa fa-user",
        component: Profile,
        layout: "/crew"
    },
   
    {
        path: "/updatePassword",
        name: "updatePassowrd",
        icon: "ni ni-circle-08 text-pink",
        component: UpdatePassword,
        layout: "/crew"
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
