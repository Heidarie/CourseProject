import { Row } from "react-bootstrap";
import "./SchoolingMenu.css";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTrainings, getCurrentUser, deleteTraining } from "../../api/Api";
import Modal from "react-modal";

const SchoolingMenu = (props) => {
  const [loading, setLoading] = useState(true);
  const [Trainings, setTrainings] = useState();
  const user = getCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {
    getTrainings().then(res => {
      if (res.status === 200) {
        setTrainings(res.data)
        setLoading(false);
      }
    }).catch(err => {
      if (err.response.status === 500) {
        props.history("/Login", { replace: true })
      }
    })
  }, [])

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function delTraining(id) {
    deleteTraining(id).then(res => {
      if (res.status === 204) {
        window.location.reload(false);
      }
    })
  }
  return (
    loading ? (<div style={{ textAlign: "center" }}>Loading ...</div>) : (
      <div>
        <h2><p className="sTitle">Szkolenia</p></h2>
        <div className="SchoolingBox">
          {Trainings.map((x, i) => {

            return (
              <Row key={x.id}>
                <Col sm>
                  {user.includes("Teacher") ? (
                    <Button variant="danger" onClick={(e) => {
                      e.stopPropagation();
                      setId(x); setIsOpen(true)
                    }}
                      className="DeleteButton">Usuń</Button>) : (null)}
                  <Link className="SchoolingLink" to={"/SchoolingCalendar/" + x.id}>
                    <div className="Schooling">
                      <span className="SchoolingName">{x.title}</span>
                      <p className="instructor">Prowadzący: {x.author}</p>
                      <div className="desc">Opis: {x.description}</div>
                    </div>
                  </Link>
                </Col>
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
                      width: '20rem',
                      maxWidth: 'calc(100vw - 2rem)',
                      minHeight: '100px',
                      maxHeight: 'calc(100vh - 2rem)',
                      overflowY: 'auto',
                      position: 'relative',
                      border: '1px solid #ccc',
                      borderRadius: '0.3rem',
                    }
                  }}
                  contentLabel="My dialog"
                >
                  <div style={{ textAlign: "center" }}>Usunąć szkolenie - {id.title} ? </div>
                  <Button variant="secondary" style={{ marginLeft: "10%" }} onClick={toggleModal}>Anuluj</Button>
                  <Button variant="danger" style={{ marginLeft: "30%" }} onClick={() => { delTraining(id.id) }}>Usuń</Button>
                </Modal>
              </Row>
            )
          })}



        </div>
      </div>
    ))
}

export default SchoolingMenu