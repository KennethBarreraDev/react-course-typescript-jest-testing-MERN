import { useCalendarStore } from "../../globals/hooks/useCalendarStore"

export const FabDelete = () => {
    const {deleteEvent} = useCalendarStore()
    const handleDelete = ()=>{
        deleteEvent();
    }
    return (
        <button className="btn btn-danger fab-danger" aria-label="fab-delete" onClick={()=>handleDelete()}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}

