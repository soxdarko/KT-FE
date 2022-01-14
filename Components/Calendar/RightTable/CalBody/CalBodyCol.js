import Appointment from './Appointment';
import classes from '../../Calendar.module.scss';
import { useEffect } from 'react';
import { isObjEmpty, getTimeString } from '../../../../helpers/universalFunctions';

const CalBodyCol = ({date, time, enabled, absence, appointment, clientPicker, setClickedCell, showMessage}) => {
   //useEffect(()=> console.log('props.cellDate',new Date(props.cellDate)), [])

    // const appointments = () => {
    //   for (const hour of props.appointments) {
    //     if (hour.time === props.cellHour && hour.date === props.cellDate) {
    //       if (hour.numOfCellsTakes === 1) {
    //         return 149 * hour.numOfCellsTakes;
    //       }
    //       if (hour.numOfCellsTakes >= 2 && hour.numOfCellsTakes < 4) {
    //         return 149 * hour.numOfCellsTakes + hour.numOfCellsTakes * 1.2;
    //       }
    //       return 149 * hour.numOfCellsTakes + hour.numOfCellsTakes * 1.8;
    //     }
    //   }
    // };

    // const appointment = (dataType) => {
    //   for (const appointment of props.appointments) {
    //     if (appointment.time === props.cellHour && appointment.date === props.cellDate) {
    //       return appointment[dataType];
    //     }
    //   }
    // };

    const onClick = () => {
      const dateStart = date.replace('00:00:00', getTimeString(time, true));
      const mDateStart = Date.parse(dateStart);
      const mCurrentDateTime = Date.now();
      if(mDateStart > mCurrentDateTime)
        if (enabled && isObjEmpty(appointment)) {
          clientPicker();
          setClickedCell((clickedCellState) => ({
            ...clickedCellState,
            time: time,
            date: date,
          }));
        } else {
          null;
        }
      else
        showMessage('Nije moguće zakazati termin u vreme koje je prošlo!');
    };

    const getAppointmentTime = () => {
      if(!isObjEmpty(appointment)) {
        const timeStart = appointment.dateStart.split('T')[1];
        const timeEnd = appointment.dateEnd.split('T')[1];
        return `${timeStart.substring(0,5)} - ${timeEnd.substring(0,5)}`;
      }
      
    }

  return (
    <>
        <td
          className={enabled ? classes.CellEnabled : classes.CellDisabled}
          onClick={() => onClick()}
        >
          <p style={{ display: isObjEmpty(appointment) ?  'flex':'none' }}>
            {!enabled ? 'zatvoreno' : 'rezerviši termin'}
          </p>

          <Appointment
            display={isObjEmpty(appointment) ? 'none':'flex'}
            height={`150px`}
            className={classes.Appointment}
          >
            <h5>{getAppointmentTime()}</h5>
            <h5>{appointment.clientName}</h5>
            <h5>{appointment.clientPhone}</h5>
            <hr className={classes.HrLineAppointment} />
            {!isObjEmpty(appointment) && appointment.services.map(s => {
              return (
                <h5>{`${s.serviceName} (${s.price} din)`}</h5>
              )
            })}
          </Appointment>
        </td>
    </>
  )
};

export default CalBodyCol;
