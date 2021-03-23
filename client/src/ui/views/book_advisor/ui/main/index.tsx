import React, {
  ReactElement,

  useCallback,
  useEffect,
  useState
} from "react";

import AdvisorAvailabilityCollection  from "../../../../../lib/advisor_availability_collection/index.type";
import AdvisorBookingCollection       from "../../../../../lib/advisor_booking_collection/index.type";
import AdvisorService                 from "../../../../../lib/advisor_service/index.type";

import "./index.scss";

interface BookAdvisorViewMainProps
{
  advisorService  : AdvisorService;
}

export default function BookAdvisorViewMain(
  props : BookAdvisorViewMainProps
) : ReactElement
{
  const {
    advisorService
  } = props;

  // Trigger to refresh lists
  const [
    refresh,
    setRefresh
  ] = useState(
    true
  );

  // Grab and format the current date to show to the student

  const currentDate       = new Date();
  const currentDateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  // Fetch the advisor availability data

  const [
    advisorAvailability,
    setAdvisorAvailability
  ] = useState<AdvisorAvailabilityCollection>();

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getAllAdvisorAvailability().then(
        (
          newAdvisorAvailability
        ) => {
          if (!unmounted) {
            setAdvisorAvailability(
              newAdvisorAvailability
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService,
      refresh
    ]
  );

  // Grab the advisor booking data

  const [
    advisorBookings,
    setAdvisorBookings
  ] = useState<AdvisorBookingCollection>();

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getAllAdvisorBookings().then(
        (
          newAdvisorBookings
        ) => {
          if (!unmounted) {
            setAdvisorBookings(
              newAdvisorBookings
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService,
      refresh
    ]
  );

  // Manage the student name for a new booking

  const [
    bookingStudentName,
    setBookingStudentName
  ] = useState("");

  const updateBookingStudentName  = useCallback(
    (
      event : React.ChangeEvent<HTMLInputElement>
    ) =>
    {
      setBookingStudentName(
        event.target.value
      );
    },
    []
  );

  // Create a new booking

  const bookAdvisor = async (
    advisorId : number,
    date      : Date
  ) => {
    try {
      await advisorService.bookAdvisor(
        advisorId,
        date,
        bookingStudentName
      );

      setRefresh(
        (r) => !r
      );
    } catch (e) {
      // TODO Alert the user of error
      e;
    }
  };

  return (
    <div
      className = "bookAdvisorView"
    >
      <h1>Book Time with an Advisor</h1>
      <div>
        <span>Today is {currentDateString}</span>
      </div>
      <hr />
      <input
        onChange    = {updateBookingStudentName}
        placeholder = "Your Name"
        type        = "text"
        value       = {bookingStudentName}
      />
      <hr />
      {
        !advisorAvailability ?
          <p>Loading...</p>
          :
          <table>
            <thead>
              <tr>
                <th>Advisor ID</th>
                <th>Availabilities</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                advisorAvailability.map(
                  (
                    advisorAvailability
                  ) => {
                    const advisorId = advisorAvailability.getAdvisorId();
                    const availabilities  = advisorAvailability.getAllAvailability();

                    return (
                      <React.Fragment
                        key = {advisorId}
                      >
                        <tr>
                          <td
                            rowSpan = {availabilities.getCount() + 1}
                          >
                            {advisorId}
                          </td>
                        </tr>
                        {
                          availabilities.map(
                            (
                              availability
                            ) => {
                              const date    = availability.getDate();
                              const hours   = date.getHours();
                              const minutes = date.getMinutes();

                              const period  = hours > 11 ? "PM" : "AM";

                              const dateString  = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ` +
                                `${(hours % 12 || 12)}:${minutes > 9 ? minutes : `0${minutes}`} ${period}`;

                              return (
                                <tr
                                  key = {dateString}
                                >
                                  <td>{dateString}</td>
                                  <td>
                                    <button
                                      onClick = {() => bookAdvisor(advisorId, date)}
                                    >
                                      Book
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        }
                      </React.Fragment>
                    );
                  }
                )
              }
            </tbody>
          </table>
      }
      <h2>Booked Times</h2>
      <hr />
      {
        !advisorBookings ?
          <p>Loading...</p>
          :
          <table>
            <thead>
              <tr>
                <th>Advisor ID</th>
                <th>Student Name</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {
                advisorBookings.map(
                  (
                    booking
                  ) => {
                    const advisorId = booking.getAdvisorId();

                    const date    = booking.getDate();
                    const hours   = date.getHours();
                    const minutes = date.getMinutes();

                    const period  = hours > 11 ? "PM" : "AM";

                    const dateString  = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ` +
                      `${(hours % 12 || 12)}:${minutes > 9 ? minutes : `0${minutes}`} ${period}`;

                    return (
                      <tr
                        key = {`${advisorId}@${dateString}`}
                      >
                        <td>{advisorId}</td>
                        <td>{booking.getStudentName()}</td>
                        <td>{dateString}</td>
                      </tr>
                    );
                  }
                )
              }
            </tbody>
          </table>
      }
    </div>
  );
}
