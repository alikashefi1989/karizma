// module
import { create } from "zustand";
// custom
import { Store } from "../models/store";
import { TaskEntity } from "../models/task.entity";

const useStore = create<Store, any>((set, get) => (
    {
        tasks: [],
        darkMode: false,
        addTask: (task: TaskEntity) => {
            const store: Store = get();
            set({ ...store, tasks: [...store.tasks, task] });
        },
        updateTask: (task: TaskEntity) => {
            const store: Store = get();
            set({
                ...store, 
                tasks: [...store.tasks.map((item: TaskEntity) => {
                    if (item.id !== task.id) return item;
                    return task
                })]
            });
        },
        deleteTask: (id: TaskEntity['id']) => {
            const store: Store = get();
            set({ ...store, tasks: [...store.tasks.filter((item: TaskEntity) => item.id !== id)] });
        },
        updateTasks: (tasks: Array<TaskEntity>) => {
            const store: Store = get();
            set({ ...store, tasks: [...tasks] });
        },
        deleteTasks: () => {
            const store: Store = get();
            set({ ...store, tasks: [] });
        },
        setDarkMode: (darkMode: boolean) => {
            const store: Store = get();
            set({ ...store, darkMode });
        },
    }
));

export default useStore;