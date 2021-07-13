import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
import Slot from './Slot'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  align-item : center;
  justify-content: center;
  border-color: red;
`;


function Pin() {

  const [pincode, setPin] = useState('')
  const [date, setDate] = useState('')
  const [center, setCenter] = useState([])
  const [selected, setSelected] = useState('')
  const [vaccine, setvaccine] = useState('')
  const [feeType, setfeeType] = useState('')
  const [isLoading, setisLoading] = useState(false);

  let current_date = moment().format('YYYY-MM-DD')

  let centreData = () => {

    let dat = moment(date).format('DD-MM-YYYY')
    let obj = {
      pincode: pincode,
      date: dat,
      age: selected,
      vaccine: vaccine,
      fee_type: feeType
    }
    setCenter([])
    if (pincode.trim() && date) {
      setisLoading(true)
      axios.post("http://13.235.242.157:5000/verify/pincode", { pincode: pincode })
        .then(res => {
          setisLoading(false)
          if (res.data.status === 'success') {
            axios.post("http://13.235.242.157:5000/sessions/pin", obj)
              .then(res => setCenter(res.data.data))
              .catch()
          }
        })
        .catch(err => {
          setisLoading(false);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        })
    }
    else {
      toast.error('Please select all fields', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <Container>


      <Card className="text-center" style={{ width: "20rem", margin: "0 auto" }}>
        {/* <Card.Header>Featured</Card.Header> */}
        <Card.Body>
          <FormControl placeholder="Enter pin code" minLength="6" maxLength="6" onChange={(e) => { setPin(e.target.value) }} />
          <br />
          <FormControl type="date" min={current_date} onChange={(e) => { setDate(e.target.value) }} />
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Form.Check inline label="All" type="radio" value="" checked={selected === ""} onChange={(e) => setSelected(e.target.value)} />
            <Form.Check inline label="18+" type="radio" value="18" checked={selected === "18"} onChange={(e) => setSelected(e.target.value)} />
            <Form.Check inline label="45+" type="radio" value="45" checked={selected === "45"} onChange={(e) => setSelected(e.target.value)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="mt-2">
            <Form.Check inline label="All" type="radio" value="" checked={feeType === ""} onChange={(e) => setfeeType(e.target.value)} />
            <Form.Check inline label="Free" type="radio" value="Free" checked={feeType === "Free"} onChange={(e) => setfeeType(e.target.value)} />
            <Form.Check inline label="Paid" type="radio" value="Paid" checked={feeType === "Paid"} onChange={(e) => setfeeType(e.target.value)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="mt-2">
            <Form.Check inline label="All" type="radio" value="" checked={vaccine === ""} onChange={(e) => setvaccine(e.target.value)} />
            <Form.Check inline label="Covaxin" type="radio" value="COVAXIN" checked={vaccine === "COVAXIN"} onChange={(e) => setvaccine(e.target.value)} />
            <Form.Check inline label="Covishield" type="radio" value="COVISHIELD" checked={vaccine === "COVISHIELD"} onChange={(e) => setvaccine(e.target.value)} />
          </div>
          <br />
          <Button variant="primary" onClick={centreData}>Search</Button>
        </Card.Body>

      </Card>
      <br />
      {isLoading ? <PropagateLoader color={'#36D7B7'} css={override} loading={isLoading} size={15} />
        : center.length > 0 ? <Slot centers={center} date={moment(date).format('YYYY-MM-DD').split('-')} /> : <h5 style={{ textAlign: "center" }}>No Vaccination center is available for booking or Api server is down .</h5>}
    </Container>
  )
}


export default Pin