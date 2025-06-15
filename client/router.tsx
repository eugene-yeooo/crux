import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router'

import App from './components/App'
import NavLog from './components/forms/NavLog'
import LogCave from './components/forms/LogCave'
import UserProfilePage from './components/profile page/UserProfilePage'
import Dashboard from './components/Dashboard'
import Explore from './components/Explore'
import LogPage from './components/LogPage'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />
    <Route path="log-nav" element={<NavLog />} />
      <Route path="log-nav/log-cave" element={<LogCave />} />
      {/* <Route path="log-climb" element={<LogClimb />} />
      <Route path="log-canyon" element={<LogCanyon />} />
      <Route path="log-dive" element={<LogDive />} /> */}
    

    {/* User profile with dynamic username param */}
    <Route path="user/:username" element={<UserProfilePage />} />
        <Route path="user/:username/log/:logId" element={<LogPage log={undefined} />} />


    <Route path='explore' element={<Explore />} />
  </Route>
)

const router = createBrowserRouter(routes)

export default router