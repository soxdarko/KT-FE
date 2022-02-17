const Days = (props) => (
    <>
        {props.days.map((day, i) => (
            <th key={day}>{props.date(i + 1)}</th>
        ))}
    </>
);

export default Days;
