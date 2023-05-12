import { Typography } from "@mui/material";
import { useState } from "react";

export default function StaticTimePickerLandscape() {

    const date = new Date()
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)
    const [time, setTime] = useState('')

    const timeShower = (time: number) => {
      return `${time.toString().padStart(2, '0')}`
    }

    setInterval(() => {
        setTime(`${timeShower(date.getHours())}:${timeShower(date.getMinutes())}:${timeShower(date.getSeconds())}`)
    }, 1000)

  return (
    <Typography>
        {time}
    </Typography>
  );
}