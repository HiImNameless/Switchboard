import { useEffect, useState } from 'react'

import './App.css'

import { TopNavbar } from './components/Navigation'

import DashboardPage from './pages/Dashboard'
import ServicesPage from './pages/Services'

function App() {

const [activePage, setActivePage] = useState(() => {
  const saved = localStorage.getItem('activePageId');
  return saved ? saved : 'dashboard';
})

useEffect(() => {
  localStorage.setItem('activePageId', activePage);
}, [activePage]);

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
        <div className='app_container'>
          <main className='app_main'>
            {renderPage()}
          </main>
        </div>
      </section>
    </>
  )
}

export default App