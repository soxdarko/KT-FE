import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect } from '../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPaperPlane, faEdit, faIdCard, faWrench } from '@fortawesome/free-solid-svg-icons';

import classes from '../UI/UI.module.scss';

const ClientsList = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const [dimensions, setDimensions] = React.useState(null);
	const [iWidth, setIWidth] = useState(null);
	const [nameWidth, setNameWidth] = useState(null);
	const [phoneWidth, setPhoneWidth] = useState(null);
	const [emailWidth, setEmailWidth] = useState(null);
	const [infoWidth, setInfoWidth] = useState(null);
	const [inviteWidth, setInviteWidth] = useState(null);
	const [editWidth, setEditWidth] = useState(null);
	const [removeWidth, setRemoveWidth] = useState(null);

	const thead_i = useRef(null);
	const thead_name = useRef(null);
	const thead_phone = useRef(null);
	const thead_email = useRef(null);
	const thead_info = useRef(null);
	const thead_invite = useRef(null);
	const thead_edit = useRef(null);
	const thead_remove = useRef(null);

	const handleResize = () => {
		setDimensions({
			width: window.innerWidth,
		});
	};

	const indexNum = i => {
		const index = i + 1;
		if (index < 10) {
			return '00' + index;
		} else if (index > 9 && index < 100) {
			return '0' + index;
		} else if (index > 99) {
			return index;
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize, false);
	}, []);

	useEffect(() => {
		setIWidth(thead_i.current.offsetWidth);
		setNameWidth(thead_name.current.offsetWidth);
		setPhoneWidth(thead_phone.current.offsetWidth);
		setEmailWidth(thead_email.current.offsetWidth);
		setInfoWidth(thead_info.current.offsetWidth);
		setInviteWidth(thead_invite.current.offsetWidth);
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
					{props.clientsData
						.filter(
							data =>
								data.name.toLowerCase().includes(props.searchInput) ||
								(data.mobOperator + data.phone).includes(props.searchInput)
						)
						.map((client, i) => {
							return (
								<div className={classes.TbodyRow}>
									<div className={classes.NumMob}>{indexNum(i)}</div>
									<div className={classes.ListDataContainer}>
										<div>{client.name}</div>
										<div>{client.phone}</div>
										<div>{client.email}</div>
									</div>
									<div
										className={classes.ListOptions}
										onClick={() => {
											props.setDisplayWrappedTools('flex'), props.setClientId(client.id);
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
						<div ref={thead_name} style={{ width: '60vw' }}>
							IME I PREZIME
						</div>
						<div ref={thead_phone} style={{ width: '30vw' }}>
							TELEFON
						</div>
						<div ref={thead_email} style={{ width: '100vw' }}>
							E-MAIL
						</div>
						<div ref={thead_info} style={{ width: '5vw' }}>
							INFO
						</div>
						<div ref={thead_invite} style={{ width: '7vw' }}>
							POZIVNICA
						</div>
						<div ref={thead_edit} style={{ width: '5vw' }}>
							IZMENI
						</div>
						<div ref={thead_remove} style={{ width: '5vw' }}>
							UKLONI
						</div>
					</div>
				</div>
				<div className={classes.Tbody}>
					{props.clientsData
						.filter(
							data =>
								data.name.toLowerCase().includes(props.searchInput) ||
								(data.mobOperator + data.phone).includes(props.searchInput)
						)
						.map((client, i) => {
							return (
								<div className={classes.TbodyRow} key={client.id}>
									<div style={{ width: iWidth }}>{indexNum(i)}</div>
									<div style={{ width: nameWidth }}>{client.name}</div>
									<div style={{ width: phoneWidth }}>{client.phone}</div>
									<div style={{ width: emailWidth }}>{client.email}</div>
									<div
										style={{ width: infoWidth }}
										onClick={() => {
											props.setDisplayDescription('block');
											props.setShowBackdrop(classes.backdropIn);
											props.setDescriptionEdit(true);
											props.setClientId(client.id);
										}}>
										<FontAwesomeIcon
											icon={faIdCard}
											className={[classes.Icon, props.IconClassName].join(' ')}
										/>
									</div>
									<div style={{ width: inviteWidth }}>
										<FontAwesomeIcon
											icon={faPaperPlane}
											className={[classes.Icon, props.IconClassName].join(' ')}
											style={{ color: 'limegreen' }}
										/>
									</div>
									<div
										style={{ width: editWidth }}
										onClick={() => {
											props.setDisplayAddClientForm('block');
											props.setShowBackdrop(classes.backdropIn);
											props.setEditMode(true);
											props.setClientId(client.id);
										}}>
										<FontAwesomeIcon
											icon={faEdit}
											className={[classes.Icon, props.IconClassName].join(' ')}
											style={{ color: 'yellow' }}
										/>
									</div>
									<div
										style={{ width: removeWidth }}
										onClick={() => {
											props.setClientId(client.id);
											props.confirmHandler(
												props.setShowConfirmModal,
												'Da li ste sigurni da želite ukloniti klijenta sa liste?',
												!props.triger
											);
											props.setShowBackdrop(classes.backdropIn);
										}}>
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

export default ClientsList;
