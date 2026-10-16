import { useState } from 'react'
import './App.css'
import { TopNavbar } from './components/Navigation'
import DashboardPage from './pages/Dashboard'
import ServicesPage from './pages/Services'

function App() {

const [activePage, setActivePage] = useState('dashboard')

const renderPage = () => {
  switch (activePage) {
    case 'dashboard':
      return <DashboardPage/>;
    case 'services':
      return <ServicesPage/>
  }
}

return (
    <>
      <TopNavbar activePage={activePage} setActivePage={setActivePage}/>
    
      <section>
        <div className='container'>
          <main className='content'>
            {renderPage()}
          </main>
        </div>
      </section>
    </>
  )
}

export default App