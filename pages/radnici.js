import { useState, useEffect, useRef } from 'react';
import { useDeviceDetect, responseHandler } from '../helpers/universalFunctions';
import Head from 'next/head';
import Layout from '../Components/hoc/Layout/Layout';
import { auth } from '../helpers/auth';
import { fetchJson } from '../api/fetchJson';
import { getAllEmployees } from '../api/getAllEmployees';
import ResponseModal from '../Components/UI/Modal/ResponseModal';
import InfoModal from '../Components/UI/Modal/InfoModal';
import ListBody from '../Components/UI/List/ListBody/ListBody';
import ListHead from '../Components/UI/List/ListHead/ListHead';
import WrappedTools from '../Components/UI/WrappedTools';
import Loader from '../Components/UI/Loader';

import classes from '../Components/Navigation/Navigation.module.scss';

const Radnici = props => {
	const { isMobile } = useDeviceDetect();
	const isPageLoad = useRef(true);
	const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
	const modalAnimationOut = isMobile ? classes.modalOutMob : classes.modalOutPC;
	const [displayAddEmployeesForm, setDisplayAddEmployeesForm] = useState('none');
	const [displayWrappedTools, setDisplayWrappedTools] = useState('none');
	const [isLoading, setIsLoading] = useState(false);
	const [formInput, setFormInput] = useState(initServicesForm);
	const [employeesData, setEmployeesData] = useState(props.employees);
	const [employeeId, setEmployeeId] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [showBackdrop, setShowBackdrop] = useState('');
	const [completnessMessage, setCompletnessMessage] = useState('Uspešno sačuvano!');
	const [showInfoModal, setShowInfoModal] = useState('');
	const [showResponseModal, setShowResponseModal] = useState({
		animation: '',
		message: null,
		border: '',
	});

	const displayWrappedButtonsMob = condition => {
		if (isMobile && condition === 'block') {
			return true;
		} else return false;
	};

	const resetForm = () => {
		isMobile ? {} : setEmployeeId(null);
		setEditMode(false);
		setFormInput(initServicesForm);
	};

	const errorMessage = message => {
		responseHandler(setShowResponseModal, modalAnimationIn, message, 'red');
		setShowBackdrop(classes.backdropIn);
		setIsLoading(false);
	};

	const completnessMessageHandler = message => {
		setShowInfoModal(modalAnimationIn);
		setIsLoading(false);
		setCompletnessMessage(message);
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		const autoModalDisplay = () => {
			setShowInfoModal(modalAnimationOut);
		};

		const timer = setTimeout(() => {
			autoModalDisplay();
		}, 2000);

		return () => clearTimeout(timer);
	}, [showInfoModal]);

	const getAllEmployeesHandler = async () => {
		const api = await getAllEmployees()
			.then(response => {
				console.log(response);
				const serviceSettings = response.data.map(service => {
					return service;
				});
				setServicesData(serviceSettings);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
					error.response.data.map(err => {
						props.errorMessage(err.errorMessage);
					});
				} else if (error.request) {
					console.log(error.request);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				} else {
					console.log(error);
					props.errorMessage('Došlo je do greške, kontaktirajte nas putem kontakt forme');
				}
			});
		return api;
	};

	return (
		<div>
			<div></div>
		</div>
	);
};

export async function getServerSideProps(ctx) {
	const token = await auth(ctx);
	const serviceProvidersUrl = `users/getAllServiceProviders`;
	const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token);
	const employeesUrl = `users/getAllEmployees`;
	const resEmployees = await fetchJson(employeesUrl, 'get', token);
	const guideStatusUrl = `users/getCompanyGuideStatus`;
	const resGuideStatus = await fetchJson(guideStatusUrl, 'get', token);

	const serviceProviders = resServiceProviders.data.map(name => {
		return name;
	});

	const employees = resEmployees.data.map(name => {
		return name;
	});

	const userStatus = resGuideStatus.data;

	return {
		props: {
			token,
			serviceProviders,
			employees,
			userStatus,
		},
	};
}

export default Radnici;
