import React, { useState, useEffect, useRef } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../../User_Management/features/userSlice";
import { useSelector } from "react-redux";
import { url1 } from "../../../UI/port";

const localizer = momentLocalizer(moment);

const ProjectBooking = ({ setActiveTab, setExpand }) => {
  setActiveTab("bookings");
  setExpand("homeService");
  const uid = localStorage.getItem("uid");
  const schedulerRef = useRef(null);
  const head = "Bookings";
  const apiURL = `${url1}/getBookings_hsm?uid=${uid}`;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false); // New state for edit popup
  const [consultantPopupOpen, setConsultantPopupOpen] = useState(false); // New state for consultant popup
  const [allUserDropdown, setAllUserDropdown] = useState([]);
  const dispatch = useDispatch()
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState(null);
  const [editDate, setEditDate] = useState(null);
  const [editTime, setEditTime] = useState(null);
  const [editVenue, setEditVenue] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [editAssign, setEditAssign] = useState(null);
  const [res, setres] = useState();


  const [deditTitle, setdeditTitle] = useState(null);
  const [deditDesc, setdeditDesc] = useState(null);
  const [deditDate, setdeditDate] = useState(null);
  const [deditTime, setdeditTime] = useState(null);
  const [deditVenue, setdeditVenue] = useState(null);
  const [deditStatus, setdeditStatus] = useState(null);

  useEffect(() => {
    console.log("Bookings useEffects")
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [res]);


  const fetchData = async () => {
    try {
      const response = await fetch(`${url1}/getBookings_hsm?uid=${localStorage.getItem('uid')}`, {
        headers: {
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      const data = await response.json();
      console.log("This is the data", data);

      const parsedEvents = data.bookings_data.map((event) => {
        // Parse the date and time
        const eventDate = new Date(`${event.date}T${event.time}:00`);

        // Calculate the end date and time (assuming 1 hour duration for the event)
        const endDate = new Date(eventDate);
        endDate.setHours(endDate.getHours() + 1); // Adding 1 hour

        return {
          id: event.bid,
          title: event.title,
          consultant: event.consultant,
          description: event.desc,
          time: event.time,
          start: eventDate,
          end: eventDate,
          user: event.user,
          status: event.status,
          rate: event.price,
          booking_photos: event.booking_photos,
          venue: event.venue,
        };
      });

      setEvents(parsedEvents);
    } catch (error) {
      console.log(error);
    }
  };


  console.log(events);

  const eventComponent = ({ event }) => {
    let consultant = allUserDropdown.map((user) => {
      return (
        <>
          {user.uid == event.consultant ? (user.uname) : (null)}
        </>
      );
    })
    return (
      <div>
        <div>Title: {event.title}</div>
        <div>Consultant: {consultant}</div>
        <div>Date: {moment(event.start).format("YYYY-MM-DD")}</div>
        <div>Time: {event.time}</div>
        <div>Description: {event.description}</div>
        <div>Person: {event.user}</div>
        <div>Status: {event.status}</div>
        <div>Price: {event.rate}</div>
        <div>Venue:  {event.venue}</div>
      </div>
    );
  };

  const handleSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const handleEditPopup = () => {
    setEditPopupOpen(true);
    setdeditTitle(selectedEvent.title)
    setdeditDesc(selectedEvent.description)
    setdeditDate(selectedEvent.date)
    setdeditTime(selectedEvent.time)
    setdeditVenue(selectedEvent.venue)
    setdeditStatus(selectedEvent.status)

  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
  };

  const handleConsultantPopup = () => {
    setConsultantPopupOpen(true);
  };

  const handleCloseConsultantPopup = () => {
    setConsultantPopupOpen(false);
  };


  useEffect(() => {
    axios
      .get(`${url1}/getAllUsers_um`, {
        headers: {
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      })
      .then((response) => {
        console.log("These are all the users : ", response.data);
        setAllUserDropdown(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bid", selectedEvent.id);
    formData.append("title", deditTitle);
    formData.append("desc", deditDesc);
    formData.append("date", deditDate);
    formData.append("time", deditTime);
    formData.append("venue", deditVenue);
    formData.append("status", deditStatus);
    if (deditDate == null || deditDate == undefined) {
      alert("Date is Required to edit Data");
    } else {
      try {
        const response = await axios({
          method: "put",
          url: `${url1}/editBooking_hsm`,
          data: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            // "X-CSRFToken": csrfToken,
            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
          },
        });
        // console.log(oid);
        console.log(response);
        alert("Data updated successfully");
        handleCloseEditPopup();
        handleClosePopup();
        window.location.reload();
      } catch (error) {
        alert("Operation failed");
        // console.log(oid);
        console.log("Not submitting data");
        // return rejectWithValue(error.response.data);
        // }
      }
      setres('respinse edit')
      window.location.reload();
    }
  }

  const handleAssign = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("uid", editAssign);
    formData.append("bid", selectedEvent.id);

    try {
      const response = await axios({
        method: "put",
        url: `${url1}/assignconsultant_hsm`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
          "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
        },
      });
      // console.log(oid);
      console.log(response);
      alert("Data updated successfully");
      handleCloseConsultantPopup();
      window.location.reload();
    } catch (error) {
      alert("Operation failed");
      // console.log(oid);
      console.log("Not submitting data");
      // return rejectWithValue(error.response.data);
    }
    setres('respinse assign')
    window.location.reload();
  }


  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div
        className="ml-80 mb-10 w-[100vh] relative"
        style={{ marginTop: "110px" }}>
        <Calendar
          localizer={localizer}
          selectable={true}
          events={events}
          defaultView="month"
          ds
          onSelectEvent={handleSelect}
          components={{
            event: eventComponent,
          }}
          views={["day", "week", "month", "agenda"]}
          style={{ height: 700, width: 1100 }}
        />
        {selectedEvent &&
          !editPopupOpen &&
          !consultantPopupOpen && ( // Display the event details popup only if editPopupOpen and consultantPopupOpen are false
            <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-50 h-50 bg-white p-8 rounded-3xl">
                <div className="flex flex-row justify-between mb-10">
                  <h4 className="text-2xl text-lime-500 font-bold">
                    Event Details
                  </h4>
                  <button
                    className="float-right font-bold text-3xl hover:text-red-700 focus:outline-none text-red-500"
                    onClick={handleClosePopup}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="flex gap-5">
                  <div style={{ maxHeight: '22rem' }} className="max-w-sm flex flex-col gap-3 overflow-auto">
                    {selectedEvent.booking_photos ? selectedEvent.booking_photos.map((item, index) => (<>
                      <img src={item} className="w-full rounded-md h-auto" alt="" />
                    </>)) : (<h3 className="text-stone-500 text-center flex h-full items-center">No Images to show</h3>)}
                  </div>
                  <div className="flex flex-col gap-5 max-w-md">
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Title : </label>
                      <p>{selectedEvent.title}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">
                        Description :
                      </label>
                      <p>{selectedEvent.description}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Date : </label>
                      <p>{moment(selectedEvent.start).format("YYYY-MM-DD")}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl"> Time :</label>
                      <p> {selectedEvent.time}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Person : </label>
                      <p>{selectedEvent.user}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Status : </label>
                      <p>{selectedEvent.status}</p>
                    </div>
                    <div className="flex gap-3 flex-row text-left justify-between">
                      <label className="text-blue-600 text-xl">Price: </label>
                      <p>{selectedEvent.rate}</p>
                    </div>
                    <div className="flex gap-3 flex-row text-left justify-between">
                      <label className="text-blue-600 text-xl">Venue: </label>
                      <p className="text-end">{selectedEvent.venue}</p>
                    </div>
                  </div>
                </div>
                {LuserData.role == 'admin' || LuserData.role == 'cr' ? (
                  <div className="flex flex-row gap-10 pt-10">
                    <button
                      className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-700 text-white "
                      onClick={handleEditPopup} // Open the edit popup on button click
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white "
                      onClick={handleConsultantPopup} // Open the consultant popup on button click
                    >
                      Assign Consultant
                    </button>
                  </div>) : null}
              </div>
            </div>
          )}
        {selectedEvent &&
          editPopupOpen && ( // Display the edit popup only if editPopupOpen is true
            <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-50 h-50 bg-white p-8 rounded-3xl">
                {/* Add your input fields and submit button for editing here */}
                <div className="flex flex-row justify-between mb-10">
                  <h4 className="text-2xl text-lime-500 font-bold">
                    Edit Event
                  </h4>
                  <button
                    className="float-right font-bold text-3xl hover:text-red-700 focus:outline-none text-red-500"
                    onClick={handleCloseEditPopup} // Close the edit popup on button click
                  >
                    x
                  </button>
                </div>
                <div>
                  <form action="submit" className="flex flex-col gap-5">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Title :</label>
                      <input onChange={(event) => { setdeditTitle(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="text" value={deditTitle}
                      />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Description :</label>
                      <input onChange={(event) => { setdeditDesc(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="text" value={deditDesc}
                      />
                    </div>
                    <div>
                      <div className="flex flex-row justify-between items-center gap-5">
                        <label>Date :</label>
                        <input onChange={(event) => { setdeditDate(event.target.value) }}
                          className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                          type="date" value={deditDate}
                          required
                        />
                      </div>
                      <div style={{ fontSize: '13px' }} className="text-red-500 text-end">*Required</div>
                    </div>
                    <div>
                      <div className="flex flex-row justify-between items-center gap-5">
                        <label>Time :</label>
                        <input onChange={(event) => { setdeditTime(event.target.value) }}
                          className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                          type="time" value={deditTime}
                          required
                        />
                      </div>
                      <div style={{ fontSize: '13px' }} className="text-red-500 text-end">*Required</div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Venue :</label>
                      <input onChange={(event) => { setdeditVenue(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="text" value={deditVenue}
                      />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Status :</label>
                      <input onChange={(event) => { setdeditStatus(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="text" value={deditStatus}
                      />
                    </div>
                    <button onClick={(event) => HandleEdit(event)} className="mt-5 px-4 py-2 rounded-md bg-lime-500 hover:bg-lime-700 text-white ">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        {selectedEvent &&
          consultantPopupOpen && ( // Display the consultant popup only if consultantPopupOpen is true
            <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-50 h-50 bg-white p-8 rounded-3xl">
                {/* Add your input fields and submit button for assigning consultant here */}
                <div className="flex flex-row justify-between mb-10">
                  <h4 className="text-2xl text-lime-500 font-bold">
                    Assign Consultant
                  </h4>
                  <button
                    className="float-right font-bold text-3xl hover:text-red-700 focus:outline-none text-red-500"
                    onClick={handleCloseConsultantPopup} // Close the consultant popup on button click
                  >
                    x
                  </button>
                </div>
                <div>
                  <form action="submit" className="flex flex-col gap-5">
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Consultant Name :</label>
                      <select
                        className="px-4 py-2 rounded-md border border-blue-300 cursor-pointer"
                        name="assign_consultant"
                        id="" onChange={(event) => setEditAssign(event.target.value)}>
                        <option value=''>Not Assigned</option>
                        {allUserDropdown.map((user) => {
                          console.log(selectedEvent.consultant);
                          console.log('this is user ' + user.uid);
                          return (
                            <>
                              {user.role == 'cr' && (
                                user.uid == selectedEvent.consultant ? (<>
                                  <option selected value={user.uid}>
                                    {user.uname}
                                  </option>
                                </>) : (<>
                                  <option value={user.uid}>
                                    {user.uname}
                                  </option>
                                </>))}
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <button onClick={(event) => handleAssign(event)} className="mt-5 px-4 py-2 rounded-md bg-lime-500 hover:bg-lime-700 text-white ">
                      Assign
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default ProjectBooking;
