import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useDeviceDetect, getTimeString } from '../../helpers/universalFunctions';
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
import { getDateFromDayOfWeek } from '../../helpers/universalFunctions';
import { saveAppointment } from '../../api/saveAppointment';
import { v4 as uuidv4 } from 'uuid';
import InfoModal from '../UI/Modal/InfoModal';
import { getErrorMessage } from '../../helpers/universalFunctions';

const Calendar = (props) => {
    const { isMobile } = useDeviceDetect();
    const isPageLoad = useRef(true);
    const modalAnimationIn = isMobile ? classes.modalInMob : classes.modalInPC;
    const [checkedServices, setCheckedServices] = useState([]);
    const [daysInWeek, setDaysInWeek] = useState([]);
    const [minMaxWorkingHours, setMinMaxWorkingWours] = useState([]);
    const [workHourAppointments, setWorkHourAppointments] = useState([]);
    const days = ['Pon', 'Uto', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'];
    const [chosenClient, setChosenClient] = useState('');
    const [appointmentData, setAppointmentData] = useState(props.appointments);
    const [showInfoModal, setShowInfoModal] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        setAppointmentData(props.appointments);
    }, [props.appointments]);

    useEffect(() => {
        prepDaysInWeek();
    }, []);

    useEffect(() => {
        daysInWeek.length > 0 && prepMinMaxWorkingHours();
    }, [daysInWeek]);

    useEffect(() => {
        minMaxWorkingHours.length > 0 && prepWorkingHoursForEveryDay();
    }, [minMaxWorkingHours, appointmentData]);

    const prepDaysInWeek = () => {
        const prepDaysInWeek = days.map((d, i) => {
            return { day: d, date: getDateFromDayOfWeek(new Date(), i) };
        });
        setDaysInWeek(prepDaysInWeek);
    };

    const prepMinMaxWorkingHours = () => {
        let minHour = 1440; //24h
        let maxHour = 0;
        let cellDuration = 0;
        props.workingHours.map((h) => {
            const arr = [
                h.firstStartHour,
                h.firstEndHour,
                h.secondStartHour,
                h.secondEndHour,
            ].filter((h) => h);
            const hour = Math.min(...arr);
            cellDuration = h.cellsDuration;
            if (hour < minHour) minHour = hour;
        });
        props.workingHours.map((h) => {
            const arr = [
                h.firstStartHour,
                h.firstEndHour,
                h.secondStartHour,
                h.secondEndHour,
            ].filter((h) => h);
            const hour = Math.max(...arr);
            if (hour > maxHour) maxHour = hour;
        });

        const prepMinMaxWorkingHours = [];
        for (let h = minHour; h <= maxHour; h += cellDuration) {
            prepMinMaxWorkingHours.push(h);
        }
        setMinMaxWorkingWours(prepMinMaxWorkingHours);
    };

    const prepWorkingHoursForEveryDay = () => {
        let prepWorkingHoursArr = [];
        let workingHoursObj;
        daysInWeek.map((d) => {
            let dateInWeek = new Date(d.date).getTime();
            let breakMap = false;
            props.workingHours.map((w) => {
                let dateOfWorkingHours = new Date(w.date).getTime();
                if (!breakMap) {
                    if (dateInWeek == dateOfWorkingHours) {
                        workingHoursObj = w;
                        breakMap = true;
                    } else {
                        workingHoursObj = {
                            id: null,
                            date: d.date,
                            firstStartHour: null,
                            firstEndHour: null,
                            secondStartHour: null,
                            secondEndHour: null,
                            cellsDuration: null,
                            idAbsenceType: null,
                        };
                    }
                }
            });
            prepWorkingHoursArr.push(workingHoursObj);
        });

        prepWorkHourAppointment(minMaxWorkingHours, prepWorkingHoursArr);
    };

    const minMaxHourExist = (
        minMaxHour,
        firstStartHour,
        firstEndHour,
        secondStartHour,
        secondEndHour
    ) => {
        return (
            (minMaxHour >= firstStartHour && minMaxHour <= firstEndHour) ||
            (minMaxHour >= secondStartHour && minMaxHour <= secondEndHour)
        );
    };

    const prepWorkHourAppointment = (minMaxWorkingHours, workingHours) => {
        const prepWHA = [];
        workingHours.map((h, i) => {
            prepWHA.push({
                date: h.date,
                wha: [],
            });
            minMaxWorkingHours.map((minMaxHour) => {
                minMaxHourExist(
                    minMaxHour,
                    h.firstStartHour,
                    h.firstEndHour,
                    h.secondStartHour,
                    h.secondEndHour
                )
                    ? prepWHA[i].wha.push({
                          hours: minMaxHour,
                          enabled: true,
                          absence: h.idAbsenceType,
                          appointment: getAppointments(h.date, minMaxHour),
                      })
                    : prepWHA[i].wha.push({
                          hours: minMaxHour,
                          enabled: false,
                          absence: null,
                          appointment: {},
                      });
            });
        });
        setWorkHourAppointments(prepWHA);
    };

    const getAppointments = (date, minMaxHour) => {
        const appointment = appointmentData
            ?.map((a) => {
                let whDate = Date.parse(date.split('T')[0]);
                let apDate = Date.parse(a.dateStart.split('T')[0]);

                let aDateTime = new Date(a.dateStart);
                let aHour = aDateTime.getHours();
                let aMin = aDateTime.getMinutes();
                let aTime = aHour * 60 + aMin; // convert time to minutes

                return whDate == apDate && minMaxHour == aTime
                    ? {
                          id: a.id,
                          dateStart: a.dateStart,
                          dateEnd: a.dateEnd,
                          description: a.description,
                          idEmployee: a.idEmployee,
                          employeeName: a.employeeName,
                          idClient: a.idClient,
                          clientName: a.clientName,
                          clientPhone: a.clientPhone,
                          services: a.services,
                      }
                    : null;
            })
            .filter((a) => a);

        return appointment?.length > 0 ? appointment[0] : {};
    };

    const [clickedCell, setClickedCell] = useState([
        {
            date: null,
            time: null,
        },
    ]);

    const [displayClientPicker, setDisplayClientPicker] = useState('none');
    const [displayServicesPicker, setDisplayServicesPicker] = useState('none');
    const [week, setWeek] = useState(0);
    const [displayRegCodeClient, setDisplayRegCodeClient] = useState('none');

    const cloneDiv = useRef(0);
    const cloneScrollTop = useRef(0);
    const cloneHeadScrollLeft = useRef(0);

    const VerticalTaxing = () => {
        const scroll = cloneDiv.current.scrollTop;
        cloneScrollTop.current.scrollTop = scroll;
    };

    const HorisontalTaxing = () => {
        const scroll = cloneDiv.current.scrollLeft;
        cloneHeadScrollLeft.current.scrollLeft = scroll;
    };

    /// ////////////// Date menagemant start/////////////////
    const currYear = moment().format('YYYY');
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

    const minMaxHoursDisplay = () => minMaxWorkingHours.map((h) => getTimeString(h));

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
        setCheckedServices((services) => {
            const serviceCopy = [...services];
            const index = serviceCopy.findIndex((service) => (service.id = obj.id));
            if (index > -1) {
                serviceCopy.splice(index, 1);
            } else {
                serviceCopy.push({
                    id: obj.id,
                    price: obj.price,
                    duration: obj.duration,
                });
            }
            return serviceCopy;
        });
    };

    // useEffect(() => {
    // 	if (isPageLoad.current) {
    // 		isPageLoad.current = false;
    // 		return;
    // 	}
    // 	// eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [appointment]);

    const showMessage = (eventMessage) => {
        setShowInfoModal(modalAnimationIn);
        setInfoMessage(eventMessage);
        setTimeout(() => {
            setShowInfoModal('');
            setInfoMessage('');
        }, 3000);
    };

    const saveNewAppointment = () => {
        const durationSum = checkedServices
            .map((s) => s.duration)
            .reduce((sum, a) => sum + a, 0);
        const dateStart = clickedCell.date.replace(
            '00:00:00',
            getTimeString(clickedCell.time, true)
        );
        const dateEnd = clickedCell.date.replace(
            '00:00:00',
            getTimeString((clickedCell.time + durationSum) * 2, true)
        );
        const newAppointment = {
            Id: uuidv4(),
            DateStart: dateStart,
            DateEnd: dateEnd,
            IdEmployee: null,
            IdClient: chosenClient,
            Services: checkedServices.map((s) => ({
                IdService: s.id,
                Price: s.price,
            })),
            Deleted: false,
            Updated: false,
        };
        saveAppointment(newAppointment)
            .then((res) => props.refreshData())
            .catch((err) => {
                const errMessage = getErrorMessage(err.response);
                showMessage(errMessage);
            });
    };

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
                    <Time
                        minMaxWorkingHours={minMaxHoursDisplay()}
                        key={minMaxWorkingHours}
                    />
                </tbody>
            </table>
            {/* right tabel, fixed verticaly, scrollable horizontaly */}
            <table className={classes.calRightTable}>
                <thead
                    ref={cloneHeadScrollLeft}
                    style={{ width: isMobile ? '100%' : '97%' }}
                >
                    <tr>
                        <Days days={days} key={days} date={currMondayName} />
                    </tr>
                </thead>
                <tbody
                    ref={cloneDiv}
                    style={{ width: isMobile ? '100%' : '97%' }}
                    onScroll={() => {
                        VerticalTaxing(), HorisontalTaxing();
                    }}
                >
                    {minMaxWorkingHours.map((time) => (
                        <CalBodyRow
                            key={time}
                            time={time}
                            workHourAppointments={workHourAppointments}
                            setClickedCell={setClickedCell}
                            showMessage={showMessage}
                            clientPicker={() => {
                                setDisplayClientPicker('block'), props.showBackdrop();
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            <InfoModal
                message={infoMessage}
                modalAnimation={showInfoModal}
                borderColor="green"
            />
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
                bodyDataMob={props.employees.map((user) => (
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
                bodyData={props.employees.map((user) => (
                    <tr
                        className={classesUI.Clients}
                        key={user.id}
                        onClick={() => {
                            setDisplayServicesPicker('block'), setChosenClient(user.id);
                        }}
                    >
                        <td>{user.name}</td>
                        <td style={{ width: '180px', minWidth: '180px' }}>
                            {user.phone}
                        </td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            />
            <ServicePickerForm
                displayServicesPicker={displayServicesPicker}
                setDisplayServicesPicker={setDisplayServicesPicker}
                setDisplayClientPicker={setDisplayClientPicker}
                hideBackdrop={props.hideBackdrop}
                setAppointment={saveNewAppointment}
                bodyDataMob={props.services.map((serv) => (
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
                bodyData={props.services.map((serv) => (
                    <tr key={serv.serviceId} className={classesUI.Services}>
                        <td style={{ width: '100%' }}>{serv.name}</td>
                        <td style={{ width: '100px', minWidth: '150px' }}>{serv.time}</td>
                        <td style={{ width: '100px', minWidth: '150px' }}>
                            {serv.price}
                        </td>
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
