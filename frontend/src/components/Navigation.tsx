import { DisplayServiceList } from "./Services"
import type { ServiceListProps } from "../models/interfaces"

export function SideBar({services}: ServiceListProps){
    return  <aside className="sidebar">
                <nav>
                <DisplayServiceList services={services}/> 
                </nav>
            </aside>
}

export default function TopNavbar(){
    <nav className="navbar">

    </nav>
}