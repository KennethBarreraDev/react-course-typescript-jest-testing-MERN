import { useCalendarStore } from "../../globals/hooks/useCalendarStore"
import { useUiStore } from "../../globals/hooks/useUiStore"

export const FabAddNew = () => {
    const { openModal } = useUiStore()
    const { setNote } = useCalendarStore()

    const onClickButton = () => {
        setNote({
            id:0,
            title: '',
            notes: '',
            start: new Date(),
            end: new Date(),
            bgColor: '#fafafa',
            user: {
                id: '123',
            },
        },
        )

        openModal()
    }
    return (
        <button className="btn btn-primary fab" aria-label="fab-add-new" onClick={()=>onClickButton()}>
            <i className="fas fa-plus"></i>
        </button>
    )
}

