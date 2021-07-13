import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap'
import Slot from './Slot'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  align-item : center;
  justify-content: center;
  border-color: red;
`;

function District() {

    const states = []
    const [district, setDistrict] = useState([])
    const [date, setDate] = useState('')
    const [center, setCenter] = useState([])
    const [districtId, setDistrictId] = useState('')
    const [selected, setSelected] = useState('')
    const [vaccine, setvaccine] = useState('')
    const [feeType, setfeeType] = useState('')
    const [isLoading, setisLoading] = useState(false);

    let current_date = moment().format('YYYY-MM-DD')

    // useEffect(() => {
    //     axios.get("http://13.235.242.157:5000/lookup/states")
    //         .then(res => setState(res.data.data))
    //         .catch()
    // }, [])

    let districtData = (state_id) => {
        axios.post("http://13.235.242.157:5000/lookup/districts", { state_id: state_id })
            .then(res => setDistrict(res.data.data))
            .catch()
    }


    let centreData = () => {
        setisLoading(true)
        let dat = moment(date).format('DD-MM-YYYY');
        let obj = {
            district_id: districtId,
            date: dat,
            age: selected,
            vaccine: vaccine,
            fee_type: feeType
        }
        if (!districtId || !date) {
            toast.error('Please select all the fields ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setisLoading(false)
        }
        else {
            axios.post("http://13.235.242.157:5000/sessions/district", obj)
                .then(res => {
                    setCenter(res.data.data)
                    setisLoading(false)
                })
                .catch(
                    setisLoading(false)
                )
        }
    }

    return (
        <Container>


            <Card className="text-center" style={{ width: "20rem", margin: "0 auto" }}>
                <Card.Body>
                    <Form.Group controlId="exampleForm.ControlSelect1">

                        <Form.Control as="select" onChange={(e) => { districtData(e.target.value); setDistrictId('') }}>
                            <option value='' >Select state</option>
                            {
                                states.map((s, i) => {
                                    return <option key={i} value={s.state_id} >{s.state_name}</option>
                                })
                            }
                        </Form.Control>
                        <br />
                        <Form.Control as="select" defaultValue={districtId} onChange={(e) => { setDistrictId(e.target.value) }}>
                            <option value='' >Select District</option>
                            {
                                district.map((d, i) => {
                                    return <option key={i} value={d.district_id} >{d.district_name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <FormControl type="date" placeholder="Select Date" min={current_date} onChange={(e) => { setDate(e.target.value) }} />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {/* <label>Filter:</label>&nbsp; */}
                        <Form.Check inline label="All" type="radio" value="" checked={selected === ""} onChange={(e) => setSelected(e.target.value)} />
                        <Form.Check inline label="18+" type="radio" value="18" checked={selected === "18"} onChange={(e) => setSelected(e.target.value)} />
                        <Form.Check inline label="45+" type="radio" value="45" checked={selected === "45"} onChange={(e) => setSelected(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="mt-2">
                        {/* <label>Filter:</label>&nbsp; */}
                        <Form.Check inline label="All" type="radio" value="" checked={feeType === ""} onChange={(e) => setfeeType(e.target.value)} />
                        <Form.Check inline label="Free" type="radio" value="Free" checked={feeType === "Free"} onChange={(e) => setfeeType(e.target.value)} />
                        <Form.Check inline label="Paid" type="radio" value="Paid" checked={feeType === "Paid"} onChange={(e) => setfeeType(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="mt-2">
                        {/* <label>Filter:</label>&nbsp; */}
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
        </Container >
    )
}


export default District