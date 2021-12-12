import CalBodyCol from './CalBodyCol';
import { Fragment, useEffect } from 'react';

const CalBodyRow = (props) => {
  const clickedTimeHandler = (i) => {
    const cell = props.minMaxWorkingHours;
    for (const time of cell) {
      if (time === cell[i]) {
        return time;
      }
    }
  };


  return (
    <>
      <tr>
        {props.daysInWeek.map((day, i) =>
            <Fragment key={day + i}>
              {}
                <CalBodyCol
                  isEnabled={props.workingHoursInWeek[i].cell[i].enabled}
                  cellDate={props.workingHoursInWeek[i].date}
                  cellHour={props.workingHoursInWeek[i].cell[i].time}
                  workingHoursInWeek={props.workingHoursInWeek}
                  time={clickedTimeHandler(i)}
                  setClickedCell={props.setClickedCell}
                  clickedCellState={props.clickedCell}
                  appointments={props.appointments}
                  onClick={props.onClick}
                  clientPicker={props.clientPicker}
                  dayOfWeekNum={i}
                />
            </Fragment>           
          )
        }
      </tr> 

    </>
  )
}


export default CalBodyRow;
