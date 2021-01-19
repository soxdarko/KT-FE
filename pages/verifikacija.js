import Verified from '../Components/UI/Forms/Verified';

const Verifikacija = () => {
	return (
		<>
			<Verified
				message="Uspesno ste verifikovali broj telefona"
				display="block"
				borderColor="green"
				link="/"
			/>
		</>
	);
};

export default Verifikacija;
