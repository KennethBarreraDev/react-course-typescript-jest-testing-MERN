import { useEffect } from "react";

export const Message = () => {

    useEffect(() => {
        const onMouseMove = (event: MouseEvent)=>{
            console.log(event.clientX, event.clientY);
        }
       window.addEventListener('mousemove', onMouseMove)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
      }
    }, [])

    return (
        <>
        <h3>Username already in use</h3>
        </>
    )
}
