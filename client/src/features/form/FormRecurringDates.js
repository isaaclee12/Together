import React, {useState, useEffect} from 'react';
import { useFormContext } from "contexts/FormContext";

// Handles if your events are recurring and on which days of the week they will recur
export default function FormRecurringDates() {

  const { formData, setFormData } = useFormContext();
  const [recurringDaysHidden, setRecurringDaysHidden] = useState("");

  // This handles how the "days of the week" checkboxes should be hidden when the event is non-recurring
  useEffect(() => {
    // If Not Recurring, set days of week checkboxes to be invisible
    if (formData.recurring.rate === "noRecurr") {
      setRecurringDaysHidden("hidden");
      formData.recurring.days = []; // Reset days array
    } else {
      setRecurringDaysHidden("");
    }
  }, [formData.recurring, formData.recurring.rate])

  // Dictionary of days of week to ISO day-of-week numbers
  const daysOfWeekNums = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7
  }

  // This handles the value change when a recurrence rate checkbox is selected
  const handleDaysOfWeekChange = e => {
    
    const { name } = e.target;
    const dayNum = daysOfWeekNums[name];
    
    //if day is already checked, uncheck it
    if (formData.recurring.days.includes(dayNum)) {
      formData.recurring.days = formData.recurring.days.filter(day => {
        return day !== dayNum;
      });
    } else {
      //otherwise check it
      formData.recurring.days.push(dayNum);
    }
    setFormData({ ...formData });
    console.log(formData.recurring.days);
  }

  // This handles the value change when a day of the week for a weekly recurring event is selected
  const handleRateChange = e => {
    const { name } = e.target;

    // Handle the rates of occurunces
    formData.recurring.rate = name;
    
    setFormData({ ...formData });
  }

  return (
    <div className="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-grey-500 text-xs leading-8 uppercase">
        Recurring
      </div>
      <div className="bg-white py-4 p-1 my-2 flex border border-gray-200 rounded">

        {/* WEEKLY */}
        <div className="border-r pr-6">
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleRateChange}
              value="rate"
              name="weekly"
              label="weekly"
              checked={!!(formData.recurring.rate === "weekly")}
              className="  mx-1 outline-non text-gray-800"
            />
            <p>Weekly</p>
          </div>

          {/* NOT RECURRING */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleRateChange}
              value="rate"
              name="noRecurr"
              label="noRecurr"
              checked={!!(formData.recurring.rate === "noRecurr")}
              className="  mx-1 outline-non text-gray-800"
            />
            <p>Not Recurring</p>
          </div>
        </div>

        {/* DAYS OF WEEK TO REPEAT EVENT */}
        {/* MONDAY */}
        <div className={" mx-7 " + recurringDaysHidden}> {/* This useState changed between "" and "hidden" to hide these checkboxes as needed */}
          <div className="  flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Monday"
              name="Monday"
              id="Monday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Monday"])}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Monday</p>
          </div>

          {/* TUESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Tuesday"
              name="Tuesday"
              id="Tuesday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Tuesday"])}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Tuesday</p>
          </div>

          {/* WEDNESDAY */}
          <div className=" flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Wednesday"
              name="Wednesday"
              id="Wednesday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Wednesday"])}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Wednesday</p>
          </div>

          {/* THURSDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Thursday"
              name="Thursday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Thursday"])}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Thursday</p>
          </div>

          {/* FRIDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Friday"
              name="Friday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Friday"])}
              className=" mx-1 outline-non text-gray-800"
            />
            <p>Friday</p>
          </div>

          {/* SATURDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Saturday"
              name="Saturday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Saturday"])}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Saturday</p>
          </div>

          {/* SUNDAY */}
          <div className="flex space-x-4 items-center">
            <input
              type="checkbox"
              onChange={handleDaysOfWeekChange}
              value="Sunday"
              name="Sunday"
              checked={!!formData.recurring.days.includes(daysOfWeekNums["Sunday"])}
              className="mx-1 outline-non text-gray-800"
            />
            <p>Sunday</p>
          </div>

          {/* END DAYS OF WEEK CHECKBOXES */}
        </div>
      </div>
    </div>
  );
}