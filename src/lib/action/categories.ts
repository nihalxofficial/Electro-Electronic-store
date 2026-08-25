import { Category } from "@/types"
import { serverMutation } from "../core/server"

export const addCategory = async(data: Category)=>{
    return serverMutation(`/categories`, data)
}