import { useState } from 'react'
import {
  useDeviceDetect,
  responseHandler,
  infoMessageHandler,
  getResponseData,
  getErrorMessage,
} from '../helpers/universalFunctions'
import Head from 'next/head'
import Layout from '../Components/hoc/Layout/Layout'
import { auth } from '../helpers/auth'
import { fetchJson } from '../api/fetchJson'
import { getAllServices } from '../api/getAllServices'
import { getSettingsServices } from '../api/getSettingsServices'
import { saveSettingsServices } from '../api/saveSettingsServices'
import { deleteService } from '../api/deleteService'
import ResponseModal from '../Components/UI/Modal/ResponseModal'
import ConfirmModal from '../Components/UI/Modal/ConfirmModal'
import InfoModal from '../Components/UI/Modal/InfoModal'
import initServicesForm from '../Components/SetupForms/initServicesForm'
import Backdrop from '../Components/UI/Backdrop'
import ServicesList from '../Components/Services/ServicesList'
import AddServicesForm from '../Components/SetupForms/AddServicesForm'
import WrappedTools from '../Components/UI/WrappedTools'
import ServiceSettingsForm from '../Components/Services/ServiceSettingsForm'
import ServiceDescription from '../Components/UI/Forms/ServiceDescription'
import Loader from '../Components/UI/Loader'
import ServiceSettings from '../Components/UI/Forms/ServiceSettings'

import classes from '../Components/Navigation/Navigation.module.scss'

