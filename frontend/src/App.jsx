
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import UserProfile from './pages/User/UserProfile'
import AdminDashBoard from './pages/adminDashboard/AdminDashBoard'
import AddCandidate from './pages/adminDashboard/AddCandidate'
import UpdateCandidate from './pages/adminDashboard/UpdateCandidate'
import DeleteCandidate from './pages/adminDashboard/DeleteCandidate'
import ChangePassword from './pages/User/ChangePassword'
import Vote from './components/Vote'
import VoteCount from './pages/voteCount'

function App() {
  return (
 <>
 <Routes>
    <Route path='/' element={<Home/>}></Route>
  <Route path='/auth/signup' element={<Signup/>}></Route>
  <Route path='/auth/login' element={<Login/>}></Route>
    <Route path='/profile' element={<UserProfile/>}></Route>
      <Route path='/auth/profile/password' element={<ChangePassword/>}></Route>
    <Route path='/admin' element={<AdminDashBoard/>}></Route>
    <Route path='/admin/add' element={<AddCandidate/>}></Route>
    <Route path='/admin/update/:CandidateID' element={<UpdateCandidate/>}></Route>
    <Route path='/admin/delete/:CandidateID' element={<DeleteCandidate/>}></Route>
    <Route path='/voting/vote/:CandidateID' element={<Vote/>}></Route>
    <Route path='/voting/count' element={<VoteCount/>}></Route>
    

 </Routes>
 </>
  )
}

export default App
