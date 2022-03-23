import CalBodyCol from './CalBodyCol'
import { Fragment } from 'react'

const CalBodyRow = ({
  workHourAppointments,
  time,
  clientPicker,
  setClickedCell,
  resHandler,
  infoHandler,
  confirmMessageHandler,
  setAppointmentId,
}) => {
  return (
    <tr>
      {workHourAppointments &&
        workHourAppointments.map((day, i) =>
          day.wha.map(
            (wha) =>
              wha.hours == time && (
                <Fragment key={'CalBodyCol' + i}>
                  <CalBodyCol
                    date={day.date}
                    time={time}
                    enabled={wha.enabled}
                    absence={wha.absence}
                    appointment={wha.appointment}
                    clientPicker={clientPicker}
                    setClickedCell={setClickedCell}
                    /* showMessage={showMessage} */
                    resHandler={resHandler}
                    infoHandler={infoHandler}
                    confirmMessageHandler={confirmMessageHandler}
                    setAppointmentId={setAppointmentId}
                  />
                </Fragment>
              ),
          ),
        )}
    </tr>
  )
}

export default CalBodyRow
