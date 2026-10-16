import type { Service } from "../models/interfaces"

export default function ServiceContent({id, name}: Service){
    return <p>id: {id} | {name}</p>
}