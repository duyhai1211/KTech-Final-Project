import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material"
import "./Calendar.scss"
import Note from './Note';
import { IoSearch } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

dayjs.locale('ko');

const Calendar = () => {
    const [role, setRole] = useState('')
    const [newValue, setValue] = useState(dayjs())
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState("")
    const [noteList, setNoteList] = useState([
        { noteDate: "2024-10-01", noteContent: "1st note" },
        { noteDate: "2024-10-02", noteContent: "2nd note" },
    ]);
    const [view, setView] = useState('day');
    const [chooseDate, setChooseDate] = useState('')
    const handleAddEvent = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setView('day'); // Reset view to day
    };

    const handleSubmit = () => {
        if (note.trim()) {
            const newNote = {
                noteDate: newValue.format('YYYY-MM-DD'),
                noteContent: note
            };
            setNoteList(prev => [...prev, newNote]);
            setNote("");
            setShowModal(false);

        } else {
            alert("내용을 입력해주세요.");
        }
    };
    const handleDateChange = (newDate) => {
        if (newDate) {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
            setChooseDate(formattedDate);
        } else {
            setChooseDate("");
        }
    };

    const handleReset = () => {
        setChooseDate("");
    };
    return (

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
        >
            <Row >
                <Col className="d-flex align-items-baseline justify-content-center">
                    <DateTimePicker
                        label='Choose Date Time'
                        className='mb-3'
                        value={chooseDate ? dayjs(chooseDate) : null}
                        onChange={handleDateChange}
                        renderInput={(params) => <input {...params} />}
                    />
                    <Button className="btn-link p-0 ms-2" style={{ background: 'none', border: 'none' }}>
                        <IoSearch size={30} />
                    </Button>
                    <Button className="btn-link p-0 ms-2" style={{ background: 'none', border: 'none' }}
                        onClick={handleReset}
                    >
                        <GrPowerReset size={30} />
                    </Button>
                </Col>
            </Row>
            {
                chooseDate !== "" &&
                <Row>
                    <p >Reservation on date: {chooseDate} </p>
                </Row>
            }



            <div>
                {
                    role === 'customer' &&
                    <Col className='note-container '>
                        <Note
                            noteList={noteList}
                            setNoteList={setNoteList}
                            newValue={newValue}
                            note={note}
                            setNote={setNote}
                        />
                    </Col>
                }



                <Modal show={showModal} onHide={handleClose} style={{ minHeight: '300px' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{newValue.format('YYYY년 MM월 DD일')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ minHeight: '200px' }}>
                        <TextField
                            label="내용을 입력해주세요"
                            fullWidth
                            multiline
                            value={note} type="text"
                            onChange={e => setNote(e.target.value)}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { handleSubmit() }}>추가</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </LocalizationProvider>
    )
}
export default Calendar