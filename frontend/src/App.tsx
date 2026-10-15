import './App.css'
import {SideBar} from './components/Navigation.tsx';
import {TopNavbar} from './components/Navigation.tsx';

function App() {

  const services = [
    {id: "cockpit", name: "Cockpit"},
    {id: "dockge", name: "Dockge"},
    {id: "adguard-home", name: "Adguard Home"},
  ];

return (
    <>
      <section id="center">
        {/* <TopNavbar/> */}
        <SideBar services={services}/>
        <div className="container">
          <main className="content">
            <h1>Switchboard</h1>

            <p>
              Switchboard is a  modular central hub application for connecting different <br/>
              systems and hosted services to the same interface for easy access as well as integrating them to work together.
            </p>
          </main>
          
        </div>
      </section>
    </>
  )
}

export default App
