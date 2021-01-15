import {
	faPlus,
	faSave,
	faCopy,
	faPaste,
	faSearch,
	faLink,
} from '@fortawesome/free-solid-svg-icons';
import useDeviceDetect from '../../../../utils/UseDeviceDetect';

import Distancer from '../../Distancer';
import ListHeadButton from './ListHeadButton';
import Select from '../../Select';

import classes from '../../UI.module.scss';

const ListHead = props => {
	const { isMobile } = useDeviceDetect();
	return (
		<>
			<div className={isMobile ? classes.ListHeadMob : classes.ListHead}>
				<div className={classes.Title}>{props.title}</div>
				<Distancer />
				<ListHeadButton
					className={classes.CopyWeek}
					value="Kopiraj"
					faIcon={faCopy}
					display={props.displayCopy}
				/>
				<ListHeadButton
					className={classes.CopyWeek}
					value="Nalepi"
					faIcon={faPaste}
					display={props.displayPaste}
				/>
				<Select className={classes.SelectWeek} displaySelect={props.displaySelectWeek}>
					<option value="060">1|01.01.2021.-07.01.2021.</option>
					<option value="061">2|08.01.2021.-15.01.2021.</option>
					<option value="062">3|01.01.2021.-07.01.2021.</option>
					<option value="063">4|01.01.2021.-07.01.2021.</option>
					<option value="064">5|01.01.2021.-07.01.2021.</option>
					<option value="065">6|01.01.2021.-07.01.2021.</option>
					<option value="066">7|01.01.2021.-07.01.2021.</option>
					<option value="069">8|01.01.2021.-07.01.2021.</option>
				</Select>
				<ListHeadButton
					className={classes.CopyWeek}
					value="Pretraga"
					faIcon={faSearch}
					display={props.displaySearch}
				/>
				<ListHeadButton
					className={classes.CopyWeek}
					value="Link"
					faIcon={faLink}
					display={props.displayLink}
				/>
				<ListHeadButton
					className={classes.CopyWeek}
					value={`Dodaj ${props.add}`}
					faIcon={faPlus}
					display={props.displayAdd}
				/>
				<ListHeadButton
					className={classes.Save}
					value="Sačuvaj izmene"
					faIcon={faSave}
					display={isMobile ? 'none' : props.displaySave}
					onClick={props.onSave}
				/>
			</div>
		</>
	);
};

export default ListHead;
