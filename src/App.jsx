
import './App.css'
import Routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#011A0B',
            color: '#fff',
            border: '1px solid #28BF4E4D',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#21B546',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ff6b6b',
            },
          },
        }}
      />
    </>
  )
}

export default App

