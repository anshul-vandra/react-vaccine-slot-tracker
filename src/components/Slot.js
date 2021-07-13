import Table from 'react-bootstrap/Table'
import moment from 'moment'


function Slot({ centers, date }) {

  let dateFormatter = (day) => {
    let modifiedDate = date.map(d => parseInt(d))
    modifiedDate[1] = modifiedDate[1] - 1
    modifiedDate = moment(modifiedDate).add(day, 'days').format('DD-MM-YYYY')
    return modifiedDate
  }

  return (
    <Table responsive  >
      <thead>
        <tr>
          <th>Centres</th>
          {Array.from({ length: 7 }).map((_, index) => (
            <th style={{ width: '95px' }} key={index}>{dateFormatter(index)}</th>))}
        </tr>
      </thead>
      <tbody>
        {centers.map((c, index) => {

          if (c.sessions.length > 0) {
            return (
              <tr key={index + 9}>
                <td style={{ width: "18rem" }} >
                  <p><strong>{c.name}</strong></p>
                  <p style={{ fontSize: "0.9rem" }}>{c.address + ' ' + c.pincode}</p>
                  <p style={{ color: 'red' }}>{c.fee_type === 'Free' ? '' : c.fee_type}</p>
                </td>
                {Array.from({ length: 7 }).map((_, i) => (

                  <td style={{ width: '6rem' }} key={i + 10}>
                    {

                      c.sessions.some((d) => { return (d.date === dateFormatter(i)) }) ? c.sessions.map((s => {

                        if (s.date === dateFormatter(i)) {
                          return (
                            <>
                              {/* {s.available_capacity === 0 ? <p style={{ color: "darkred" }}>Booked</p> : s.available_capacity} */}
                              {s.available_capacity === 0 ? <span className="badge badge-pill badge-danger">Booked</span> : ((s.available_capacity > 0 && s.available_capacity < 16) ? <span className="badge badge-pill badge-warning">{s.available_capacity}</span> : <span className="badge badge-pill badge-success">{s.available_capacity}</span>)}
                              <p className="mt-2" style={{ fontSize: "0.9rem" }}>{s.vaccine}</p>
                              <p style={{ fontSize: "0.8rem" }}>{s.min_age_limit + '+'}</p>
                              {s.available_capacity === 0 ? '' : s.slots.map(t => <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>{t}</p>)}
                            </>

                          )
                        } else { return '' }
                      })) : <p style={{ width: '6rem' }}>NA</p>
                    }
                  </td>

                ))}
              </tr>
            )
          } else {
            return ''
          }


        })}

      </tbody>
    </Table>
  )
}

export default Slot