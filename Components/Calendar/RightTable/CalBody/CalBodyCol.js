import Appointment from './Appointment';
import classes from '../../Calendar.module.scss';
import { useEffect } from 'react';
import { isObjEmpty } from '../../../../helpers/universalFunctions';

const CalBodyCol = ({date, time, enabled, absence, appointment}) => {
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

    // const clickedCellHandler = () => {
    //   const cell = props.workingHoursInWeek;
    //   for (const date of cell) {
    //     if (date.date === cell[props.dayOfWeekNum].date) {
    //       props.setClickedCell({
    //         ...props.clickedCellState,
    //         time: props.time,
    //         date: date.date,
    //       });
    //     }
    //   }
    // };

    // const onClick = (dayOfWeekNum) => {
    //   if (props.isEnabled && !appointments()) {
    //     props.clientPicker(dayOfWeekNum), clickedCellHandler(dayOfWeekNum);
    //   } else {
    //     null;
    //   }
    // };

  return (
    <>
        <td
          className={enabled ? classes.CellEnabled : classes.CellDisabled}
          // onClick={() => onClick(props.dayOfWeekNum)}
          data-celldate={date}
          data-cellhour={time}
        >
          <p style={{ display: isObjEmpty(appointment) ? 'none' : 'flex' }}>
            {!enabled ? 'zatvoreno' : 'rezerviši termin'}
          </p>
          <Appointment
            display={isObjEmpty(appointment) ? 'flex' : 'none'}
            height={`${isObjEmpty(appointment) ? 100 : 100}px`}
            className={classes.Appointment}
          >
            <h5>{appointment.dateStart}</h5>
            <h5>{appointment.clientName}</h5>
            <h5>{appointment.phone}</h5>
            <hr className={classes.HrLineAppointment} />
            {/* <h5>{appointment?.services[0].serviceName}</h5>
            <h5>{appointment?.services[0].price} rsd</h5> */}
          </Appointment>
        </td>
    </>
  )
};

export default CalBodyCol;
