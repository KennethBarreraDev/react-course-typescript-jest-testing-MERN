import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import '../../styles/modal.css'
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from "../../globals/hooks/useUiStore";
import { useCalendarStore } from "../../globals/hooks/useCalendarStore";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
type FormTypes = {
    title: string,
    notes: string,
    start: Date,
    end: Date
}

//ReactModal.setAppElement('#root');

export const CalendarModal = () => {
    const { isModalOpen, closeModal } = useUiStore()

    const { activeEvent, onModifyNote } = useCalendarStore()

    const [formValue, setFormValue] = useState<FormTypes>({
        title: 'Kenneth',
        notes: 'Barrera',
        start: new Date(),
        end: addHours(new Date(), 1)
    })

    useEffect(() => {
        setFormValue({
            title: activeEvent?.title ?? '',
            notes: activeEvent?.notes ?? '',
            start: activeEvent?.start ?? new Date(),
            end: activeEvent?.end ?? new Date(),
        })

    }, [activeEvent])


    const onInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormValue({
            ...formValue,
            [inputName]: inputValue
        })
    }

    const onDateChanged = (event: Date, changing: 'start' | 'end') => {
        setFormValue(
            {
                ...formValue,
                [changing]: event
            }
        )
    }

    const onNoteModified = ()=>{
        onModifyNote({...activeEvent!, title: formValue.title, notes: formValue.notes, start: formValue.start, end: formValue.end});
        closeModal()
    }

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const rangeDifference = differenceInSeconds(formValue.end, formValue.start);

        if (Number(rangeDifference) < 0) {
            Swal.fire('Wrong dates', 'Please select a valid range of dates', 'error')
            return;
        }

        if (formValue.title.length == 0) {
            Swal.fire('Empty title', 'Please write a valid title', 'error')
            return;
        }

        console.log(formValue);

    }


    return (
        <>
            <ReactModal
                isOpen={isModalOpen}
                onAfterOpen={() => { }}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className='modal'
                overlayClassName='background-modal'
                closeTimeoutMS={200}
            >
                <h1> New event </h1>
                <hr />
                <form className="container" onSubmit={(event) => onSubmitForm(event)}>

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={formValue.start}
                            className="form-control"
                            onChange={(event) => onDateChanged(event!, 'start')}
                            dateFormatCalendar="Pp"
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                        />

                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <DatePicker
                            minDate={formValue.start}
                            selected={formValue.end}
                            className="form-control"
                            onChange={(event) => onDateChanged(event!, 'end')}
                            dateFormatCalendar="Pp"
                            showTimeSelect
                            locale='es'
                            timeCaption="Hora"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            value={formValue.title}
                            type="text"
                            className="form-control"
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            onChange={(event) => onInputChange(event)}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            value={formValue.notes}
                            className="form-control"
                            placeholder="Notes"
                            rows={5}
                            name="notes"
                            onChange={(event) => onInputChange(event)}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={()=>{
                            onNoteModified()
                        }}
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </ReactModal>
        </>
    )
}


