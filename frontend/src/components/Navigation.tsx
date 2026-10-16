import { DisplayServiceList } from "./Services"
import type { ServiceListProps } from "../models/interfaces"
import type { ActivePage } from "../models/interfaces"

export function ServiceSideBar({services, activeService, setActiveService}: ServiceListProps){
    return  <aside className="sidebar">
                <nav>
                    <DisplayServiceList services={services} activeService={activeService} setActiveService={setActiveService}/> 
                </nav>
            </aside>
}

export function TopNavbar({activePage, setActivePage}: ActivePage){
    return  <header>
                <nav className="topnav">
                    <button className={
                            activePage === 'dashboard' ? 'active' : ''
                        } 
                            onClick={
                                () => setActivePage('dashboard')
                        }>
                        Dashboard
                    </button>
                    <button className=  
                    {
                            activePage === 'services' ? 'active' : ''
                        } 
                            onClick={
                                () => setActivePage('services')
                        }>
                        Services
                    </button>
                </nav>
            </header>
}