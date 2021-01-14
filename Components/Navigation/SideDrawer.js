import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faAddressBook,
  faCut,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import NavItems from './NavItems';
import NavItem from './NavItem';
import Button from '../UI/Button';
import ServiceProviderLogo from '../UI/ServiceProviderLogo';
import Backdrop from '../UI/Backdrop';

import useDeviceDetect from '../../utils/UseDeviceDetect';

import classes from './Navigation.module.scss';

const SideDrawer = (props) => {
  const { isMobile } = useDeviceDetect();

  if (isMobile) {
    return (
      <>
        <Backdrop
          display={props.displaySideDrawerBackdrop}
          onClick={props.sideDrawerClose}
        />
        <div
          className={classes.SideDrawerMob}
          style={{ transform: props.transform, display: props.displayMob }}
        >
          <div
            className={props.styleLogo}
            style={{ display: props.displayLogo }}
          />
          <nav>
            <NavItems>
              <div>
                <NavItem
                  display="block"
                  className={classes.NavItemServiceProviderMob}
                  link="/Kalendar"
                >
                  <>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className={classes.sideDrawerIconMob}
                      style={{ color: props.colorCalIcon }}
                    />
                    <p>Kalendar</p>
                  </>
                </NavItem>
                <NavItem
                  display="block"
                  className={classes.NavItemServiceProviderMob}
                  link="/"
                >
                  <>
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className={classes.sideDrawerIconMob}
                      style={{ color: props.colorClinetsIcon }}
                    />
                    <p>Lista klijenata</p>
                  </>
                </NavItem>
                <NavItem
                  display="block"
                  className={classes.NavItemServiceProviderMob}
                  link="/"
                >
                  <>
                    <FontAwesomeIcon
                      icon={faCut}
                      className={classes.sideDrawerIconMob}
                      style={{ color: props.colorServicesIcon }}
                    />
                    <p>Usluge</p>
                  </>
                </NavItem>
                <NavItem
                  display="block"
                  className={classes.NavItemServiceProviderMob}
                  link="/Profil"
                >
                  <>
                    <FontAwesomeIcon
                      icon={faCog}
                      className={classes.sideDrawerIconMob}
                      style={{ color: props.colorSettingsIcon }}
                    />
                    <p>Moj profil</p>
                  </>
                </NavItem>
              </div>
            </NavItems>
            <ServiceProviderLogo
              src={props.src}
              salonName={props.salonName}
              className={classes.ServiceProviderLogoMob}
            />
          </nav>
        </div>
      </>
    );
  }
  return (
    <div className={classes.SideDrawerPC} style={{ display: props.displayPC }}>
      <nav>
        <NavItems>
          <div>
            <NavItem
              display="block"
              className={classes.NavItemServiceProviderPC}
              link="/Kalendar"
            >
              <Button
                value="Kalendar"
                classNameButton={props.classNameCal}
                fontSize="1rem"
              />
            </NavItem>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={classes.sideDrawerIconPC}
              style={{ color: props.colorCalIcon }}
            />
            <NavItem
              display="block"
              className={classes.NavItemServiceProviderPC}
              link="/"
            >
              <Button
                value="Lista klijenata"
                classNameButton={props.classNameClients}
                fontSize="1rem"
              />
            </NavItem>
            <FontAwesomeIcon
              icon={faAddressBook}
              className={classes.sideDrawerIconPC}
              style={{ color: props.colorClinetsIcon }}
            />
            <NavItem
              display="block"
              className={classes.NavItemServiceProviderPC}
              link="/"
            >
              <Button
                value="Lista usluga"
                classNameButton={props.classNameServices}
                fontSize="1rem"
              />
            </NavItem>
            <FontAwesomeIcon
              icon={faCut}
              className={classes.sideDrawerIconPC}
              style={{ color: props.colorServicesIcon }}
            />
            <NavItem
              display="block"
              className={classes.NavItemServiceProviderPC}
              link="/Profil"
            >
              <Button
                value="Moj profil"
                classNameButton={props.classNameProfile}
                fontSize="1rem"
              />
            </NavItem>
            <FontAwesomeIcon
              icon={faCog}
              className={classes.sideDrawerIconPC}
              style={{ color: props.colorProfileIcon }}
            />
          </div>
        </NavItems>
        <ServiceProviderLogo
          src={props.src}
          salonName={props.salonName}
          className={classes.ServiceProviderLogoPC}
        />
      </nav>
    </div>
  );
};

export default SideDrawer;
