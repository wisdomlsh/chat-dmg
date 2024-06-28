import Home from "@/pages/Home";
import { useRoutes } from "react-router-dom";
const Route = () => {

    return useRoutes(
        [
            {
                path: "/",
                element: <Home />,
            }
        ]
    )
}
export default Route