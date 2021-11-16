import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const App = () => {
  const [currentDrum, setCurrentDrum] = useState("");

  useEffect(() => {
    let effect = true;
    return () => {
      // eslint-disable-next-line
      effect = false;
    };
  }, []);

  return (
    <Box
      className="App"
      id="drum-machine"
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box id="display" display="none">
        {currentDrum}
      </Box>
      <Box id="_display" p={10}>
        {bankOne.map((item) => (
          <Box key={item.keyTrigger} p={1} m={1}>
            <Button
              className="drum-pad"
              id={`___${item.keyTrigger}`}
              onClick={() => {
                setCurrentDrum(item.keyTrigger);
                const sound = document.getElementById(item.keyTrigger) as any;
                sound.currentTime = 0;
                sound.play();
              }}
              onKeyDown={(e: any) => {
                if (e.keyCode === item.keyCode) {
                  setCurrentDrum(item.keyTrigger);
                  const sound = document.getElementById(item.keyTrigger) as any;
                  sound.currentTime = 0;
                  sound.play();
                }
              }}
              variant="contained"
            >
              {item.keyTrigger}
              <audio className="clip" id={item.keyTrigger} src={item.url} />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
