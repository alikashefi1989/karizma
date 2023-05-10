// module
import { ReactNode } from "react";

export interface RouteModel {
    name: string;
    path: string;
    cmp: () => ReactNode;
};