const Services = (props) => {
  const { isMobile } = useDeviceDetect()
  const [displayAddServicesForm, setDisplayAddServicesForm] = useState('none')
  const [displayWrappedTools, setDisplayWrappedTools] = useState('none')
  const [isLoading, setIsLoading] = useState(false)
  const [formInput, setFormInput] = useState(initServicesForm)
  const [servicesData, setServicesData] = useState(props.services)
  const [serviceSettings, setServiceSettings] = useState(props.serviceSettings)
  const [serviceSettingsData, setServiceSettingsData] = useState({})
  const [serviceId, setServiceId] = useState(null)
  const [checkedEmployees, setCheckedEmployees] = useState([])
  const [displayDescription, setDisplayDescription] = useState('none')
  const [serviceDescriptionData, setServiceDescriptionData] = useState(null)
  const [descriptionEdit, setDescriptionEdit] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showBackdrop, setShowBackdrop] = useState('')
  const [displayServiceSettings, setDisplayServiceSettings] = useState('none')
  const [showInfoModal, setShowInfoModal] = useState({
    triger: false,
    message: null,
  })
  const [showConfirmModal, setShowConfirmModal] = useState({
    triger: false,
    message: null,
  })
  const [showResponseModal, setShowResponseModal] = useState({
    triger: false,
    message: null,
    border: '',
  })
  const [holdBackdrop, setHoldBackdrop] = useState(true)

  const displayWrappedButtonsMob = (condition) => {
    if (isMobile && condition === 'block') {
      return true
    } else return false
  }

  const resetForm = () => {
    if (descriptionEdit) {
      return
    } else {
      isMobile ? {} : setServiceId(null)
      setEditMode(false)
    }
  }

  const saveSettingsServicesHandler = async () => {
    setIsLoading(false)
    const api = await saveSettingsServices(serviceSettingsData)
      .then(() => {
        setDisplayServiceSettings('none')
        infoMessageHandler(
          setShowInfoModal,
          'Uspešno sačuvano',
          !showInfoModal.triger,
        )
        getServiceSettingsHandler()
      })
      .catch((err) => {
        const errMessage = getErrorMessage(err.response)
        responseHandler(
          props.setShowResponseModal,
          errMessage,
          'red',
          !showResponseModal.triger,
        )
        !holdBackdrop ? setHoldBackdrop(true) : {}
      })
    api
  }

  const deleteServiceHandler = async () => {
    const api = await deleteService(serviceId)
      .then(() => {
        getAllServicesHandler()
        setDisplayWrappedTools('none')
        resetForm()
        infoMessageHandler(
          setShowInfoModal,
          'Usluga uspešno obrisana!',
          !showInfoModal.triger,
        )
      })
      .catch((err) => {
        const errMessage = getErrorMessage(err.response)
        responseHandler(
          props.setShowResponseModal,
          errMessage,
          'red',
          !showResponseModal.triger,
        )
        !holdBackdrop ? setHoldBackdrop(true) : {}
      })
    api
  }

  const getAllServicesHandler = async () => {
    const api = await getAllServices()
      .then((res) => {
        const getServiceSettingsData = getResponseData(res)
        setServicesData(getServiceSettingsData)
      })
      .catch((err) => {
        const errMessage = getErrorMessage(err.response)
        responseHandler(
          props.setShowResponseModal,
          errMessage,
          'red',
          !showResponseModal.triger,
        )
        setHoldBackdrop(false)
      })
    return api
  }

  const getServiceSettingsHandler = async () => {
    setIsLoading(false)
    const api = await getSettingsServices()
      .then((res) => {
        const getServiceSettingsData = getResponseData(res)
        setServiceSettings(getServiceSettingsData)
      })
      .catch((err) => {
        const errMessage = getErrorMessage(err.response)
        responseHandler(
          props.setShowResponseModal,
          errMessage,
          'red',
          !showResponseModal.triger,
        )
        setHoldBackdrop(false)
      })
    return api
  }

  function confirmModalSubmitHandler() {
    deleteServiceHandler(serviceId)
    setShowBackdrop(classes.backdropOut)
    setDisplayWrappedTools('none')
  }
  function newServiceHandler() {
    setDisplayAddServicesForm('block')
    setFormInput(initServicesForm)
  }
  function editServiceHandler() {
    setDisplayAddServicesForm('block')
    setEditMode(true)
  }

  console.log(props.token)

  return (
    <>
      <Head>
        <title>KlikTermin | Lista usluga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout
        displayLoginBtn="none"
        displayRegisterBtn="none"
        displayToolbarNavBtn="none"
        displayToolbarBookingBtn="none"
        displaySelect="none"
        displayNotifLabel="block"
        colorServicesIcon="#fc9815"
        classNameCal={classes.sideDrawerButtonActive}
        classNameClients={classes.sideDrawerButton}
        classNameServices={classes.sideDrawerButton}
        classNameProfile={classes.sideDrawerButton}
        classNameEmployeeSelect={classes.EmployeeSelect}
        selectData={props.employees}
        sms="10"
        license="5"
      />
      <Loader loading={isLoading} />
      <Backdrop backdropAnimation={showBackdrop} />
      <InfoModal showInfoModal={showInfoModal} borderColor="green" />
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        submitValue="Da"
        setShowBackdrop={setShowBackdrop}
        itemId={setServiceId}
        onSubmit={() => confirmModalSubmitHandler()}
      />
      <ResponseModal
        showResponseModal={showResponseModal}
        resetForm={resetForm}
        setShowBackdrop={setShowBackdrop}
        holdBackdrop={holdBackdrop}
        displayLinkButton="none"
        displayFormButton="block"
        setIsLoading={setIsLoading}
      />
      <WrappedTools
        displayWrappedTools={displayWrappedTools}
        setDisplayWrappedTools={setDisplayWrappedTools}
        setDisplayDescription={setDisplayDescription}
        setShowBackdrop={setShowBackdrop}
        descriptionEdit={descriptionEdit}
        setDescriptionEdit={setDescriptionEdit}
        setShowConfirmModal={setShowConfirmModal}
        triger={showConfirmModal.triger}
        setFormInput={setFormInput}
        setDataId={setServiceId}
        isEmployeesArray={true}
        setCheckedEmployees={setCheckedEmployees}
        setEditMode={setEditMode}
        onClickEdit={() => editServiceHandler()}
        initForm={initServicesForm}
        className={[
          classes.WrappedToolsContainer,
          classes.WrappedToolsWithChkBox,
        ].join(' ')}
        displayWrappedToolsChkBox="flex"
      >
        <ServiceSettingsForm
          serviceSettings={serviceSettings}
          serviceSettingsData={serviceSettingsData}
          setServiceSettingsData={setServiceSettingsData}
          serviceId={serviceId}
          saveSettingsServicesHandler={saveSettingsServicesHandler}
        />
      </WrappedTools>
      <ServiceSettings
        addForSelectedClassName={classes.addForSelectedService}
        display={displayServiceSettings}
        serviceId={serviceId}
        setDisplayServiceSettings={setDisplayServiceSettings}
        initServiceSettings={serviceSettings}
        serviceSettings={serviceSettings}
        serviceSettingsData={serviceSettingsData}
        setServiceSettingsData={setServiceSettingsData}
        setEditMode={setEditMode}
        setServiceId={setServiceId}
        saveSettingsServicesHandler={saveSettingsServicesHandler}
      />
      <ServiceDescription
        displayDescription={displayDescription}
        setDisplayDescription={setDisplayDescription}
        displayWrappedButtonsMob={displayWrappedButtonsMob}
        getAllServicesHandler={getAllServicesHandler}
        setShowInfoModal={setShowInfoModal}
        triger={showInfoModal.triger}
        formInput={formInput}
        setFormInput={setFormInput}
        setServicesData={setServicesData}
        setShowBackdrop={setShowBackdrop}
        setDescriptionEdit={setDescriptionEdit}
        setShowResponseModal={setShowResponseModal}
        serviceDescriptionData={serviceDescriptionData}
        setServiceDescriptionData={setServiceDescriptionData}
        checkedEmployees={checkedEmployees}
        serviceId={serviceId}
        resetForm={resetForm}
        setIsLoading={setIsLoading}
        triger={showResponseModal.triger}
      />
      <AddServicesForm
        setFormInput={setFormInput}
        displayAddServicesForm={displayAddServicesForm}
        setDisplayAddServicesForm={setDisplayAddServicesForm}
        serviceProviderData={props.serviceProviders}
        initServicesForm={initServicesForm}
        servicesFormInput={formInput}
        setServicesFormInput={setFormInput}
        servicesData={servicesData}
        setServicesData={setServicesData}
        serviceId={serviceId}
        setServiceId={setServiceId}
        employeeData={props.employees}
        checkedEmployees={checkedEmployees}
        setCheckedEmployees={setCheckedEmployees}
        editMode={editMode}
        setEditMode={setEditMode}
        setShowBackdrop={setShowBackdrop}
        setIsLoading={setIsLoading}
        displayEmployeesPicker="block"
        displayForward="none"
        displayForwardMob="none"
        setShowResponseModal={setShowResponseModal}
        setShowInfoModal={setShowInfoModal}
        validation={true}
        isSetupGuide={false}
        cancelAddService={() => props.cancelAddServiceHandler()}
        displayCancel={isMobile ? 'none' : 'inline-block'}
        getAllServicesHandler={getAllServicesHandler}
        resetForm={resetForm}
        triger={showResponseModal.triger}
      />
      <ServicesList
        servicesData={servicesData}
        setDisplayAddServicesForm={setDisplayAddServicesForm}
        setShowBackdrop={setShowBackdrop}
        setDisplayWrappedTools={setDisplayWrappedTools}
        setDisplayServiceSettings={setDisplayServiceSettings}
        newServiceHandler={newServiceHandler}
        setServiceId={setServiceId}
        setEditMode={setEditMode}
        serviceSettings={serviceSettings}
        setServiceSettings={setServiceSettings}
        setServiceSettingsData={setServiceSettingsData}
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        triger={showConfirmModal.triger}
      />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const token = await auth(ctx)
  const serviceProvidersUrl = `users/getAllServiceProviders`
  const resServiceProviders = await fetchJson(serviceProvidersUrl, 'get', token)
  const employeesUrl = `users/getAllEmployees`
  const resEmployees = await fetchJson(employeesUrl, 'get', token)
  const servicesUrl = `appointments/getAllServices`
  const resServices = await fetchJson(servicesUrl, 'get', token)
  const guideStatusUrl = `users/getCompanyGuideStatus`
  const resGuideStatus = await fetchJson(guideStatusUrl, 'get', token)
  const serviceSettingsUrl = `settings/getSettingsServices`
  const resServiceSettings = await fetchJson(serviceSettingsUrl, 'get', token)

  const serviceProviders = resServiceProviders.data.map((name) => {
    return name
  })

  const employees = resEmployees.data.map((name) => {
    return name
  })

  const services = resServices.data.map((name) => {
    return name
  })

  const userStatus = resGuideStatus.data

  const serviceSettings = resServiceSettings.data.map((setting) => {
    return setting
  })

  return {
    props: {
      token,
      serviceProviders,
      employees,
      services,
      userStatus,
      serviceSettings,
    },
  }
}

export default Services
