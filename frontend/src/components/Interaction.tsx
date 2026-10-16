import type { ServiceButtonProps } from "../models/interfaces";

export function ServiceSidebarButton({id, name, activeService, setActiveService}: ServiceButtonProps){

    
    return  <div className="service_button_container">
                <button className={
                        activeService === id ? 'active' : ''
                    } 
                        onClick={() => setActiveService(id)
                    }>
                    {name}
                </button>
            </div>
}