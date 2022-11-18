import React, { useContext } from "react";
import { AppContext } from "../App";

function Key( props ) {
  const {
    onSelectLetter,
    onDelete,
    onEnter,
  } = useContext(AppContext);

  const selectLetter = () => {
    if (props.keyVal === "ENTER") {
      onEnter();
    } else if (props.keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(props.keyVal);
    }
  };
  return (
    <div className="key" id={props.bigKey ? "big" : props.disabled && "disabled"} onClick={selectLetter}>
      {props.keyVal}
    </div>
  );
}


// function Key({ keyVal, bigKey, disabled }) {
//   const {
//     onSelectLetter,
//     onDelete,
//     onEnter,
//   } = useContext(AppContext);

//   const selectLetter = () => {
//     if (keyVal === "ENTER") {
//       onEnter();
//     } else if (keyVal === "DELETE") {
//       onDelete();
//     } else {
//       onSelectLetter(keyVal);
//     }
//   };
//   return (
//     <div className="key" id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>
//       {keyVal}
//     </div>
//   );
// }

export default Key;
