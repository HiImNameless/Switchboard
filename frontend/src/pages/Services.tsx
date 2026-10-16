    
import { useEffect, useState } from 'react';
import { ServiceSideBar } from '../components/Navigation';
import ServiceContent from '../components/Content';

export default function ServicesPage(){
    
    const services = [
        {id: "cockpit", name: "Cockpit"},
        {id: "dockge", name: "Dockge"},
        {id: "adguard-home", name: "Adguard Home"},
    ];

    const [activeService, setActiveService] = useState(() => {
            const saved = localStorage.getItem('activeServiceId');
            return saved ? saved : 'cockpit';
        });

    useEffect(() => {
        localStorage.setItem('activeServiceId', activeService);
    }, [activeService]);
    
    const currentService = services.find(s => s.id === activeService) // finds the first object in services that matches the activeService's id

    return <>
            <section>
                <ServiceSideBar services={services} activeService={activeService} setActiveService={setActiveService}/>

                <h1>Switchboard</h1>

                {currentService ? (
                    <ServiceContent id={currentService.id} name={currentService.name}/>
                ) : (
                    <p>Service not found</p>
                )}
            </section>
        </>
}
