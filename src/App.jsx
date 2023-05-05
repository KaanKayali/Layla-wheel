import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";

export default function App() {

  /*Wheel*/
  const segments = [
    "casper",
    "kaan",
    ""
  ];
  const segColors = ["saddlebrown", "darkred", "grey"];
  const onFinished = (winner) => {
    console.log(winner);
  };

  return (
    <div className="App">
      <div>
        {/*Wheel*/}
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="lightgrey"
          buttonText="Layla"
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Times New Roman"
        />
      </div>
    </div>
  );
}

