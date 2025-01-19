import React from "react"

type ButtomComponentProps={
    elements: number[]
}

export const ButtonComponent = React.memo(({elements}: ButtomComponentProps) => {

    const sortedElements = elements.sort();
    console.log('Renderizando boton');
    
  return (
    <div>ButtonComponent</div>
  )
})
