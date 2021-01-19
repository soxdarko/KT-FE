import RingLoader from 'react-spinners/RingLoader';
import Backdrop from './Backdrop';

const Loader = props => {
	const overide = {
		position: 'absolute',
		top: 'calc(50vh - 40px)',
		left: 'calc(50vw - 40px)',
		zIndex: '401',
	};
	return (
		<>
			<Backdrop display={props.loading ? 'block' : 'none'} />
			<RingLoader color={'gold'} loading={props.loading} size="80" css={overide} />
		</>
	);
};

export default Loader;
