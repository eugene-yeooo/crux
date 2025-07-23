import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import NavLog from './components/forms/NavLog'
import CaveLogNew from './components/forms/CaveLogNew'
import UserProfilePage from './components/profile page/UserProfilePage'
import Dashboard from './components/Dashboard'
import Explore from './components/Explore'
import LogPage from './components/log page/LogPage'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/utilities/ProtectedRoute'
import CaveLogEdit from './components/forms/CaveLogEdit'
import ClimbLogNew from './components/forms/ClimbLogNew'


const routes = createRoutesFromElements(
 <>

  <Route path="login" element={<LoginPage />} />
  
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />
    
    <Route path="log-nav" element={<ProtectedRoute><NavLog /></ProtectedRoute>} />
    <Route path="log-nav/log-cave" element={<ProtectedRoute><CaveLogNew /></ProtectedRoute>} />
    <Route path="log-nav/log-climb" element={<ProtectedRoute><ClimbLogNew /></ProtectedRoute>} />

      {/* <Route path="log-climb" element={<LogClimb />} />
      <Route path="log-canyon" element={<LogCanyon />} />
      <Route path="log-dive" element={<LogDive />} /> */}

    {/* User profile with dynamic username param */}
    <Route path="user/:username" element={<UserProfilePage />} />
        <Route path="user/:username/log/:logId" element={<LogPage />} />
        <Route path="user/:username/log/:logId/edit" element={<CaveLogEdit />} />
        {/* will need conditional for log type */}
    
    {/* <Route path='edit/:logId' element={<EditLog />} /> */}
    
    <Route path='explore' element={<Explore />} />

  </Route>

  </> 
)

const router = createBrowserRouter(routes)

export default router