import { useEffect, useRef } from 'react';
import { useDeviceDetect, useWindowSize } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPaperPlane, faEdit, faIdCard, faWrench } from '@fortawesome/free-solid-svg-icons';

import classes from '../UI/UI.module.scss';

const ClientsList = props => {
	const isPageLoad = useRef(true);
	const { browserWidth } = useWindowSize();
	const { isMobile } = useDeviceDetect();

	const thead_i = useRef(null);
	const thead_name = useRef(null);
	const thead_phone = useRef(null);
	const thead_email = useRef(null);
	const thead_lastAppointment = useRef(null);
	const thead_owes = useRef(null);
	const thead_missed = useRef(null);
	const thead_paid = useRef(null);
	const thead_profile = useRef(null);
	const thead_invite = useRef(null);
	const thead_edit = useRef(null);
	const thead_remove = useRef(null);

	const tbody_i = useRef(null);
	const tbody_name = useRef(null);
	const tbody_phone = useRef(null);
	const tbody_email = useRef(null);
	const tbody_lastAppointment = useRef(null);
	const tbody_owes = useRef(null);
	const tbody_missed = useRef(null);
	const tbody_paid = useRef(null);
	const tbody_profile = useRef(null);
	const tbody_invite = useRef(null);
	const tbody_edit = useRef(null);
	const tbody_remove = useRef(null);

	const tbodyWidthClone = (theadCellWidth, tbodyCellWidth) => {
		const width = tbodyCellWidth.current.offsetWidth;
		theadCellWidth.current.offsetWidth = width;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		/* 
		console.log(tbody_name.current.offsetWidth); */

		tbodyWidthClone(thead_i, tbody_i);
		tbodyWidthClone(thead_name, tbody_name);
		tbodyWidthClone(thead_phone, tbody_phone);
		tbodyWidthClone(thead_email, tbody_email);
		tbodyWidthClone(thead_lastAppointment, tbody_lastAppointment);
		tbodyWidthClone(thead_owes, tbody_owes);
		tbodyWidthClone(thead_missed, tbody_missed);
		tbodyWidthClone(thead_paid, tbody_paid);
		tbodyWidthClone(thead_profile, tbody_profile);
		tbodyWidthClone(thead_invite, tbody_invite);
		tbodyWidthClone(thead_edit, tbody_edit);
		tbodyWidthClone(thead_remove, tbody_remove);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isMobile) {
		return (
			<div className={classes.ListTableMob}>
				<div className={classes.Tbody}>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div className={classes.TbodyRow}>
						<div className={classes.NumMob}>001</div>
						<div className={classes.ListDataContainer}>
							<div>Marko Mirkovic</div>
							<div>0600000000</div>
							<div>jovan.stefanovic87su@gmaILS.com</div>
							<div>01.02.2021.</div>
						</div>
						<div className={classes.ListOptions}>
							<FontAwesomeIcon
								icon={faWrench}
								className={[classes.Icon, props.IconClassName].join(' ')}
								onClick={() => props.setDisplayWrappedTools('flex')}
							/>
						</div>
					</div>
					<div style={{ height: '50vw' }}></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={classes.ListTable}>
				<div className={classes.Thead}>
					<div className={classes.TheadRow}>
						<div ref={thead_i}>#</div>
						<div ref={thead_name}>IME I PREZIME</div>
						<div ref={thead_phone}>TELEFON</div>
						<div ref={thead_email}>E-MAIL</div>
						<div ref={thead_lastAppointment}>ZADNJI TERMIN</div>
						<div ref={thead_owes}>DUGUJE</div>
						<div ref={thead_missed}>NIJE DOŠAO</div>
						<div ref={thead_paid}>PLATIO</div>
						<div ref={thead_profile}>PROFIL</div>
						<div ref={thead_invite}>POZIVNICA</div>
						<div ref={thead_edit}>IZMENI</div>
						<div ref={thead_remove}>UKLONI</div>
					</div>
				</div>
				<div className={classes.Tbody}>
					<div className={classes.TbodyRow}>
						<div style={{ width: '2vw' }} ref={tbody_i}>
							001
						</div>
						<div style={{ width: '15vw' }} ref={tbody_name}>
							Marko Mirkovic
						</div>
						<div style={{ width: '7vw' }} ref={tbody_phone}>
							0600000000
						</div>
						<div style={{ flex: 1 }} ref={tbody_email}>
							jovan.stefanovic87su@gmaILS.com
						</div>
						<div style={{ width: '7vw' }} ref={tbody_lastAppointment}>
							01.02.2021.
						</div>
						<div style={{ width: '5vw' }} ref={tbody_owes}>
							1500 din
						</div>
						<div style={{ width: '6vw' }} ref={tbody_missed}>
							3
						</div>
						<div style={{ width: '5vw' }} ref={tbody_paid}>
							5200 din
						</div>
						<div style={{ width: '3vw' }} ref={tbody_profile}>
							<FontAwesomeIcon
								icon={faIdCard}
								className={[classes.Icon, props.IconClassName].join(' ')}
							/>
						</div>
						<div style={{ width: '5vw' }} ref={tbody_invite}>
							<FontAwesomeIcon
								icon={faPaperPlane}
								className={[classes.Icon, props.IconClassName].join(' ')}
								style={{ color: 'limegreen' }}
							/>
						</div>
						<div style={{ width: '3vw' }} ref={tbody_edit}>
							<FontAwesomeIcon
								icon={faEdit}
								className={[classes.Icon, props.IconClassName].join(' ')}
								style={{ color: 'yellow' }}
							/>
						</div>
						<div style={{ width: '3vw' }} ref={tbody_remove}>
							<FontAwesomeIcon
								icon={faBan}
								className={[classes.Icon, props.IconClassName].join(' ')}
								style={{ color: 'red' }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ClientsList;
