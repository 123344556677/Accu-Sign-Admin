import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile";
import ForgetPassword from "views/examples/forgetPassword";
import ForgetPasswordLink from "views/examples/forgetPasswordLink";

const routes=[
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth"
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-circle-08 text-pink",
        component: Profile,
        layout: "/auth"
    },
     {
         path: "/forgetPassword/:email",
         name: "forgetPassword",
        icon: "ni ni-circle-08 text-pink",
        component: ForgetPassword,
        layout: "/auth"
    },
    {
        path: "/forgetPasswordLink",
        name: "forgetPasswordLink",
        icon: "ni ni-circle-08 text-pink",
        component: ForgetPasswordLink,
        layout: "/auth"
    }
]
export default routes;