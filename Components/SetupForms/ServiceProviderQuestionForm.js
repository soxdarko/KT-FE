import { useState, useEffect, useRef } from 'react';
import { addNewServiceProvider } from '../../api/addNewServiceProvider';
import { getAllServiceProviders } from '../../api/getAllServiceProviders';

import QuestionForm from './QuestionForm/QuestionForm';

const ServiceProviderQuestionForm = props => {
	const isPageLoad = useRef(true);
	const [singleServiceProvider, setSingleServiceProvider] = useState(false);

	const getAllServiceProvidersHandler = async () => {
		const api = await getAllServiceProviders(props.token)
			.then(response => {
				const getServiceProviderName = response.data.map(serviceProvider => {
					return serviceProvider;
				});
				props.setServiceProviderData(getServiceProviderName);
				console.log(getServiceProviderName);
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		return api;
	};

	const addNewServiceProviderHandler = () => {
		const api = addNewServiceProvider({}, props.token)
			.then(response => {
				console.log(response);
				props.setIsLoading(false);
				props.setDisplayServiceProviderQuestionForm('none');
				props.setDisplayEmployeeQuestionForm('block');
				getAllServiceProvidersHandler();
			})
			.catch(error => {
				props.setIsLoading(false);
				if (error.response) {
					console.log(error.response);
					/* window.location = '/'; */
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('nesto drugo');
				}
			});
		api;
	};

	useEffect(() => {
		if (isPageLoad.current) {
			isPageLoad.current = false;
			return;
		}
		addNewServiceProviderHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleServiceProvider]);

	const singleCompanyHandler = e => {
		e.preventDefault();
		setSingleServiceProvider(true);
		props.setIsLoading(true);
	};

	return (
		<QuestionForm
			title="Da li imate više salona?"
			displayQuestionForm={props.displayServiceProviderQuestionForm}
			onSubmit={() => {
				props.setDisplayServiceProviderQuestionForm('none'),
					props.setDisplayAddServiceProvidersForm('block');
			}}
			onDecline={e => {
				singleCompanyHandler(e);
			}}
		/>
	);
};

export default ServiceProviderQuestionForm;
