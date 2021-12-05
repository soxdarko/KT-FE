import Appointment from './Appointment';
import classes from '../../Calendar.module.scss';
import { useEffect } from 'react';

const CalBodyCol = (props) => {
   //useEffect(()=> console.log('props.cellDate',new Date(props.cellDate)), [])

    const appointments = () => {
      for (const hour of props.appointments) {
        if (hour.time === props.cellHour && hour.date === props.cellDate) {
          if (hour.numOfCellsTakes === 1) {
            return 149 * hour.numOfCellsTakes;
          }
          if (hour.numOfCellsTakes >= 2 && hour.numOfCellsTakes < 4) {
            return 149 * hour.numOfCellsTakes + hour.numOfCellsTakes * 1.2;
          }
          return 149 * hour.numOfCellsTakes + hour.numOfCellsTakes * 1.8;
        }
      }
    };

    const appointment = (dataType) => {
      for (const appointment of props.appointments) {
        if (appointment.time === props.cellHour && appointment.date === props.cellDate) {
          return appointment[dataType];
        }
      }
    };

    const clickedCellHandler = () => {
      const cell = props.workingHoursInWeek;
      for (const date of cell) {
        if (date.date === cell[props.dayOfWeekNum].date) {
          props.setClickedCell({
            ...props.clickedCellState,
            time: props.time,
            date: date.date,
          });
        }
      }
    };

    const onClick = (dayOfWeekNum) => {
      if (props.isEnabled && !appointments()) {
        props.clientPicker(dayOfWeekNum), clickedCellHandler(dayOfWeekNum);
      } else {
        null;
      }
    };

  return (
    <>
        <td
          className={props.isEnabled ? classes.CellEnabled : classes.CellDisabled}
          key={props.dayOfWeekNum}
          onClick={() => onClick(props.dayOfWeekNum)}
          data-celldate={props.cellDate}
          data-cellhour={props.cellHour}
        >
          <p style={{ display: appointments() ? 'none' : 'flex' }}>
            {!props.isEnabled ? 'zatvoreno' : 'rezerviši termin'}
          </p>
          <Appointment
            display={appointments() ? 'flex' : 'none'}
            height={`${appointments()}px`}
            className={classes.Appointment}
          >
            <h5>{appointment('duration')}</h5>
            <h5>{appointment('name')}</h5>
            <h5>{appointment('phone')}</h5>
            <hr className={classes.HrLineAppointment} />
            <h5>{appointment('serviceName')}</h5>
            <h5>{appointment('price')} rsd</h5>
          </Appointment>
        </td>
    </>
  )
};

export default CalBodyCol;
