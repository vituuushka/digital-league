import { PiPaintBrushBold } from 'react-icons/pi'
import { BsEraser } from 'react-icons/bs'
import { useDrawStore } from '../../store/useDrawStore'
import './Toolbar.css'

const Toolbar = () => {
  const { mode, setMode } = useDrawStore()

  return (
    <div className="toolbar">
      <button
        onClick={() => setMode('brush')}
        className={mode === 'brush' ? 'active' : ''}
      >
        <PiPaintBrushBold size={20} />
        Кисть
      </button>
      <button
        onClick={() => setMode('eraser')}
        className={mode === 'eraser' ? 'active' : ''}
      >
        <BsEraser size={20} />
        Ластик
      </button>
    </div>
  )
}

export default Toolbar