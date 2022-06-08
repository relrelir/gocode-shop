import { useState } from "react";

const ToggleButton = () => {
  const [showText, setShow] = useState(true);
  console.log(showText);

  return (
    <div>
      <button onClick={() => setShow(!showText)}>ToggleButton</button>
      {showText && <>someText</>}
    </div> //&& is "and" operator. the last value of the "and" operator will be return.
  );
};

export default ToggleButton;
