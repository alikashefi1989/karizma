// custom
import { TaskEntity } from "./task.entity";

export interface DataOfStore {
    tasks: Array<TaskEntity>;
    darkMode: boolean;
};

export interface ActionOfStore {
    addTask: (task: TaskEntity) => void;
    updateTask: (task: TaskEntity) => void;
    deleteTask: (id: TaskEntity['id']) => void;
    updateTasks: (tasks: Array<TaskEntity>) => void;
    deleteTasks: () => void;
    setDarkMode: (darkMode: boolean) => void;
};

export type Store = DataOfStore & ActionOfStore;