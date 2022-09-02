import React from 'react'
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {createTicket, reset} from "../features/tickets/ticketSlice"
import BackButton from '../components/BackButton'

function NewTicket() {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)

    const [product, setProduct] = useState("iphone")
    const [description, setDescription] = useState("")
    const [name] = useState(user.name)
    const [email] = useState(user.email)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate("/tickets")
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product, description}))
    }

  return (
    <>
    <BackButton url="/" />
    <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill out the form</p>
    </section>

    <section className='form'>
        <div className='form-group'>
            <label htmlFor="name">Customer name</label>
            <input type="text" className='form-control' value={name} disabled />
        </div>

        <div className='form-group'>
            <label htmlFor="name">Customer email</label>
            <input type="text" className='form-control' value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
            <div className='form-group'>
            <label htmlFor="product">Product</label>
            <select 
                name="product" 
                id="product" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}>
                    <option value="iphone">iPhone</option>
                    <option value="macbook">Macbook</option>
                    <option value="ipad">iPad</option>
                    <option value="imac">iMac</option>
                </select>

                <div className="form-group">
                    <label htmlFor="description">Description of the issue</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className='form-control'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>


                <div className='form-group'>
                    <button className='btn btn-block'>Submit</button>

                </div>

                </div>
        </form>


    </section>



    </>
  )
}

export default NewTicket