import Canvas from './components/Canvas/Canvas'
import Toolbar from './components/Toolbar/Toolbar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Canvas />
    </div>
  )
}

export default App