/* eslint-disable no-shadow */
import Appointment from './Appointment';

import classes from '../../Calendar.module.scss';

const CalBodyCol = (props) => (
  <>
    {props.daysInWeek.map((day, i) => {
      const isEnbaled =
        props.workingHoursInWeek[i].cell[props.timeIndex].enabled;
      const cellDate = props.workingHoursInWeek[i].date;
      const cellHour = props.workingHoursInWeek[i].cell[props.timeIndex].time;
      /* const d = new Date();
      const t = Date.now(); */
      const Appointments = () => {
        for (const hour of props.Appointments) {
          if (hour.time === cellHour && hour.date === cellDate) {
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

      const appointment = (data) => {
        // eslint-disable-next-line no-shadow
        for (const appointment of props.Appointments) {
          if (appointment.time === cellHour && appointment.date === cellDate) {
            return appointment[data];
          }
        }
      };

      const clickedCellHandler = () => {
        const cell = props.workingHoursInWeek;
        for (const date of cell) {
          if (date.date === cell[i].date) {
            props.setClickedCell({
              ...props.clickedCellState,
              time: props.time,
              date: date.date,
            });
          }
        }
      };

      const onClick = (i) => {
        if (isEnbaled && !Appointments()) {
          props.clientPicker(i), clickedCellHandler(i);
        } else {
          null;
        }
      };

      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <td
          className={isEnbaled ? classes.CellEnabled : classes.CellDisabled}
          key={i}
          onClick={(i) => onClick(i)}
          data-celldate={cellDate}
          data-cellhour={cellHour}
        >
          <p style={{ display: Appointments() ? 'none' : 'flex' }}>
            {!isEnbaled ? 'zatvoreno' : 'rezerviši termin'}
          </p>
          <Appointment
            display={Appointments() ? 'flex' : 'none'}
            height={`${Appointments()}px`}
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
      );
    })}
  </>
);

export default CalBodyCol;
