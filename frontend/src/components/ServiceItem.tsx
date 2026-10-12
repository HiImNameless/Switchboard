import React, { useState } from 'react';

function ServiceItem({ name }: {name: string[]}){
    const [services, setServices] = useState([
        {id: "cockpit", name: "Cockpit"},
        {id: "dockge", name: "Dockge"},
        {id: "adguard_home", name: "Adguard Home"},

    ]);
    
    return (
        <div>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        {service.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceItem;