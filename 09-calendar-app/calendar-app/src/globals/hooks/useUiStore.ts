import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { shouldOpenModal } from "../../store/ui/UiSlice";

export const useUiStore = () =>{
    const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen)
    const dispatch = useDispatch();

    const openModal = () =>{
        dispatch(shouldOpenModal(true))
    }

    const closeModal = () =>{
        dispatch(shouldOpenModal(false))
    }

    return {
        isModalOpen,
        openModal,
        closeModal
    }
}