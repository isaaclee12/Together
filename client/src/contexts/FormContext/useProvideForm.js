import { useState } from "react";
import DataService from "services/dataService";
import { dateToTimestamp } from "utilities/calendar";
import { useEventsContext } from "contexts/EventsContext";
import { utcToZonedTime, format } from "date-fns-tz";

const useProvideForm = () => {
  const { addEvents } = useEventsContext();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = ["Description", "Schedule", "Confirm", "Success"];
  
  const [formData, setFormData] = useState({
    recurring: { rate: "noRecurr", days: [] }
  });

  // form errors
  const [formCreateEventErrors, setFormCreateEventErrors] = useState([]);
  const [formScheduleEventErrors, setFormScheduleEventErrors] = useState([]);
  
  const handleNewStep = async direction => {
    const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;

    if (newStep > 0 && newStep <= totalSteps.length) {
      setCurrentStep(newStep);
    }

    // Submit form to server
    if (newStep === 4) {
      const { initialDate, startTime, finalDate, endTime, ...rest } = formData;
      
      // start and end timestamps of the earliest possible event
      const firstEventStart = dateToTimestamp(initialDate, startTime);
      const firstEventEnd = dateToTimestamp(initialDate, endTime);
      
      // start timestamp of the last possible event
      const lastEventStart = dateToTimestamp(finalDate, startTime);


      // Note: "Africa/Abidjan" has no UTC offset
      const utcDay =  format(utcToZonedTime(firstEventStart, "Africa/Abidjan"),"d");
      const currentTimezoneDay = format(firstEventStart, "d");
      console.log("Current timezone:", firstEventStart.getDate());
      console.log("UTC:", utcToZonedTime(firstEventStart, "Africa/Abidjan"));
      
      // detect if UTC conversion changes the date, in which case we change the days of the week
      // if diff, day of week offset = 1, else 0
      let dayOfWeekOffset = 0;
      if (currentTimezoneDay <  utcDay) {
        dayOfWeekOffset = 1;
      }
      console.log("OFFSET:", dayOfWeekOffset);

        // for each item in recurring.days
        // if day-number is 7, set day-number to 1
        // otherwise add 1 to each day-number

      // Event data to be sent to the backend
      const event = { ...rest, firstEventStart, firstEventEnd, lastEventStart, dayOfWeekOffset };
      console.log("EVENT:", event)

      
      let response;
      try {
        // Axios automatically serializes object to JSON
        // https://masteringjs.io/tutorials/axios/post-json
        response = await DataService.create(event);
      } catch (err) {
        console.error(err)
        return
      }

      const events = response.data.events
      addEvents(events)
    }
  };

  return {
    currentStep,
    totalSteps,
    formData,
    formCreateEventErrors,
    formScheduleEventErrors,
    handleNewStep,
    setFormData,
    setFormCreateEventErrors,
    setFormScheduleEventErrors
  };
};

export default useProvideForm;
