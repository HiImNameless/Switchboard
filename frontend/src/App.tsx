import './App.css'
import ServiceItem from './components/ServiceItem.tsx';

class Service{
  name: string;
  id: string;

  constructor(name: string, id: string){
    this.name = name;
    this.id = id;
  }
}

function App() {
  const cockpit = new Service("Cockpit ", "cockpit");
  const dockge = new Service("Dockge ", "dockge");
  const adguard_home = new Service("Adguard Home ", "adguard-home");

  const serviceItems: string[] = [cockpit.name, dockge.name, adguard_home.name];
  return (
    <>
      <section id="center">
        <div>
          <h1>Switchboard</h1>
          <p>
            Switchboard is a  modular central hub application for connecting different <br/>
            systems and hosted services to the same interface for easy access as well as integrating them to work together.
          </p>

          <ServiceItem name={serviceItems.map(string => string)}/> 
        </div>
      </section>
    </>
  )
}

export default App
