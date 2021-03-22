import React, {
  ReactElement,

  useCallback,
  useEffect,
  useState
} from "react";

import AdvisorAvailabilityRepository  from "../../../../../lib/advisor_availability_repository/index.type";
import AdvisorBookingRepository       from "../../../../../lib/advisor_booking_repository/index.type";
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

  // Grab and format the current date to show to the student

  const currentDate       = new Date();
  const currentDateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  // Fetch the advisor  availability data

  const [
    advisorAvailabilityRepository,
    setAdvisorAvailabilityRepository
  ] = useState<AdvisorAvailabilityRepository>();

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getAvailabilityForAll().then(
        (
          newAdvisorAvailabilityRepository
        ) => {
          if (!unmounted) {
            setAdvisorAvailabilityRepository(
              newAdvisorAvailabilityRepository
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService
    ]
  );

  // Grab the advisor booking data

  const [
    advisorBookingRepository,
    setAdvisorBookingRepository
  ] = useState<AdvisorBookingRepository>();

  useEffect(
    () => {
      let unmounted = false;

      advisorService.getBookingsForAll().then(
        (
          newAdvisorBookingRepository
        ) => {
          if (!unmounted) {
            setAdvisorBookingRepository(
              newAdvisorBookingRepository
            );
          }
        }
      );

      return () => {
        unmounted = true;
      };
    },
    [
      advisorService
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
        !advisorAvailabilityRepository ?
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
                advisorAvailabilityRepository.getAllAdvisorAvailability().map(
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
                                `${(hours % 12) + 1}:${minutes > 9 ? minutes : `0${minutes}`} ${period}`;

                              return (
                                <tr
                                  key = {dateString}
                                >
                                  <td>{dateString}</td>
                                  <td>
                                    <button>
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
        !advisorBookingRepository ?
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
                advisorBookingRepository.getAllAdvisorBookings().map(
                  (
                    booking
                  ) => {
                    const advisorId = booking.getAdvisorId();

                    const date    = booking.getDate();
                    const hours   = date.getHours();
                    const minutes = date.getMinutes();

                    const period  = hours > 11 ? "PM" : "AM";

                    const dateString  = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ` +
                      `${(hours % 12) + 1}:${minutes > 9 ? minutes : `0${minutes}`} ${period}`;

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
