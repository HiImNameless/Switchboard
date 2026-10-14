export interface Service{
    id: string;
    name: string;
}

export interface ServiceItemProps{
    name: string;
}

export interface ServiceListProps{
    services: Service[];
}