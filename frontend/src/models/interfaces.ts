export interface Service{
    id: string;
    name: string;
}

export interface ServiceItemProps{
    id: string;
    name: string;
    activeService: string;
    setActiveService: (component: string) => void;
}

export interface ServiceListProps{
    services: Service[];
    activeService: string;
    setActiveService: (component: string) => void;
}

export interface ServiceButtonProps{
    id: string;
    name: string;
    activeService: string;
    setActiveService: (component: string) => void;
}

export interface ActivePage{
    activePage: string;
    setActivePage: (component: string) => void;
}

export interface ActiveService{
    activeService: string;
    setActiveService: (component: string) => void;
}
