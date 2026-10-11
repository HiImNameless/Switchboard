import './App.css'
import ServiceItem from './components/ServiceItem.tsx';

function App() {
  const serviceItems: string[] = ["Cockpit", "Dockge", "Adguard Home"];
  return (
    <>
      <section id="center">
        <div>
          <h1>Switchboard</h1>
          <p>
            Switchboard is a  modular central hub application for connecting different <br/>
            systems and hosted services to the same interface for easy access as well as integrating them to work together.
          </p>
          <br/>
          <ServiceItem name={serviceItems.map(string => string)}/> 
        </div>
      </section>
    </>
  )
}

export default App
