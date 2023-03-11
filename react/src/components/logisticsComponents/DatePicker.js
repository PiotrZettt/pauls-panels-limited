import React, { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import format from "date-fns/format";

import {DatePicker} from "@mui/x-date-pickers";

export default function MaterialUIPickers(props) {

  const [value, setValue] = useState(new Date())

  const handleChange = (newValue) => {
    setValue(newValue)
    props.setValue(newValue);
  };
  

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          views={['day']}
          label="Select Date"
          inputFormat="DD-MM-YYYY"
          format="dd-MM-yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </div>
  );
}
