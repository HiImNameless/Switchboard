    
import { useEffect, useState } from 'react';
import { ServiceSideBar } from '../components/Navigation';
import ServiceContent from '../components/Content';
import type {Service} from '../models/interfaces';

export async function GetServicesList(): Promise<Service[]> { 
    const servicesUrl = "http://127.0.0.1:8000/api/services";

    try{
        const response = await fetch(servicesUrl);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const servicesList = await response.json();
        return servicesList;
    }catch (error) {

        console.error("error.message");
        return [];
    }
}

export default function ServicesPage(){

    // const services = [
    //     {id: "cockpit", name: "Cockpit"},
    //     {id: "dockge", name: "Dockge"},
    //     {id: "adguard-home", name: "Adguard Home"},
    // ];

    const [services, setServices] = useState<Service[]>([]);

    const [activeService, setActiveService] = useState(() => {  // Retrieves the last selected service
            return localStorage.getItem('activeServiceId');
        });

    useEffect(() => {   // Saves the selected service
        async function loadData() {
            const data = await GetServicesList();
            setServices(data);

            if(!localStorage.getItem('activeServiceId') && data.length > 0) {
                setActiveService(data[0].id);
            }
        }
        loadData();
    }, []);
    
    const currentService = services.find(s => s.id === activeService) // finds the first object in services that matches the activeService's id

    return <>
                <ServiceSideBar 
                services={services} 
                activeService={activeService ?? ""} 
                setActiveService={setActiveService}
                />
                
                <section className='service_section'>
                    <div className='service_container'>
                        <h1>Switchboard</h1>

                        {currentService ? (
                            <ServiceContent 
                            id={currentService.id} 
                            name={currentService.name} 
                            url={currentService.url}
                            />
                        ) : (
                            <p>Service not found</p>
                        )}
                    </div>
                </section>
        </>
}
