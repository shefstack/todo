import { nanoid } from "nanoid";
import { TodoType
 } from "./todoType";

export const todoList:TodoType[]=[{
id:nanoid(8),
todoItem:"Learn Next.js",
completed:false
 }]