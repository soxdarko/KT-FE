import CalBodyCol from './CalBodyCol';

const CalBodyRow = (props) => (
  <>
    {props.minMaxWorkingHours.map((time, i) => {
      const clickedTimeHandler = () => {
        const cell = props.minMaxWorkingHours;
        // eslint-disable-next-line no-shadow
        for (const time of cell) {
          if (time === cell[i]) {
            return time;
          }
        }
      };

      return (
        // eslint-disable-next-line no-shadow
        <tr key={i} onClick={(i) => clickedTimeHandler(i)}>
          <CalBodyCol
            daysInWeek={props.daysInWeek}
            workingHoursInWeek={props.workingHoursInWeek}
            isEnabled={props.isEnabled}
            timeIndex={i}
            time={clickedTimeHandler(i)}
            setClickedCell={props.setClickedCell}
            clickedCellState={props.clickedCell}
            Appointments={props.Appointments}
            onClick={props.onClick}
            clientPicker={props.clientPicker}
          />
        </tr>
      );
    })}
  </>
);

export default CalBodyRow;
