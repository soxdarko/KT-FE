import useDeviceDetect from '../../utils/UseDeviceDetect';

import classes from './HomePage.scss';

const Title = (props) => {
  const { isMobile } = useDeviceDetect();
  return (
    <h1
      className={isMobile ? classes.TitleMob : classes.Title}
      style={{ top: props.top }}
    >
      {props.txt}
    </h1>
  );
};

export default Title;
