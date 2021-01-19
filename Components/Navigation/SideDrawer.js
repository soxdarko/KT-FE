import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faAddressBook, faCut, faCog } from '@fortawesome/free-solid-svg-icons';
import NavItems from './NavItems';
import NavItem from './NavItem';
import ServiceProviderLogo from '../UI/ServiceProviderLogo';
import Backdrop from '../UI/Backdrop';
import Input from '../UI/Forms/Input';

import useDeviceDetect from '../../utils/UseDeviceDetect';

import classes from './Navigation.module.scss';

const SideDrawer = props => {
	const { isMobile } = useDeviceDetect();

	if (isMobile) {
		return (
			<>
				<Backdrop display={props.displaySideDrawerBackdrop} onClick={props.sideDrawerClose} />
				<div
					className={classes.SideDrawerMob}
					style={{ transform: props.transform, display: props.displayMob }}>
					<div className={props.styleLogo} style={{ display: props.displayLogo }} />
					<nav>
						<NavItems>
							<div>
								<NavItem
									display="block"
									className={classes.NavItemServiceProviderMob}
									link="/kalendar">
									<div>
										<FontAwesomeIcon
											icon={faCalendarAlt}
											className={classes.sideDrawerIconMob}
											style={{ color: props.colorCalIcon }}
										/>
										<p>Kalendar</p>
									</div>
								</NavItem>
								<NavItem display="block" className={classes.NavItemServiceProviderMob} link="/">
									<div>
										<FontAwesomeIcon
											icon={faAddressBook}
											className={classes.sideDrawerIconMob}
											style={{ color: props.colorClinetsIcon }}
										/>
										<p>Lista klijenata</p>
									</div>
								</NavItem>
								<NavItem display="block" className={classes.NavItemServiceProviderMob} link="/">
									<div>
										<FontAwesomeIcon
											icon={faCut}
											className={classes.sideDrawerIconMob}
											style={{ color: props.colorServicesIcon }}
										/>
										<p>Usluge</p>
									</div>
								</NavItem>
								<NavItem
									display="block"
									className={classes.NavItemServiceProviderMob}
									link="/profil">
									<div>
										<FontAwesomeIcon
											icon={faCog}
											className={classes.sideDrawerIconMob}
											style={{ color: props.colorSettingsIcon }}
										/>
										<p>Moj profil</p>
									</div>
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
	} else {
		return (
			<div className={classes.SideDrawerPC} style={{ display: props.displayPC }}>
				<nav>
					<NavItems>
						<div>
							<NavItem
								display="block"
								className={classes.NavItemServiceProviderPC}
								link="/kalendar">
								<Input
									type="button"
									value="Kalendar"
									className={props.classNameCal}
									fontSize="1rem"
								/>
							</NavItem>
							<FontAwesomeIcon
								icon={faCalendarAlt}
								className={classes.sideDrawerIconPC}
								style={{ color: props.colorCalIcon }}
							/>
							<NavItem display="block" className={classes.NavItemServiceProviderPC} link="/">
								<Input
									type="button"
									value="Lista klijenata"
									className={props.classNameClients}
									fontSize="1rem"
								/>
							</NavItem>
							<FontAwesomeIcon
								icon={faAddressBook}
								className={classes.sideDrawerIconPC}
								style={{ color: props.colorClinetsIcon }}
							/>
							<NavItem display="block" className={classes.NavItemServiceProviderPC} link="/">
								<Input
									type="button"
									value="Lista usluga"
									className={props.classNameServices}
									fontSize="1rem"
								/>
							</NavItem>
							<FontAwesomeIcon
								icon={faCut}
								className={classes.sideDrawerIconPC}
								style={{ color: props.colorServicesIcon }}
							/>
							<NavItem display="block" className={classes.NavItemServiceProviderPC} link="/profil">
								<Input
									type="button"
									value="Moj profil"
									className={props.classNameProfile}
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
	}
};

export default SideDrawer;
