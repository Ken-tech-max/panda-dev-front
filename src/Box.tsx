import { CSSProperties, FC, memo } from 'react'
import { useDrag } from 'react-dnd'

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export interface BoxProps {
  name: string
  type: string,
  isDropped: boolean,
  img: string
}

export const Box1: FC<BoxProps> = memo(function Box({ name, type, isDropped, img }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, img },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  )

  return (
    <div ref={drag} role="Box" style={{ ...style, opacity, padding: "10px",  height: '12rem', width: '12rem' }}>
	  <img src={img} style={{height:'100%', width:'100%'}} />
	  {isDropped ? <s>{name}</s> : name}
    </div>
  )
})
