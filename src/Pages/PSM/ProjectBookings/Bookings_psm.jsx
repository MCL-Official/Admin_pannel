import React, { useState, useEffect, useRef } from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  getUser,
  getUserLogin,
} from "../../User_Management/features/userSlice";
import { useSelector } from "react-redux";
import { tssurl, url1 } from "../../../UI/port";
import search from "../../../UI/CommonTable/Assets/search.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const localizer = momentLocalizer(moment);

const Psm_Bookings = ({ setActiveTab, setExpand }) => {
  setActiveTab("featuredProject");
  setExpand("showcaseManagement");
  const uid = localStorage.getItem("uid");
  const schedulerRef = useRef(null);
  const head = "Bookings";
  const apiURL = `${url1}/getBookings_sm?uid=${uid}`;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false); // New state for edit popup
  const [consultantPopupOpen, setConsultantPopupOpen] = useState(false); // New state for consultant popup
  const [allUserDropdown, setAllUserDropdown] = useState([]);
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  const userData = useSelector((state) => state.userManagement.users);
  console.log(userData, "kvhbvd");

  const [editTitle, setEditTitle] = useState("");
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
  const [deditLocation, setdeditLocation] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    console.log("Bookings useEffects");
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [res]);

  // const fetchData = async () => {
  //   try {
  // const response = await fetch(`${url1}/getBookings_sm?uid=${uid}`, {

  const fetchData = async (page = 1, searchQuery = "", selectedDate = null) => {
    try {
      const formattedDate = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : "";
      const response = await fetch(
        `${tssurl}/appointments/allbookings?page=${page}&search=${searchQuery}&date=${formattedDate}`
      );
      const data = await response.json();

      setTableData(data.bookings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery, filterOption);
  }, [currentPage, searchQuery, filterOption]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const { data } = await axios.delete(
        `${tssurl}/appointments/deletebooking/${id}`
      );

      if (data.success) {
        alert("Booking deleted successfully!");
        fetchData(); // Fetch updated bookings from backend
      } else {
        throw new Error(data.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete booking. Please try again."
      );
    }
  };

  const eventComponent = ({ event }) => {
    let consultant = allUserDropdown.map((user) => {
      return <>{user.uid == event.consultant ? user.uname : null}</>;
    });

    return (
      <div>
        <div>Title: {event?.title}</div>
        <div>Location: {event?.Location}</div>
        <div>Date: {moment(event?.start).format("YYYY-MM-DD")}</div>
        <div>Time: {event?.time}</div>
        <div>Description: {event?.description}</div>
        <div>Email: {event?.user}</div>
        <div>Status: {event?.status}</div>
        <div>Phone No: {event?.rate}</div>
        <div>Zip Code: {event?.venue}</div>
      </div>
    );
  };

  const handleSelect = (event) => {
    setSelectedEvent(event);
    console.log(event, "sdkvhjd");
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const handleEditPopup = () => {
    console.log(selectedEvent, "sadkjvdn");
    setEditPopupOpen(true);
    setdeditTitle(selectedEvent.title);
    setdeditDesc(selectedEvent.description);
    setdeditDate(selectedEvent.date);
    setdeditTime(selectedEvent.time);
    setdeditVenue(selectedEvent.venue);
    setdeditStatus(selectedEvent.status);
    setdeditLocation(selectedEvent.status);
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
        // console.log("These are all the users : ", response.data);
        setAllUserDropdown(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const HandleEdit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("bid", selectedEvent.id);
  //   formData.append("title", deditTitle);
  //   formData.append("desc", deditDesc);
  //   formData.append("date", deditDate);
  //   formData.append("time", deditTime);
  //   formData.append("venue", deditVenue);
  //   formData.append("status", deditStatus);
  //   if (deditDate == null || deditDate == undefined) {
  //     alert("Date is Required to edit Data");
  //   } else {
  //     try {
  //       const response = await axios({
  //         method: "put",
  //         url: `${url1}/editBooking_sm`,
  //         data: formData,
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //           // "X-CSRFToken": csrfToken,
  //           "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
  //         },
  //       });
  //       // console.log(oid);
  //       console.log(response);
  //       alert("Data updated successfully");
  //       handleCloseEditPopup();
  //       handleClosePopup();
  //       window.location.reload();
  //     } catch (error) {
  //       alert("Operation failed");
  //       // console.log(oid);
  //       console.log("Not submitting data");
  //       // return rejectWithValue(error.response.data);
  //       // }
  //     }
  //     setres("respinse edit");
  //     window.location.reload();
  //   }
  // };

  // const handleAssign = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("uid", editAssign);
  //   formData.append("bid", selectedEvent.id);

  //   try {
  //     const response = await axios({
  //       method: "put",
  //       url: `${url1}/assignconsultant_sm`,
  //       data: formData,
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //         // "X-CSRFToken": csrfToken,
  //         "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
  //       },
  //     });
  //     // console.log(oid);
  //     console.log(response);
  //     alert("Data updated successfully");
  //     handleCloseConsultantPopup();
  //   } catch (error) {
  //     alert("Operation failed");
  //     // console.log(oid);
  //     console.log("Not submitting data");
  //     // return rejectWithValue(error.response.data);
  //   }
  //   setres("respinse assign");
  // };

  const tableItems = [
    {
      name: "Liam James",
      email: "liamjames@example.com",
      position: "Software engineer",
      salary: "$100K",
    },
    {
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      position: "Product designer",
      salary: "$90K",
    },
    {
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      position: "Front-end developer",
      salary: "$80K",
    },
    {
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      position: "Laravel engineer",
      salary: "$120K",
    },
    {
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      position: "Open source manager",
      salary: "$75K",
    },
  ];

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div
        className="ml-[17rem] mb-10 w-full relative"
        style={{ marginTop: "80px" }}
      >
        <div className="flex justify-between items-center w-full relative ml-[2rem]">
          {/* 🔹 Search Input */}
          <div className="w-1/2 relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              className="shadow-md border-gray-100 border-2 rounded-md py-3 pl-5 pr-10 w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchData(1, e.target.value, filterOption); // Reset to page 1 when searching
              }}
            />
            <img
              src={search}
              alt="search"
              className="absolute top-3 right-3 pointer-events-auto"
            />
          </div>

          {/* 🔹 Date Picker for Selecting a Specific Date */}
          <div className="relative w-1/3">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                fetchData(1, searchQuery, date);
              }}
              className="w-full bg-white rounded-md py-3 pl-5 pr-12 shadow-md border-2 border-gray-100 cursor-pointer"
              placeholderText="Select Date"
              dateFormat="dd/MM/yyyy"
            />
            {/* 🔹 MUI Calendar Icon Inside Input Field */}
            <CalendarTodayIcon className="absolute right-[8rem] top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-10 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Date + Time</th>
                  <th className="py-3 px-6">Full Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Mobile</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {tableData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item?.date
                        ? `${new Date(item.date).toLocaleDateString(
                            "en-GB"
                          )} , ${item?.time}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {`${item?.firstName} ${item?.lastName}`}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item?.phone}
                    </td>
                    <td className="text-center px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 border">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/*<div
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
                    
                  </div>
                  <div className="flex flex-col gap-5 max-w-md">
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Title : </label>
                      <p>{selectedEvent.title}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl"> Location :</label>
                      <p> {selectedEvent.Location}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl"> Booking From :</label>
                      <p> {selectedEvent.TypeTest}</p>
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
                      <label className="text-blue-600 text-xl">Email : </label>
                      <p>{selectedEvent.user}</p>
                    </div>
                    <div className="flex gap-3 flex-row justify-between">
                      <label className="text-blue-600 text-xl">Status : </label>
                      <p>{selectedEvent.status}</p>
                    </div>
                    <div className="flex gap-3 flex-row text-left justify-between">
                      <label className="text-blue-600 text-xl">Phone No: </label>
                      <p>{selectedEvent.rate}</p>
                    </div>
                    <div className="flex gap-3 flex-row text-left justify-between">
                      <label className="text-blue-600 text-xl">Zip Code: </label>
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
                  </div>
                ) : null}
              </div>
            </div>
          )}
        {selectedEvent &&
          editPopupOpen && ( // Display the edit popup only if editPopupOpen is true
            <div className="fixed flex flex-col top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="w-50 h-50 bg-white p-8 rounded-3xl">
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
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Date :</label>
                      <input onChange={(event) => { setdeditDate(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="date" value={deditDate}
                        required
                      />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-5">
                      <label>Time :</label>
                      <input onChange={(event) => { setdeditTime(event.target.value) }}
                        className="border border-blue-300 cursor-pointer rounded-md w-2/3 px-4 py-2"
                        type="time" value={deditTime}
                        required
                      />
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
                        {userData.map((user) => {
                          // console.log(selectedEvent.consultant);
                          console.log('this is user ' ,user);
                          return (
                            <>
                              {user.role == 'MT' && (user.uid == selectedEvent.consultant ? (<>
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
      </div >*/}
    </div>
  );
};

export default Psm_Bookings;
