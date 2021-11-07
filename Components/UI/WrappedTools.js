import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderOpen, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';
import classesAlt from '../Navigation/Navigation.module.scss';

const WrappedTools = props => {
	return (
		<div style={{ display: props.displayWrappedTools }}>
			<div
				className={classes.WrappedToolsChkBoxContainer}
				style={{ display: props.displayWrappedToolsChkBox }}>
				{props.children}
			</div>
			<div style={{ display: props.displayWrappedTools }} className={props.className}>
				<div className={classesAlt.ButtonsPair}>
					<div>
						<FontAwesomeIcon
							icon={faFolderOpen}
							className={[classes.Icon, props.IconClassName].join(' ')}
						/>
					</div>
					<div>
						<FontAwesomeIcon
							icon={faEdit}
							className={[classes.Icon, props.IconClassName].join(' ')}
						/>
					</div>
				</div>
				<div className={classesAlt.ButtonsPair}>
					<div>
						<FontAwesomeIcon
							icon={faTrashAlt}
							className={[classes.Icon, props.IconClassName].join(' ')}
							style={{ color: 'red' }}
						/>
					</div>
					<div>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className={[classes.Icon, props.IconClassName].join(' ')}
							onClick={() => props.setDisplayWrappedTools('none')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WrappedTools;
