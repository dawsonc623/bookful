import React, {
  ReactElement,

  useCallback,
  useState
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
  List,
  ListItem,
  ListItemMeta,
  ListItemText
} from "@rmwc/list";

import {
  TextField
} from "@rmwc/textfield";

import AdvisorAvailabilityCollection  from "../../../../../../../lib/advisor_availability_collection/index.type";
import DateFormatter                  from "../../../../../../../lib/date_formatter/index.type";

import "./index.scss";

interface BookingFormMainProps
{
  advisorAvailability : AdvisorAvailabilityCollection | null | undefined;

  dateFormatter : DateFormatter;

  bookAdvisor : (
    advisorId   : number,
    date        : Date,
    studentName : string
  ) => void;
}

export default function BookingFormMain(
  props : BookingFormMainProps
) : ReactElement
{
  const {
    advisorAvailability,
    bookAdvisor,
    dateFormatter
  } = props;

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

  // Show an error if the user goes to click "Book" without a name present

  const [
    showNameMissingError,
    setShowNameMissingError
  ] = useState(false);

  const showErrorIfDisabled = useCallback(
    () =>
    {
      setShowNameMissingError(
        bookingStudentName === ""
      );
    },
    [
      bookingStudentName
    ]
  );

  const clearError  = useCallback(
    () =>
    {
      setShowNameMissingError(
        false
      );
    },
    []
  );

  return (
    advisorAvailability === undefined ?
      <LinearProgress />
      :
      <div
        className = "bookingForm"
      >
        <div>
          <hr />
          {
            advisorAvailability && advisorAvailability.getCount() > 0 &&
            <>
              <TextField
                required

                invalid   = {showNameMissingError}
                label     = "Your Name"
                onChange  = {updateBookingStudentName}
                value     = {bookingStudentName}
              />
              <hr />
            </>
          }
        </div>
        <DataTable
          className   = "availabilityTable"
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
                  Availabilities
                </DataTableHeadCell>
                <DataTableHeadCell>
                  {/* For alignment with booking section table */}
                </DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {
                advisorAvailability && advisorAvailability.getCount() > 0 ?
                  advisorAvailability.map(
                    (
                      advisorAvailability
                    ) => {
                      const advisorId       = advisorAvailability.getAdvisorId();
                      const availabilities  = advisorAvailability.getAllAvailability();

                      return (
                        <DataTableRow
                          key = {advisorId}
                        >
                          <DataTableCell
                            className = "advisorId"
                          >
                            {advisorId}
                          </DataTableCell>
                          <DataTableCell>
                            <List
                              dense
                            >
                              {
                                availabilities.map(
                                  (
                                    availability
                                  ) => {
                                    const date        = availability.getDate();
                                    const dateString  = dateFormatter.humanReadable(date);

                                    const disabled  = bookingStudentName === "";
                                    let listItemClicked;

                                    if (!disabled)
                                    {
                                      listItemClicked = () => {
                                        bookAdvisor(advisorId, date, bookingStudentName);
                                      };
                                    }

                                    return (
                                      <ListItem
                                        disabled    = {disabled}
                                        key         = {dateString}
                                        onClick     = {listItemClicked}
                                        onMouseOut  = {clearError}
                                        onMouseOver = {showErrorIfDisabled}
                                      >
                                        <ListItemText>
                                          {dateString}
                                        </ListItemText>
                                        <ListItemMeta
                                          icon  = "calendar_today"
                                        />
                                      </ListItem>
                                    );
                                  }
                                )
                              }
                            </List>
                          </DataTableCell>
                          <DataTableCell>
                            {/* For alignment with booking section table */}
                          </DataTableCell>
                        </DataTableRow>
                      );
                    }
                  )
                  :
                  <DataTableRow>
                    <DataTableCell></DataTableCell>
                    <DataTableCell>No Availability</DataTableCell>
                    <DataTableCell></DataTableCell>
                  </DataTableRow>
              }
            </DataTableBody>
          </DataTableContent>
        </DataTable>
      </div>

  );
}
