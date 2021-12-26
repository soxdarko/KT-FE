import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderOpen, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';
import classesAlt from '../Navigation/Navigation.module.scss';

const WrappedTools = props => {
	const resetForm = () => {
		if (props.descriptionEdit) {
			return;
		} else {
			props.setDataId(null);
			props.setFormInput(props.initForm);
			props.setEditMode(false);
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
					<div
						onClick={() => {
							props.setDisplayDescription('block');
							props.setShowBackdrop(classes.backdropIn);
							props.setDescriptionEdit(true);
						}}>
						<FontAwesomeIcon
							icon={faFolderOpen}
							className={[classes.Icon, props.IconClassName].join(' ')}
						/>
					</div>
					<div onClick={props.onClickEdit}>
						<FontAwesomeIcon
							icon={faEdit}
							className={[classes.Icon, props.IconClassName].join(' ')}
						/>
					</div>
				</div>
				<div className={classesAlt.ButtonsPair}>
					<div
						onClick={() => {
							props.setShowConfirmModal(props.modalAnimationIn);
							props.responseHandler(
								props.setShowConfirmModal,
								props.modalAnimationIn,
								'Da li ste sigurni da želite ukloniti klijenta sa liste?',
								'#FDFD96' //pastel yellow
							);
							props.setShowBackdrop(classes.backdropIn);
						}}>
						<FontAwesomeIcon
							icon={faTrashAlt}
							className={[classes.Icon, props.IconClassName].join(' ')}
							style={{ color: 'red' }}
						/>
					</div>
					<div
						onClick={() => {
							props.setDisplayWrappedTools('none'), props.setDataId(null), resetForm();
						}}>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className={[classes.Icon, props.IconClassName].join(' ')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WrappedTools;
