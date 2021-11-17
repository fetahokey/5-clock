import {
  ArrowDropDown,
  ArrowDropUp,
  Pause,
  PlayArrow,
  Replay,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const MAX = 60,
    MIN = 1,
    MAX_TIMER = 3600,
    MIN_TIMER = 0,
    BREAK = "Break",
    SESSION = "Session";

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState(SESSION);
  let timerId: any = null;

  const startDecTimer = () => {
    setTimer((prevStat) => {
      if (prevStat === 0) {
        setIsRunning(false);
        if (timerType === SESSION) {
          setTimerType(BREAK);
          setTimer(breakLength * 60);
          setIsRunning(true);
        }
        if (timerType === BREAK) {
          setTimerType(SESSION);
          setTimer(sessionLength * 60);
          setIsRunning(true);
        }
      }
      return prevStat > MIN_TIMER ? prevStat - 1 : prevStat;
    });
  };

  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerId);
    }

    if (isRunning) {
      timerId = setInterval(startDecTimer, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const formatTimer = (timer: number): string => {
    const nmm = timer / 60;
    const mm = parseInt(nmm.toString());
    const ss = timer % 60;
    let mms = mm.toString();
    let sss = ss.toString();
    mms = mms.length === 1 ? "0".concat(mms) : mms;
    sss = sss.length === 1 ? "0".concat(sss) : sss;
    return `${mms}:${sss}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimerType(SESSION);
    setBreakLength(5);
    setSessionLength(25);
    setTimer(1500);
  };

  //  break increment / decrement
  const handleBreakIncrement = () => {
    setBreakLength((prevState) =>
      prevState < MAX ? prevState + 1 : prevState
    );
  };

  const handleBreakDecrement = () => {
    setBreakLength((prevState) =>
      prevState > MIN ? prevState - 1 : prevState
    );
  };

  //session increment/decrement
  const handleSessionIncrement = () => {
    setSessionLength((prevState) => {
      const actState = prevState < MAX ? prevState + 1 : prevState;
      setTimer(actState * 60);
      return actState;
    });
  };

  const handleSessionDecrement = () => {
    setSessionLength((prevState) => {
      const actState = prevState > MIN ? prevState - 1 : prevState;
      setTimer(actState * 60);
      return actState;
    });
  };

  const handlePlayPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <Box
      className="App"
      id="5-clock"
      display="flex"
      width="400px"
      flexWrap="wrap"
      border={1}
      alignSelf="center"
      pl={50}
    >
      <Box flex={6} border={2}>
        <Typography id="break-label">Break </Typography>
        <IconButton
          id="break-increment"
          onClick={handleBreakIncrement}
          disabled={isRunning}
        >
          <ArrowDropUp />
        </IconButton>
        <Typography id="break-length">{breakLength}</Typography>
        <IconButton
          id="break-decrement"
          onClick={handleBreakDecrement}
          disabled={isRunning}
        >
          <ArrowDropDown />
        </IconButton>
      </Box>
      <Box flex={6} border={2}>
        <Typography id="session-label">Session </Typography>
        <IconButton
          id="session-increment"
          onClick={handleSessionIncrement}
          disabled={isRunning}
        >
          <ArrowDropUp />
        </IconButton>
        <Typography id="session-length">{sessionLength}</Typography>
        <IconButton
          id="session-decrement"
          onClick={handleSessionDecrement}
          disabled={isRunning}
        >
          <ArrowDropDown />
        </IconButton>
      </Box>
      <Box flex={12}>
        <Typography id="timer-label">{timerType}</Typography>
        <Typography id="time-left">{formatTimer(timer)}</Typography>

        <IconButton id="start_stop" aria-label="" onClick={handlePlayPause}>
          <PlayArrow />
          <Pause />
        </IconButton>

        <IconButton id="reset" aria-label="" onClick={handleReset}>
          <Replay />
        </IconButton>
      </Box>
    </Box>
  );
};

export default App;
