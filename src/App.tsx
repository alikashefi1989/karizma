// module
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// custom
import Layout from "./layout/layout"
import routes from './routes/routes';
import { RouteModel } from "./models/route";

const App = () => {
    return (
        <Layout>
            <Routes>
                {
                    routes.map((route: RouteModel) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.cmp()}
                        />
                    ))
                }
            </Routes>
            <ToastContainer />
        </Layout>
    );
};

export default App;
