  import './App.css'
import Index from './Pages/Index'
import  { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Index />
      <Toaster position='top-center'/>
    </>
  )
}

export default App