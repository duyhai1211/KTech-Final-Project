import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
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
dayjs.locale('ko');

const Calendar = () => {

    const [newValue, setValue] = useState(dayjs())
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState("")
    const [noteList, setNoteList] = useState([
        { noteDate: "2024-10-01", noteContent: "1st note" },
        { noteDate: "2024-10-02", noteContent: "2nd note" },
    ]);
    const [view, setView] = useState('day');

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

    return (

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
        >
            <div className="container">
                <Row className='g-4'>
                    <Col className='calendar-container border bg-body '>
                        <StaticDatePicker
                            orientation='portrait'
                            openTo={view}
                            value={newValue}
                            onViewChange={(newView) => setView(newView)}
                            onChange={(newValue) => setValue(newValue)}
                            renderInput={(params) => <input {...params} />}
                            locale={ko}
                            views={['year', 'month', 'day']}
                            format='MM월 DD일'
                            localeText={{
                                toolbarTitle: '날짜 선택',
                                cancelButtonLabel: '취소',
                                todayButtonLabel: '오늘',
                                okButtonLabel: '추가',
                            }}
                            slotProps={{
                                actionBar: {
                                    actions: ['today', 'cancel', 'accept'],
                                    onAccept: handleAddEvent,
                                    onCancel: handleCancel,

                                },
                            }}
                            disablePast
                        />
                    </Col>

                    <Col className='note-container '>
                        <Note
                            noteList={noteList}
                            setNoteList={setNoteList}
                            newValue={newValue}
                            note={note}
                            setNote={setNote}
                        />
                    </Col>
                </Row>

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