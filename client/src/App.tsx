import LoginPage from './Pages/LoginPage'
import {  Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
function App(){
  // const [count, setCount] = useState(0)

  return (
    <> 
   <Routes>
   <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
   </Routes>
      
     
   
    </>
  )
}

export default App
