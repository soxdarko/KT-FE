import useDeviceDetect from '../../../../utils/UseDeviceDetect';

import classes from '../../UI.module.scss';

const ListBody = (props) => {
  const { isMobile } = useDeviceDetect();
  return (
    <table className={isMobile ? classes.ListBodyMob : classes.ListBody}>
      {props.children}
    </table>
  );
};

export default ListBody;
