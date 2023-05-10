// module
import { Routes, Route } from "react-router-dom";
// custom
import Layout from "./layout/layout"
import routes from './routes/routes';
import { RouteModel } from "./models/route";

const App = () => {
    return (
        <Layout>
            <Routes>
                {
                    routes.map((route: RouteModel) => {
                        return <Route
                            key={route.path}
                            path={route.path}
                            element={route.cmp()}
                        />
                    })
                }
            </Routes>
        </Layout>
    );
};

export default App;
