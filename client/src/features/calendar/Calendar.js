import React, { useState, useEffect } from "react";

// components
import AllDays from "./AllDays";
import DayCardList from "./DayCardList";

// Utility functions
// For getting real data
import DataService from "services/dataService";
import { getMatchMonthAndYear, getEventsByDayNumber } from "utilities/calendar";
import { format, sub, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useEventsContext } from 'contexts/EventsContext';

const Calendar = ({ date }) => {
  const { events, setEvents } = useEventsContext();
  const [loading, setLoading] = useState(true);
  const eventsInSelectedMonth = getMatchMonthAndYear(
    date.month,
    date.year,
    events
  );
  // An array of days containing events for populating the calendar
  const days = Array.from({ length: date.daysInMonth }, (_, i) => {
    const currentDay = i + 1;

    //Creates dateObject using month spelled out in a string, currentDay and year
    const dateObject = parse(
      `${date.month}, ${currentDay}, ${date.year}`,
      "MMMM, d, yyyy",
      new Date()
    );
    return {
      date: dateObject,
      events: getEventsByDayNumber(currentDay, eventsInSelectedMonth),
    };
  });

  // useEffect(() => {
  //     /// NEW CODE
  //     if (events) {
  //       // console.log("before:", events);
  //       events.forEach(event => {
  //         const start = new Date(event.startAt);

  //         // console.log(start);
  //         // console.log("\ncurrent timezone:", format(start, "d"));
  //         // console.log("UTC:", format(utcToZonedTime(start, "Africa/Abidjan"), "d"));

  //         if (format(start, "d") !== format(utcToZonedTime(start, "Africa/Abidjan"), "d")) {
  //           const datetime = sub(start, { days: 1 });
  //           // console.log("corrected:", event.id, event.title, "from:", start, "to:", datetime)
  //           event.startAt = format(datetime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  //         }

  //       });
  //       // console.log("after", events);
  //       setEvents(...events);
  //     }
  // }, [events])

  useEffect(() => {
    setLoading(true);
    // Fetch events from server
    const fetch = async () => {
      // Database data from server
      const response = await DataService.getAll();
      setEvents(response.data);
    };

    fetch().then(setLoading(false)).catch(setLoading(false));
  }, [setEvents]);

  // Render nothing while fetching for data from server
  if (loading) return null;

  return (
    <div className="flex flex-grow h-full w-full overflow-auto text-gray-700 bg-white">
      <div className="flex flex-col flex-grow">
        <AllDays />
        <DayCardList data={days} firstDayOfMonth={date.firstDay} />
      </div>
    </div>
  );
};

export default Calendar;
