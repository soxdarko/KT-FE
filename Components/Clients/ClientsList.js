import { useDeviceDetect } from '../../helpers/universalFunctions';

import classes from '../UI/UI.module.scss';

const ClientsList = props => {
	const { isMobile } = useDeviceDetect();
	if (isMobile) {
		return;
	} else {
		return (
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Ime i prezime</th>
						<th>Telefon</th>
						<th>E-mail</th>
						<th>Zadnji Termin</th>
						<th>Duguje</th>
						<th>Nije došao</th>
						<th>Platio</th>
						<th>Profil</th>
						<th>Email</th>
						<th>Izmeni</th>
						<th>Ukloni</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Marko Mirkovic</td>
						<td>0600000000</td>
						<td>markomirkovicsmkadfada@njk.com</td>
						<td>01.02.2021.</td>
						<td>1500 din</td>
						<td>3</td>
						<td>5200 din</td>
						<td>Profil</td>
						<td>Email</td>
						<td>Izmeni</td>
						<td>Ukloni</td>
					</tr>
				</tbody>
			</table>
		);
	}
};

export default ClientsList;
