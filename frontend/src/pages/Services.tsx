    
import { useEffect, useState } from 'react';
import { ServiceSideBar } from '../components/Navigation';
import ServiceContent from '../components/Content';

export default function ServicesPage(){
    
    const services = [
        {id: "cockpit", name: "Cockpit"},
        {id: "dockge", name: "Dockge"},
        {id: "adguard-home", name: "Adguard Home"},
    ];

    const [activeService, setActiveService] = useState(() => {  // Retrieves the last selected service
            const saved = localStorage.getItem('activeServiceId');
            return saved ? saved : services[0].id;
        });

    useEffect(() => {   // Saves the selected service
        localStorage.setItem('activeServiceId', activeService);
    }, [activeService]);
    
    const currentService = services.find(s => s.id === activeService) // finds the first object in services that matches the activeService's id

    return <>
                <ServiceSideBar services={services} activeService={activeService} setActiveService={setActiveService}/>
                
                <section className='service_section'>
                    <div className='service_container'>
                        <h1>Switchboard</h1>

                        {currentService ? (
                            <ServiceContent id={currentService.id} name={currentService.name}/>
                        ) : (
                            <p>Service not found</p>
                        )}
                    </div>
                </section>
        </>
}
