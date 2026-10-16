import type { ServiceItemProps } from "../models/interfaces";
import type { ServiceListProps } from "../models/interfaces";
import {ServiceSidebarButton} from "./Interaction";

export function DisplayServiceItem({name}: ServiceItemProps){
    return name
}

export  function ListServiceItem({ id, name, activeService, setActiveService }: ServiceItemProps) {
    return  <li className="service_li">
                <ServiceSidebarButton id={id} name={name} activeService={activeService} setActiveService={setActiveService}/>
            </li>
};

export function DisplayServiceList({services, activeService, setActiveService}: ServiceListProps){
    
    return (
        <div>
            <ul>
                {services.map((service) => (
                    <ListServiceItem 
                        key={service.id} 
                        id={service.id}
                        name={service.name} 
                        activeService={activeService} 
                        setActiveService={setActiveService}
                    />
                ))}
            </ul>
        </div>
    );
};

export function DisplayServiceScreen({name}: ServiceItemProps){
    return <p>{name}</p>
}

