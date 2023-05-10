// custom
import { ROUTES } from "./routes.enum";
import { RouteModel } from "../models/route";
import Home from "../pages/home";
import TodoList from "../pages/todo-list";
import Strength from "../pages/strength";
import NotFound from "../pages/404";

const routes: Array<RouteModel> = [
    {
        name: 'home',
        path: ROUTES.HOME,
        cmp: Home,
    },
    {
        name: 'todo-list',
        path: ROUTES.TODO_LIST,
        cmp: TodoList,
    },
    {
        name: 'strength',
        path: ROUTES.STRENGTH,
        cmp: Strength,
    },
    {
        name: 'not-found',
        path: ROUTES.NOT_FOUND,
        cmp: NotFound,
    },
];

export default routes;