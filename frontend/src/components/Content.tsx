import type { Service } from "../models/interfaces"

export default function ServiceContent({name, url}: Service){
    return <iframe src={url} title={name} width="100%" height="100%"></iframe>
}