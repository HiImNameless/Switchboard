import React, { useState } from 'react';

interface ServiceDetail{
    id: string;
    name: string;
}

interface ServiceList{
    services: ServiceDetail[];
}

function ServiceItem(name: string) {
    return <p>{ name }</p>;
};

function ListServiceItems({services}: ServiceList){
    
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
    );
};

export default ListServiceItems;