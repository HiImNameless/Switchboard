import type { ServiceButtonProps } from "../models/interfaces";

export function ServiceSidebarButton({name, isActive, onSelect}: ServiceButtonProps){
    // Uses the onSelect function defined in the parent method to set the id of activeService inside ServicesPage
    return  <div className="service_button_container">
                <button className={isActive ? 'active' : ''} onClick={onSelect}> 
                    {name}
                </button>
            </div>
}