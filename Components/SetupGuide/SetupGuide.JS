import Form from '../UI/Forms/Form';
import Label from '../UI/Forms/Form';
import Input from '../UI/Forms/Form';
import DescriptionLabel from '../UI/DescriptionLabel';

const SetupGuide = props => {
	const greetingMessage = `Dobrodošli! 
        Čestitamo na odluci koja će unaprediti Vaše poslovanje. Napisati tekst koji će navesti usera da isprati vodič do kraja'`;
	return (
		<div>
			<h1>VODIČ ZA PODEŠAVANJE</h1>
			<Form>
				<DescriptionLabel text={greetingMessage} />
				<Input type="button" value="Nastavi" />
			</Form>
		</div>
	);
};

export default SetupGuide;
