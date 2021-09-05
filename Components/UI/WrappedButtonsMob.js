import { Button, Space } from 'antd';
import { ArrowRightOutlined, PlusOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';

import classes from './UI.module.scss';

const WrappedButtonsMob = props => {
	return (
		<Space
			direction="horizontal"
			className={classes.ButtonWrapperMob}
			style={{ display: props.isMobile ? 'flex' : 'none' }}>
			<Button
				type="primary"
				className={classes.Btn_Add}
				style={{ display: props.displaySave }}
				icon={<SaveOutlined />}
				onClick={e => props.save(e)}
			/>
			{/* <div className={classes.Spacer} style={{ display: props.displayAdd }}></div> */}
			<Button
				type="primary"
				className={classes.Btn_Add}
				style={{ display: props.displayAdd }}
				icon={<PlusOutlined />}
				/* onClick={() => props.forward()} */
			/>
			{/* <div className={classes.Spacer} style={{ display: props.displayGiveUp }}></div> */}
			<Button
				type="primary"
				className={classes.Btn_Add}
				style={{ display: props.displayStopEdit }}
				icon={<StopOutlined />}
				onClick={() => props.stopEdit()}
			/>
			<div className={classes.Spacer}></div>
			<Button
				type="primary"
				className={classes.Btn_forward}
				style={{ display: props.displayForward }}
				icon={<ArrowRightOutlined />}
				onClick={() => props.forward()}
			/>
		</Space>
	);
};

export default WrappedButtonsMob;