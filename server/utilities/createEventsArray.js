const eachDayOfInterval = require("date-fns/eachDayOfInterval");
const format = require("date-fns/format");
const { nanoid } = require("nanoid");

/**
 * Generates an array of events
 * [ { title, description, location, groupId, startAt, endAt, rsvp }, ... ]
 * If the event is not recurring the groupId is null
 */
const createEventsArray = ({
  recurring,
  title,
  description,
  location,
  firstEventStart,
  firstEventEnd,
  lastEventStart,
  dayOfWeekOffset
}) => {
  // If event is not recurring, generate just one event for dates array and return.
  if (recurring.rate === "noRecurr") {
    let [startAt, endAt] = [firstEventStart, firstEventEnd];
    // If the starting time is greater than the ending time, then the ending time is the next day
    if (firstEventStart > firstEventEnd) {
      const date = new Date(firstEventEnd);
      date.setDate(date.getDate() + 1);
      endAt = date.getTime();
    }
    return [
      {
        title,
        description,
        location,
        groupId: null,
        startAt,
        endAt,
        rsvp: [],
      },
    ];
  }

  // Generate a range of dates in between initialDate & endDate (date-fns does not generate the time sadly)
  const dateRange = eachDayOfInterval({
    start: firstEventStart,
    end: lastEventStart,
  });
  console.log(dateRange);

  // Offset the recurring weekdays concurrently with the date
  // if the conversion from local time to UTC timestamp moves day of month forward by 1
  console.log("BEFORE:", recurring.days);
  if (dayOfWeekOffset === 1) {
    // for every recurring weekday, offset each by 1, except 7 which loops back to 1
    recurring.days = recurring.days.map(day => {
      if (day === 7) {
        return 1;
      }
      return day + 1;
    });
  }
  console.log("AFTER:", recurring.days);

  dateRange.forEach((date) => {
    let i = format(date, "i");
    console.log("ISO DOW: '"+i+"'");
    if (recurring.days.includes(parseInt(format(date, "i")))) {
      console.log(i, "in array");
    }
  });

  // Filter the data for the dates that occur on the chosen weekdays
  const eventStartDates = dateRange.filter(date =>
    recurring.days.includes(parseInt(format(date, "i")))
  );
  console.log(eventStartDates);

  // Recurring events have the same group id. This allows deleting them all at once by this id.
  const groupId = nanoid();

  // Create recurring dates array with events information
  const events = eventStartDates.map(date => {
    const startAt = new Date(firstEventStart);
    startAt.setFullYear(date.getFullYear());
    startAt.setMonth(date.getMonth());
    startAt.setDate(date.getDate());

    const endAt = new Date(firstEventEnd);
    endAt.setFullYear(date.getFullYear());
    endAt.setMonth(date.getMonth());
    endAt.setDate(date.getDate());

    if (startAt > endAt) {
      endAt.setDate(endAt.getDate() + 1);
    }

    return { title, description, location, groupId, startAt, endAt, rsvp: [] };
  });
  return events;
};

module.exports = { createEventsArray };
