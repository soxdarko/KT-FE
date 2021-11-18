import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

import classes from '../UI/UI.module.scss';

const ServicesList = props => {
	const { isMobile } = useDeviceDetect();

	const indexNum = i => {
		const index = i + 1;
		if (index < 10) {
			return '00' + index;
			1;
		} else if (index > 9 && index < 100) {
			return '0' + index;
			1;
		} else if (index > 99) {
			return index;
		}
	};

	if (isMobile) {
		return (
			<div className={classes.ListTableMob}>
				<div className={classes.Tbody}>
					{props.servicesData
						.filter(
							data =>
								data.name.toLowerCase().includes(props.searchInput) ||
								data.description.toLowerCase().includes(props.searchInput)
						)
						.map((service, i) => {
							return (
								<div className={classes.TbodyRow} key={service.id}>
									<div className={classes.NumMob}>{indexNum(i)}</div>
									<div className={classes.ListDataContainer}>
										<div>{service.name}</div>
										<div>{service.description}</div>
										<div>{service.duration + ' ' + 'min'}</div>
										<div>{service.price + ' ' + 'rsd'}</div>
									</div>
									<div className={classes.ListOptions}>
										<FontAwesomeIcon
											icon={faWrench}
											className={[classes.Icon, props.IconClassName].join(' ')}
											onClick={() => props.setDisplayWrappedTools('flex')}
										/>
									</div>
								</div>
							);
						})}
					<div style={{ height: '50vw' }}></div>
				</div>
			</div>
		);
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
