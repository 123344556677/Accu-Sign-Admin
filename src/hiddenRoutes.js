import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile";

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
        layout: "/user"
    }
]
export default routes;