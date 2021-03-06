/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import axios from '../../utils/Axios/axios-appointments';
import useDeviceDetect from '../../utils/UseDeviceDetect';
import Clients from '../DataFromBE/Clients';
import Appointments from '../DataFromBE/Appointments';
import ServiceProvidersServices from '../DataFromBE/ServiceProvidersServices';

import WorkingHours from './WorkingHours';
import Days from './RightTable/CalHead/Days';
import Time from './LeftTable/Time';
import CalBodyRow from './RightTable/CalBody/CalBodyRow';
import Backdrop from '../UI/Backdrop';
import CalNav from './Nav/CalNav';
import RegCodeClientForm from './Forms/RegCodeClientForm';
import ClientPickerForm from './Forms/ClientPickerForm';
import ServicePickerForm from './Forms/ServicePickerForm';
import Input from '../UI/Forms/Input';
import Label from '../UI/Forms/Label';

import classes from './Calendar.module.scss';
import classesUI from '../UI/UI.module.scss';

const Calendar = (props) => {
  const { isMobile } = useDeviceDetect();
  const isPageLoad = useRef(true);
  const checkedServices = [];

  const [appointment, setAppointment] = useState({
    date: null,
    time: null,
    serviceId: null,
    userId: null,
    name: '',
    phone: '',
    email: '',
    color: 'orange',
  });
  const [clickedCell, setClickedCell] = useState([
    {
      date: null,
      time: null,
    },
  ]);
  const [chosenClient, setChosenClient] = useState([
    {
      userId: null,
      name: '',
      phone: '',
      email: '',
    },
  ]);

  const [displayClientPicker, setDisplayClientPicker] = useState('none');
  const [displayServicesPicker, setDisplayServicesPicker] = useState('none');
  const [week, setWeek] = useState(0);
  const [displayRegCodeClient, setDisplayRegCodeClient] = useState('none');

  const cloneDiv = useRef(null);
  const cloneScrollTop = useRef(null);
  const cloneHeadScrollLeft = useRef(null);

  function scrollPos() {
    const body = cloneDiv.current.scrollTop;
    cloneScrollTop.current.scrollTop = body;
  }

  function scrollPosHead() {
    const body = cloneDiv.current.scrollLeft;
    cloneHeadScrollLeft.current.scrollLeft = body;
  }

  /// ////////////// Date menagemant start/////////////////
  const currYear = moment().format('YYYY');
  /* const currMonday_ms = moment()
    .locale('sr')
    .add(7 * week, 'days')
    .weekday(0)
    .format('MMM D, YYY')
    .toUpperCase(); */
  const currMonday = moment()
    .locale('sr')
    .add(7 * week, 'days')
    .weekday(0)
    .format(isMobile ? 'D.MM' : 'D.MMM')
    .toUpperCase();
  const currSunday = moment()
    .locale('sr')
    .add(7 * week, 'days')
    .weekday(6)
    .format(isMobile ? 'D.MM' : 'D.MMM')
    .toUpperCase(); // next Sunday .add(7, 'days')
  const currMondayName = (i) =>
    moment()
      .locale('sr')
      .add(7 * week, 'days')
      .weekday(i)
      .format('ddd / D.MMM')
      .toUpperCase();

  const nextWeek = () => {
    setWeek((w) => w + 1);
  };

  const prevWeek = () => {
    setWeek((w) => w - 1);
  };
  /// /////////////// Date menagemant end//////////////////

  const ServiceProviderCalendar = (
    <div
      className={classes.Calendar}
      style={{
        marginLeft: isMobile ? '5px' : '60px',
        width: isMobile ? '97%' : '92%',
      }}
    >
      {/* left tabel, fixed horizontaly, scrollable verticaly */}
      <table className={classes.calLeftTable}>
        <thead>
          <tr>
            <th>{currYear}</th>
          </tr>
        </thead>
        <tbody ref={cloneScrollTop}>
          {WorkingHours.map((obj) => (
            <Time
              minMaxWorkingHours={obj.minMaxWorkingHours}
              key={obj.minMaxWorkingHours}
            />
          ))}
        </tbody>
      </table>
      {/* right tabel, fixed verticaly, scrollable horizontaly */}
      <table className={classes.calRightTable}>
        <thead
          ref={cloneHeadScrollLeft}
          style={{ width: isMobile ? '100%' : '97%' }}
        >
          <tr>
            {WorkingHours.map((obj, i) => (
              <Days
                days={obj.daysInWeek}
                key={obj.daysInWeek}
                date={currMondayName}
              />
            ))}
          </tr>
        </thead>
        <tbody
          ref={cloneDiv}
          style={{ width: isMobile ? '100%' : '97%' }}
          onScroll={() => {
            scrollPos();
            scrollPosHead();
          }}
        >
          {WorkingHours.map((obj, i) => (
            <CalBodyRow
              daysInWeek={obj.daysInWeek}
              minMaxWorkingHours={obj.minMaxWorkingHours}
              key={i}
              workingHoursInWeek={obj.workingHoursInWeek}
              setClickedCell={setClickedCell}
              clickedCellState={clickedCell}
              Appointments={Appointments}
              clientPicker={() => {
                setDisplayClientPicker('block'), props.showBackdrop();
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

  const RegCodeClientHandler = () => {
    alert('Uspesna registracija'), setDisplayRegCodeClient('none');
  };

  const BackdropSideDrawer = () => {
    if (isMobile) {
      return <Backdrop display={() => props.displaySideDrawerBackdrop} />;
    }
    null;
  };

  const pickServices = (obj) => {
    if (checkedServices.includes(obj.serviceId)) {
      checkedServices.splice(
        checkedServices.findIndex((el) => el === obj.serviceId),
        1
      );
    } else {
      checkedServices.push(obj.serviceId);
    }
  };

  const appointmentAddHandler = () => {
    const api = axios
      .post('/appointments.json', appointment)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    api;
  };

  useEffect(() => {
    if (isPageLoad.current) {
      isPageLoad.current = false;
      return;
    }
    appointmentAddHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  return (
    <>
      <RegCodeClientForm
        displayRegCodeClient={displayRegCodeClient}
        RegCodeClientHandler={RegCodeClientHandler}
        setDisplayRegCodeClient={setDisplayRegCodeClient}
      />
      <ClientPickerForm
        displayClientPicker={displayClientPicker}
        setDisplayClientPicker={setDisplayClientPicker}
        setDisplayServicesPicker={setDisplayServicesPicker}
        hideBackdrop={props.hideBackdrop}
        bodyDataMob={Clients.map((user) => (
          <div
            className={classesUI.ClientsMob}
            key={user.id}
            onClick={() => setDisplayServicesPicker('block')}
          >
            <tr>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>{user.email}</td>
            </tr>
          </div>
        ))}
        bodyData={Clients.map((user) => (
          <tr
            className={classesUI.Clients}
            key={user.id}
            onClick={() => {
              setDisplayServicesPicker('block'),
                setChosenClient({
                  ...chosenClient,
                  userId: user.userId,
                  name: user.name,
                  phone: user.phone,
                  email: user.email,
                });
            }}
          >
            <td>{user.name}</td>
            <td style={{ width: '180px', minWidth: '180px' }}>{user.phone}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      />
      <ServicePickerForm
        displayServicesPicker={displayServicesPicker}
        setDisplayServicesPicker={setDisplayServicesPicker}
        setDisplayClientPicker={setDisplayClientPicker}
        hideBackdrop={props.hideBackdrop}
        setAppointment={() =>
          setAppointment({
            ...appointment,
            date: clickedCell.date,
            time: clickedCell.time,
            serviceId: checkedServices,
            userId: chosenClient.userId,
            name: chosenClient.name,
            phone: chosenClient.phone,
            email: chosenClient.email,
          })
        }
        bodyDataMob={ServiceProvidersServices.map((serv) => (
          <div className={classesUI.ServicesMob} key={serv.serviceId}>
            <tr>
              <td>{serv.name}</td>
              <td style={{ width: '20%' }} rowSpan="3">
                <Input type="checkbox" id={`chkbox${serv.serviceId}`} />
                <Label
                  htmlFor={`chkbox${serv.serviceId}`}
                  className={classesUI.checkbox}
                />
              </td>
            </tr>
            <tr>
              <td>{serv.time}</td>
            </tr>
            <tr>
              <td>{serv.price}</td>
            </tr>
          </div>
        ))}
        headData={
          <tr>
            <th style={{ width: '100%' }}>NAZIV USLUGE</th>
            <th style={{ width: '100px', minWidth: '150px' }}>DUŽINA</th>
            <th style={{ width: '100px', minWidth: '150px' }}>CENA</th>
            <th style={{ width: '100px', minWidth: '100px' }}>IZBOR</th>
          </tr>
        }
        bodyData={ServiceProvidersServices.map((serv) => (
          <tr key={serv.serviceId} className={classesUI.Services}>
            <td style={{ width: '100%' }}>{serv.name}</td>
            <td style={{ width: '100px', minWidth: '150px' }}>{serv.time}</td>
            <td style={{ width: '100px', minWidth: '150px' }}>{serv.price}</td>
            <td style={{ width: '100px', minWidth: '100px' }}>
              <Input
                type="checkbox"
                id={`chkbox${serv.serviceId}`}
                onClick={() => pickServices(serv)}
              />
              <Label
                htmlFor={`chkbox${serv.serviceId}`}
                className={classesUI.checkbox}
              />
            </td>
          </tr>
        ))}
      />
      {BackdropSideDrawer}
      <CalNav
        leftArrow="<< nedelja"
        leftMargin={isMobile ? '5px 0 5px 5px' : '5px 0 5px 60px'}
        leftFloat="left"
        prevWeek={prevWeek}
        nextWeek={nextWeek}
        rightArrow="nedelja >>"
        rightMargin={isMobile ? '5px 2vw 5px 0' : '5px 5.2vw 5px 0'}
        rightFloat="right"
        currWeek={`${currMonday} - ${currSunday}`}
      />
      {ServiceProviderCalendar}
    </>
  );
};

export default Calendar;
