import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderOpen, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';
import classesAlt from '../Navigation/Navigation.module.scss';

const WrappedTools = props => {
	const resetForm = () => {
		if (props.descriptionEdit) {
			return;
		} else {
			props.setDataId(null), props.setFormInput(props.initServicesForm), props.setEditMode(false);
		}
	};

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
							onClick={() => {
								props.setDisplayDescription('block'),
									props.setShowBackdrop(classes.backdropIn),
									props.setDescriptionEdit(true);
							}}
						/>
					</div>
					<div>
						<FontAwesomeIcon
							icon={faEdit}
							className={[classes.Icon, props.IconClassName].join(' ')}
							onClick={props.onCLickEdit}
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
							onClick={() => {
								props.setDisplayWrappedTools('none'), props.setDataId(null), resetForm();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WrappedTools;
