import { lazy } from "react";
import DashboarHome from "./dashboard/DashboarHome";
import Grops from "./dashboard/Grops";
import LoginHome from "./auth/LoginHome";


const Login = lazy(() =>
    import("./auth/Login").then(
        (mod) =>
            new Promise<typeof mod>((resolve) => {
                setTimeout(() => resolve(mod), 3000);
            })
    )
);


export { Login, DashboarHome, Grops, LoginHome }  