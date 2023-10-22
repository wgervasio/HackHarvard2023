import { AppDataSource } from "./db";
import { Data } from "./models/Data";
export const dataRepository = AppDataSource.getRepository(Data);
