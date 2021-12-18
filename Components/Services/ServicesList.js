import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPaperPlane, faEdit, faIdCard, faWrench } from '@fortawesome/free-solid-svg-icons';

import classes from '../UI/UI.module.scss';
import { Button } from 'antd';

const ServicesList = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [dimensions, setDimensions] = React.useState(null);
	const [iWidth, setIWidth] = useState(null);
	const [serviceNameWidth, setServiceNameWidth] = useState(null);
	const [descriptionWidth, setDescriptionWidth] = useState(null);
	const [durationWidth, setDurationWidth] = useState(null);
	const [priceWidth, setPriceWidth] = useState(null);
	const [settingWidth, setSettingsWidth] = useState(null);
	const [editWidth, setEditWidth] = useState(null);
	const [removeWidth, setRemoveWidth] = useState(null);

	const thead_i = useRef(null);
	const thead_srvicename = useRef(null);
	const thead_description = useRef(null);
	const thead_duration = useRef(null);
	const thead_price = useRef(null);
	const thead_settings = useRef(null);
	const thead_edit = useRef(null);
	const thead_remove = useRef(null);

	const handleResize = () => {
		setDimensions({
			width: window.innerWidth,
		});
	};
	React.useEffect(() => {
		window.addEventListener('resize', handleResize, false);
	}, []);

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

	useEffect(() => {
		setIWidth(thead_i.current.offsetWidth);
		setServiceNameWidth(thead_srvicename.current.offsetWidth);
		setDescriptionWidth(thead_description.current.offsetWidth);
		setDurationWidth(thead_duration.current.offsetWidth);
		setPriceWidth(thead_price.current.offsetWidth);
		setSettingsWidth(thead_settings.current.offsetWidth);
		setEditWidth(thead_edit.current.offsetWidth);
		setRemoveWidth(thead_remove.current.offsetWidth);

		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dimensions]);

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
									<div
										className={classes.ListOptions}
										onClick={() => {
											props.setDisplayWrappedTools('flex');
											props.setServiceId(service.id);
											props.setServiceSettingsData(props.serviceSettings[i]);
										}}>
										<FontAwesomeIcon
											icon={faWrench}
											className={[classes.Icon, props.IconClassName].join(' ')}
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
			<div className={classes.ListTable}>
				<div className={classes.Thead}>
					<div className={classes.TheadRow}>
						<div ref={thead_i} style={{ width: '7vw' }}>
							#
						</div>
						<div ref={thead_srvicename} style={{ width: '60vw' }}>
							NAZIV USLUGE
						</div>
						<div ref={thead_description} style={{ width: '60vw' }}>
							OPIS
						</div>
						<div ref={thead_duration} style={{ width: '15vw' }}>
							TRAJANJE
						</div>
						<div ref={thead_price} style={{ width: '10vw' }}>
							CENA
						</div>
						<div ref={thead_settings} style={{ width: '15vw' }}>
							PODEŠAVANJA
						</div>
						<div ref={thead_edit} style={{ width: '15vw' }}>
							IZMENI
						</div>
						<div ref={thead_remove} style={{ width: '15vw' }}>
							BRIŠI
						</div>
					</div>
				</div>
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
									<div style={{ width: iWidth }}>{indexNum(i)}</div>
									<div style={{ width: serviceNameWidth }}>{service.name}</div>
									<div style={{ width: descriptionWidth }}>{service.description}</div>
									<div style={{ width: durationWidth }}>{service.duration} min</div>
									<div style={{ width: priceWidth }}>{service.price} din</div>
									<div style={{ width: settingWidth }}>
										<FontAwesomeIcon
											icon={faWrench}
											className={[classes.Icon, props.IconClassName].join(' ')}
											onClick={() => {
												props.setDisplayServiceSettings('flex');
												props.setServiceId(service.id);
												props.setServiceSettingsData(props.serviceSettings[i]);
											}}
										/>
									</div>
									<div
										style={{ width: editWidth }}
										onClick={() => {
											props.setDisplayAddServicesForm('block');
											props.setEditMode(true);
											props.setServiceId(service.id);
											props.setServiceSettingsData(props.serviceSettings[i]);
										}}>
										<FontAwesomeIcon
											icon={faEdit}
											className={[classes.Icon, props.IconClassName].join(' ')}
											style={{ color: 'yellow' }}
										/>
									</div>
									<div style={{ width: removeWidth }}>
										<FontAwesomeIcon
											icon={faBan}
											className={[classes.Icon, props.IconClassName].join(' ')}
											style={{ color: 'red' }}
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
};

export default ServicesList;
