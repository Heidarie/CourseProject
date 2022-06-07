import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SchoolingCalendar.css";
import Modal from "react-modal";
import { Button } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { getEvents, getRegistration, signO, signUp } from "../../api/Api"


Modal.setAppElement("#root");

const locales = {
    "en-US": require("date-fns/locale/pl"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function SchoolingCalendar(props) {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [e, setE] = useState();
    const [events, setEvents] = useState();
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(true);
    let { id } = useParams();

    const event = [{
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 5, 5),
        end: new Date(2022, 5, 5),
    }
    ]


    function addHours(numOfHours, date = new Date()) {
        const dateCopy = new Date(date.getTime());

        dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000);

        return dateCopy;
    }

    useEffect(() => {
        getEvents(id).then(res => {
            var Trainings = []
            if (res.status === 200) {
                res.data.trainingDetails.map(x => {
                    var split = x.eventDateTime.split("-")
                    split[1] = split[1] - 1;
                    var day = split[2].split("T")
                    let h = day[1].split(":")
                    let d = new Date(split[0], split[1], day[0], h[0], h[1], h[2])
                    let endD = d;
                    endD = addHours(2, endD)




                    Trainings.push({
                        title: res.data.title,

                        start: d,
                        end: endD,
                        participantsRegistered: x.participantsRegistered,
                        participantsLimit: x.participantsLimit,
                        id: x.id
                    })
                })


                setEvents(Trainings)
                setLoading(false);
            }
        }).catch(err => {
            if (err.response.status === 403) {
                props.history("/Payment", { replace: true })
            }
        })
    }, [])

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function signIn(id) {
        signUp(id).then(res => {
            toggleModal()
        })
    }
    function signOut(id) {
        signO(id).then(res => {
            toggleModal()
        })
    }
    return (
        loading ? (<div style={{ textAlign: "center" }}>Loading ...</div>) : (
            <div className="SchoolingCalendar">

                <h1>Calendar</h1>

                {isOpen ? (null) : <div><Calendar onSelectEvent={(event) => {
                    getRegistration(id + "?detailsId=" + event.id).then(res => { setRegistered(res.data.registered) })
                    setE(event); setIsOpen(true)
                }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} /></div>}


                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    style={{
                        overlay: {
                            position: 'fixed',
                            zIndex: 1020,
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(255, 255, 255, 0.75)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        content: {
                            background: 'white',
                            width: '45rem',
                            maxWidth: 'calc(100vw - 2rem)',
                            minHeight: '300px',
                            maxHeight: 'calc(100vh - 2rem)',
                            overflowY: 'auto',
                            position: 'relative',
                            border: '1px solid #ccc',
                            borderRadius: '0.3rem',
                        }
                    }}
                    contentLabel="My dialog"
                >
                    <div><h1 style={{ textAlign: "center" }}>{e?.title}</h1>
                        <p style={{ textAlign: "center" }}><h2>Miejsca: {e?.participantsRegistered}/{e?.participantsLimit}</h2></p></div>
                    <div style={{ textAlign: "center" }}> <Button variant="danger" onClick={toggleModal}>Zamknij</Button>
                        {registered ? (<span><Button onClick={() => {
                            signOut(e.id)
                        }}>Wypisz się</Button></span>) : (<span><Button onClick={() => {
                            signIn(e.id)
                        }}>Zapisz się</Button></span>)}</div>
                </Modal>
            </div>
        ))
}

export default SchoolingCalendar;
