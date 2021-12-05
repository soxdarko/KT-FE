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
      {props.minMaxWorkingHours.map((time, i) => (
          <tr key={i} onClick={() => console.log('<tr> click event')}>
            {props.daysInWeek.map((days, i) =>
                <Fragment key={days + i}>
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
        ))      
      }
    </>
  )
}


export default CalBodyRow;
