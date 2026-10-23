    
import { useEffect, useState } from 'react';
import { ServiceSideBar } from '../components/Navigation';
import ServiceContent from '../components/Content';
import type {Service} from '../models/interfaces';

export async function GetServicesList(): Promise<Service[]> { 
    const servicesUrl = "/api/services";

    const response = await fetch(servicesUrl); // Sends a request and awaits a response from the server
        
    if(!response.ok){   // Checks the status code of the request sent above, throws an error if response is not ok
        throw new Error(`Response status: ${response.status}`);
    }

    const servicesList = await response.json(); // Reads the contents of the response body
    return servicesList; 
}

export default function ServicesPage(){
    const [retrievalStatus, setRetrievalStatus] = useState
    <
        "loading" | 
        "success" | 
        "error"   |
        "empty"
    >
    ("loading");

    const [services, setServices] = useState<Service[]>([]);    // Creates an empty array for the services to be stored in
    const [activeService, setActiveService] = useState(() => {  // Retrieves and sets the last selected service from browser storage
            return localStorage.getItem('activeServiceId');
        });

    useEffect(() => { 
        async function loadData() {
            setRetrievalStatus("loading"); // Ensure retrievalStatus is set to loading before loading services
            
            try{
                const data = await GetServicesList();

                setServices(data);
            
                if (data.length === 0){ // Sets retrieval status to empty when the array is empty and returns
                    setRetrievalStatus("empty");
                    return
                }
                
                if(!data.some(s => s.id === activeService)) // Sets the active service to the first item in the data array if the active service no longer exists in the data array
                {
                    setActiveService(data[0].id);
                } 
            } catch (error) {
                console.log("Caught Error");
                setRetrievalStatus("error");
                return
            }
  
            setRetrievalStatus("success");  // Set retrievalStatus to success after retrieving services

        }
        loadData();
    }, []); // Runs once after first page render

    useEffect(() => {   // Sets the activeServiceId to the Active Service in browser storage
        if (activeService){
            localStorage.setItem('activeServiceId', activeService);
        }
    }, [activeService]);    // Runs every time activeService variable changes (After first page render)
    
    const currentService = services.find(s => s.id === activeService) // finds the first object in services that matches the activeService's id

    return  <>
                <ServiceSideBar 
                services={services} 
                activeService={activeService ?? ""} 
                setActiveService={setActiveService}
                />
                
                <section className='service_section'>
                    <div className='service_container'>
                        <h1>Switchboard</h1>

                        {retrievalStatus === "loading" ? (  // Sets content while loading services
                            <p>Loading Services</p>
                        ) : retrievalStatus === "error" ? (
                            <p>An error has occurred</p>
                        ) : retrievalStatus === "empty" ? (
                            <p>No services could be retrieved...</p>
                        ) : currentService ? (
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
