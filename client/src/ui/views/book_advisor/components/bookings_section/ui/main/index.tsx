import React, {
  ReactElement
} from "react";

import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow
} from "@rmwc/data-table";

import {
  LinearProgress
} from "@rmwc/linear-progress";

import {
  Typography
} from "@rmwc/typography";

import AdvisorBookingCollection from "../../../../../../../lib/advisor_booking_collection/index.type";

import "./index.scss";

interface BookingsSectionMainProps
{
  advisorBookings : AdvisorBookingCollection | null | undefined;
}

export default function BookingsSectionMain(
  props : BookingsSectionMainProps
) : ReactElement
{
  const {
    advisorBookings
  } = props;

  return (
    <div
      className = "bookingsSection"
    >
      <div
        className = "title"
      >
        <Typography
          use = "headline5"
        >
          Booked Times
        </Typography>
      </div>
      {
        advisorBookings === undefined ?
          <LinearProgress />
          :
          <>
            <div>
              <hr />
            </div>
            <DataTable
              className   = "bookingsTable"
              stickyRows  = {1}
            >
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell
                      className = "tableColumnConstrained"
                    >
                      Advisor ID
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      className = "tableColumnConstrained"
                    >
                      Student Name
                    </DataTableHeadCell>
                    <DataTableHeadCell>
                      Date/Time
                    </DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {
                    advisorBookings?.getCount() > 0 ?
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
                            <DataTableRow
                              key = {`${advisorId}@${dateString}`}
                            >
                              <DataTableCell>{advisorId}</DataTableCell>
                              <DataTableCell>{booking.getStudentName()}</DataTableCell>
                              <DataTableCell>{dateString}</DataTableCell>
                            </DataTableRow>
                          );
                        }
                      )
                      :
                      <DataTableRow>
                        <DataTableCell></DataTableCell>
                        <DataTableCell>No Bookings</DataTableCell>
                        <DataTableCell></DataTableCell>
                      </DataTableRow>
                  }
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </>

      }
    </div>
  );
}
