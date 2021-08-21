import {
	useDeviceDetect,
	inputChangedHandlerArray,
	inputChangedHandler,
} from '../../helpers/universalFunctions';

import Logo from '../Logo/Logo';
import HamburgerButton from './HamburgerButton';
import Select from '../UI/Select';
import PrepaidStatus from '../UI/PrepaidStatus';
import Distancer from '../UI/Distancer';

import classes from './Navigation.module.scss';

const Toolbar = props => {
	const { isMobile } = useDeviceDetect();

	const adminList = () => {
		if (props.selectData !== null) {
			return props.selectData.map(user => (
				<option key={user.id} value={user.id}>
					{user.name}
				</option>
			));
		}
		return null;
	};

	if (isMobile) {
		return (
			<header className={classes.Header}>
				<HamburgerButton onClick={() => props.sideDrawerOpen()} display={props.displayHamButton} />
				<Distancer />
				<div className={classes.LogoMob}>
					<Logo />
				</div>
			</header>
		);
	}
	return (
		<header className={classes.Header}>
			<Select
				displaySelect={props.displaySelect}
				className={props.classNameEmployeeSelect}
				idSelect={props.idSelect}
				name="employeeId"
				value={props.selectedEmployee}
				onChange={e => props.setSelectedEmployee(e.target.value)}>
				{adminList()}
			</Select>
			<PrepaidStatus
				display={props.displayNotifLabel}
				className={classes.PrepaidStatus}
				label="Paket ističe za"
				trigger={14}
				current={props.license}
				days="dana"
			/>
			<PrepaidStatus
				display={props.displayNotifLabel}
				className={classes.PrepaidStatus}
				label="SMS poruke:"
				trigger={50}
				current={props.sms}
			/>
			<Distancer />
			<div className={classes.LogoPC}>
				<Logo />
			</div>
		</header>
	);
};

export default Toolbar;
