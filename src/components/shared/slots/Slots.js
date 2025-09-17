import React, { useState, useEffect } from "react";
import "./Slots.css";

export default function Slots({ slots }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [values, setValues] = useState([]);

  const slotObj = slots[0];

  useEffect(() => {
    if (selectedSlot) {
      const foundValues = slotObj[selectedSlot];
      setValues(foundValues || []);
    } else {
      setValues([]);
    }
  }, [selectedSlot, slotObj]);

  return (
    <div className="slot-container">
      <div className="slot-categories">
        {Object.keys(slotObj).map((key) => (
          <button
            key={key}
            className={`slot-btn ${selectedSlot === key ? "active" : ""}`}
            onClick={() => setSelectedSlot(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="time-slots">
        {values.map((timeObj) => (
          <div
            key={timeObj.id}
            className={`time-slot ${timeObj.status}`}
          >
            {timeObj.time} <br />
            <small>{timeObj.status}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
