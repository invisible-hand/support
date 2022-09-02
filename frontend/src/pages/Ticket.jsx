import React from 'react'
import { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import Modal from "react-modal"
import {useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from 'react-router-dom'
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice'
import {getTicket, closeTicket} from "../features/tickets/ticketSlice"
import BackButton from "../components/BackButton"
import NoteItem from "../components/NoteItem"
import {FaPlus} from "react-icons/fa"

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "25%",
    position: "relative"
  }
}

Modal.setAppElement("#root")

function Ticket() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

    const {notes, isLoading: notesIsLoading} = useSelector(
      (state) => state.notes
      )

  //const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))

  }, [isError, message, ticketId])

  if (isError) {
    return <h3>Something is wrong</h3>
  }
  
  //close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket closed")
    navigate("/tickets")
  }

  // open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

 // create note submit
 const onNoteSubmit = (e) => {
  e.preventDefault()
  dispatch(createNote({noteText, ticketId}))
  closeModal()
 }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-us")}</h3>
        <h3>Product: {ticket.product} </h3> 
        <hr />
        <div className='ticket-desc'>
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2> Notes</h2>

      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className='btn'><FaPlus />Add Note</button>
      )}

      <Modal isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Add note"
              style={customStyles}>
                  <h2>Add Note</h2>
                  <button className='btn-close' onClick={closeModal}>X</button>
                  <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                      <textarea 
                        name="noteText"
                        id="noteText"
                        className='form-control'
                        placeholder='Note text'
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        autoFocus={true}>
                        </textarea>
                     
                    </div>
                    <div className='form-group'>
                      <button className='btn' type="submit">Submit</button>

                  </div>
                  </form>
              </Modal>

      {notes.map((note) => <NoteItem key={note._id} note={note} />)}
      

      {ticket.status !== "closed" && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close ticket</button>
        )}



    </div>
  )
}

export default Ticket