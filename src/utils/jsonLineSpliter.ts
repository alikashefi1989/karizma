// custom
import { TaskEntity } from "../models/task.entity";

const jsonLineSpliter = (data: Array<TaskEntity>): string => {
    const config: Array<string> = ['[', '{', ',', '}', ']']
    let stringedData: string = JSON.stringify(data);
    for (let i = 0; i < config.length; i++) {
        stringedData = stringedData.replaceAll(config[i], `${config[i]}\n`)
    }
    return stringedData.replaceAll("'}", "'\n}").replaceAll('"}', '"\n}').replaceAll('\n\n', '\n');
};

export default jsonLineSpliter;