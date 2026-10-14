import type { ServiceItemProps } from "../models/interfaces";
import type { ServiceListProps } from "../models/interfaces";

export  function ListServiceItem({ name }: ServiceItemProps) {
    return  <li className="service_li"><button className="service_li_button">{name}</button></li>
};

export function DisplayServiceList({services}: ServiceListProps){
    
    return (
        <div>
            <ul>
                {services.map((service) => (
                    <ListServiceItem key={service.id} name={service.name}/>
                ))}
            </ul>
        </div>
    );
};

