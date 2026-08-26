import { serverFetch } from "../core/server"

export const getCategories = async()=>{
    return serverFetch(`/categories`)
}