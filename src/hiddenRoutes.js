import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile";
import ForgetPassword from "views/examples/forgetPassword";
import ForgetPasswordLink from "views/examples/forgetPasswordLink";
import UpdatePassword from "views/examples/updatePassword";
import ServiceAgreement from "components/Document/ServiceAgreement";

const routes=[
    {
        path: "/",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/"
    },
    {
        path: "register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/"
    },
    
     {
         path: "forgetPassword/:email",
         name: "forgetPassword",
        icon: "ni ni-circle-08 text-pink",
        component: ForgetPassword,
        layout: "/"
    },
    {
        path: "forgetPasswordLink",
        name: "forgetPasswordLink",
        icon: "ni ni-circle-08 text-pink",
        component: ForgetPasswordLink,
        layout: "/"
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
      
     {
        // path: "/admin/serviceAgreement",
        // name: "serviceAgreement",
        // icon: "ni ni-circle-08 text-pink",
        // component: ServiceAgreement,
        // layout: "/admin"
    }
]
export default routes;