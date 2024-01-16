import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import WelcomePage from './Pages/WelcomePage'
import AdminUserDetail from './Pages/Admin/AdminUserDetail'
import Adminlogin from './Pages/Admin/Adminlogin'

function App() {
 
  return (
    <>
    <Router >
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Login /> } />
        <Route path='/home' element={<WelcomePage />} />
        <Route path='/admin' element={<Adminlogin />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
