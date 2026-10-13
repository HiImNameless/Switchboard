import './App.css'
import ServiceItem from './components/Services.tsx';
import ListServiceItems from './components/Services.tsx';

function App() {

  const services = [
    {id: "cockpit", name: "Cockpit"},
    {id: "dockge", name: "Dockge"},
    {id: "adguard-home", name: "Adguard Home"},
  ];

return (
    <>
      <section id="center">
        <div>
          <h1>Switchboard</h1>
          <p>
            Switchboard is a  modular central hub application for connecting different <br/>
            systems and hosted services to the same interface for easy access as well as integrating them to work together.
          </p>
          <ListServiceItems services={services} /> 
        </div>
      </section>
    </>
  )
}

export default App
