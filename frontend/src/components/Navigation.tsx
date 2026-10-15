import { DisplayServiceList } from "./Services"
import type { ServiceListProps } from "../models/interfaces"

export function SideBar({services}: ServiceListProps){
    return  <aside className="sidebar">
                <nav>
                <DisplayServiceList services={services}/> 
                </nav>
            </aside>
}

export function TopNavbar(){
    return  <nav className="topnav">
                <a className="active" href="#home">Home</a>
                <a href="#dash">Dashboard</a>
            </nav>
}