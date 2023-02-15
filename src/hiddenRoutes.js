import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile";
import ForgetPassword from "views/examples/forgetPassword";
import ForgetPasswordLink from "views/examples/forgetPasswordLink";

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
        path: "profile",
        name: "Profile",
        icon: "ni ni-circle-08 text-pink",
        component: Profile,
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
    }
]
export default routes;