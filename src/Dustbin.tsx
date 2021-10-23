import { CSSProperties, FC, memo } from 'react'
import { useDrop } from 'react-dnd'

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '3rem',
  color: 'white',
  padding: '0.5rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  onDrop: (item: any) => void
  cancelFusion: (item: any) => void
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
  cancelFusion
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} role="Dustbin" style={{ ...style, backgroundColor, position:"relative" }}>
      {/* {isActive
        ? 'Release to drop'
        : `This dustbin accepts: ${accept.join(', ')}`} */}

      {lastDroppedItem && (
        <>
        <button style={{position: "absolute", right: "0rem", top:"0rem", padding: "3px 5px", borderRadius:"50%", background: "rgba(255, 255, 255)"}} onClick={cancelFusion}>X</button>
        <img style={{width:'100%', height:'100%'}} src={ lastDroppedItem.img } />
        <p>Last dropped: {lastDroppedItem.name}</p>
        </>
      )}
    </div>
  )
})
