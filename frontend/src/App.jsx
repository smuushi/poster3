import viteLogo from '/vite.svg'
import './App.css'
import PosterForm from './components/PosterForm'

function App() {

  return (
    <>
      <h1>PosterMi</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        {PosterForm()}
      </div>
    </>
  )
}

export default App
