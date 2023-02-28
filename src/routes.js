import Aircraft from "components/Aircraft/Aircraft";
import BankDetails from "components/Bank Details/BankDetails";
import Clients from "components/Client/clients";
import contract from "components/Contract/contract";
import Crew from "components/Crew/crew";
import Trip from "components/Trip/trip";
import Index from "views/Index.js"

// import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";

import Document from "components/Document/document";
import Dashboard from "client/components/dashboard/Dashboard";
import ClientTrip from "client/components/trip/Trip";
import Clientdocument from "client/components/Document/Document";
import Clientaircraft from "client/components/aircraft/Aircraft";
import Profile from "views/examples/Profile";
import UpdatePassword from "views/examples/updatePassword";




var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 ",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Client",
    icon: "fa fa-user",
    component: Clients,
    layout: "/admin"
  },
   {
    path: "/crew",
    name: "Crew",
     icon: "fa fa-users",
    component: Crew,
    layout: "/admin"
  },
  {
    path: "/trip",
    name: "Trip",
    icon: "fa fa-plane",
    component: Trip ,
    layout: "/admin"
  },
  {
    path: "/documents",
    name: "Document",
    icon: "fa fa-file",
    component: Document,
    layout: "/admin"
  },
  {
    path: "/aircraft",
    name: "Aircraft",
    icon: "fa fa-fighter-jet",
    component: Aircraft,
    layout: "/admin"
  },
 
  {
    path: "/bankDetails",
    name: "Bank detail",
    icon: "fa fa-university",
    component: BankDetails,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "fa fa-user",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/updatePassword",
    name: "updatePassowrd",
    icon: "ni ni-circle-08 text-pink",
    component: UpdatePassword,
    layout: "/admin"
  },
  
  
  
];
export default routes;
