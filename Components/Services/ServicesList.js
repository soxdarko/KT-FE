import { useDeviceDetect } from '../../helpers/universalFunctions';

import classes from '../UI/UI.module.scss';

const ServicesList = props => {
	const { isMobile } = useDeviceDetect();
	if (isMobile) {
		return;
	} else {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Naziv Usluge</th>
						<th>Trajanje</th>
						<th>Cena</th>
						<th>Redosled omiljenih usluga</th>
						<th>Omiljena usluga</th>
						<th>Uvek izabrana usluga</th>
						<th>Klijenti vide cenu</th>
						<th>Klijenti vide uslugu</th>
						<th>Koristim uslugu</th>
						<th>Opis</th>
						<th>Izmeni</th>
						<th>Ukloni</th>
					</tr>
				</thead>
				<tbody>
					{props.services.map(service => {
						return (
							<tr>
								<td>1</td>
								<td>{service.name}</td>
								<td>{service.duration}</td>
								<td>{service.price}</td>
								<td>fsdfgsdfsfdsfsfsfdsfds</td>
								<td>chk</td>
								<td>chk</td>
								<td>chk</td>
								<td>chk</td>
								<td>chk</td>
								<td>{service.description}</td>
								<td>izmeni</td>
								<th>Ukloni</th>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
};

export default ServicesList;
