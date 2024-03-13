import React, { useState, useEffect } from "react";
import "./App.css";
import ReactModal from "react-modal";
import { evaluate } from "mathjs";
ReactModal.setAppElement("#root");
const App = () => {
  const [expression, setExpression] = useState("");
  const firstRow = ["AC", "%", "del", "/"];
  const secondRow = ["7", "8", "9", "*"];
  const thirdRow = ["4", "5", "6", "-"];
  const forthRow = ["1", "2", "3", "+"];
  const fifthRow = ["0", ".", "="];
  const history = [];
  const [open, setOpen] = useState(false);
  const handleOnClick = (value) => {
    switch (value) {
      case "AC":
        setExpression("");
        break;
      case "del":
        setExpression((prevExpression) =>
          prevExpression ? prevExpression.slice(0, -1) : ""
        );
        break;
      case "=":
        handleEqualPress();
        break;
      case "%":
        setExpression((prevExpression) => prevExpression * 0.01+"*");
        break;
      case "*":
        setExpression((prevExpression) => prevExpression + "*");
        break;
      case "/":
        setExpression((prevExpression) => prevExpression + "/");
        break;
      default:
        setExpression((prevExpression) => prevExpression + value);
    }
  };

  const handleEqualPress = () => {
    try {
      const result = evaluate(expression);
      history.push(expression);
      console.log("expression" + expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  // Event listener for numpad keys
  const handleNumpadKeyPress = (event) => {
    const key = event.key;
    if (/[0-9+\-*/.%]/.test(key)) {
      handleOnClick(key);
    } else if (key.toString() === "Enter") {
      try {
        const result = evaluate(expression);
        console.log("expression" + expression);
        setExpression(result.toString());
      } catch (error) {
        setExpression("Error");
      }
    } else if (key === "Delete") {
      handleOnClick("AC");
    } else if (key === "Backspace") {
      handleOnClick("del");
    } else if (key === "Escape") {
      setExpression("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleNumpadKeyPress);
    return () => {
      window.removeEventListener("keydown", handleNumpadKeyPress);
    };
  }, [handleNumpadKeyPress]);
  return (
    <div className="calculator">
      <ReactModal
        parentSelector={() => document.querySelector("#root")}
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        style={{ backgroundColor: "#000" }}
      >
        {history.map((his) => (
          <ul>{his}</ul>
        ))}
      </ReactModal>
      <div className="inputs">
        <h1 style={{ color: "#fff", fontSize: 120 }}>{expression}</h1>
      </div>
      <div className="buttons">
        <div className="elem">
          {firstRow.map((txt, index) => (
            <div
              className="eachButton"
              key={index}
              onClick={() => handleOnClick(txt)}
            >
              <h1>{txt}</h1>
            </div>
          ))}
        </div>
        <div className="elem">
          {secondRow.map((txt, index) => (
            <div
              className="eachButton"
              key={index}
              onClick={() => handleOnClick(txt)}
            >
              <h1>{txt}</h1>
            </div>
          ))}
        </div>
        <div className="elem">
          {thirdRow.map((txt, index) => (
            <div
              className="eachButton"
              key={index}
              onClick={() => handleOnClick(txt)}
            >
              <h1>{txt}</h1>
            </div>
          ))}
        </div>
        <div className="elem">
          {forthRow.map((txt, index) => (
            <div
              className="eachButton"
              key={index}
              onClick={() => handleOnClick(txt)}
            >
              <h1>{txt}</h1>
            </div>
          ))}
        </div>
        <div className="elem">
          {fifthRow.map((txt, index) => (
            <div
              className="eachButton"
              key={index}
              onClick={() => handleOnClick(txt)}
            >
              <h1>{txt}</h1>
            </div>
          ))}
        </div>
      </div>
      <div
        className="history"
        onClick={() => {
          setOpen(true);
        }}
      >
        <h1 style={{ color: "#fff" }}>H</h1>
      </div>
    </div>
  );
};

export default App;
