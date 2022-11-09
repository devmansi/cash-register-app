import React from "react";
import { useState } from "react";

import "./styles.css";

const denominations = [2000, 500, 100, 20, 10, 5, 1];

export default function App() {
  const [billAmount, setBillAmount] = useState("");
  const [cashGiven, setCashGiven] = useState("");

  const [invalidBillAmountErrorMessage, setInvalidBillAmountErrorMessage] = useState("");
  const [invalidCashGivenErrorMessage, setInvalidCashGivenErrorMessage] = useState("");
  
  const [numOfNotesForEachDenomination, setNumOfNotesForEachDenomination] = useState(["", "", "", "", "", "", ""]);
  
  function handleCheck () {
    if (Number(billAmount) <= 0) {
        alert("Enter valid Bill Amount.");

        return;
    }

    if (Number(cashGiven) <= 0) {
        alert("Enter valid Cash Given.");

        return;
    }

    if (Number(billAmount) > Number(cashGiven)) {
        alert("Do You Wish To wash the dishes");

        return;
    }

    calculateChange(Number(cashGiven),  Number(billAmount));
  }

  function calculateChange (cashGiven, billAmount) {
    const numberOfNotes = [];
    let amount = cashGiven - billAmount;

    denominations.forEach((denomination, index) => {
        numberOfNotes[index] = Math.trunc(amount / denomination);

        amount = amount % denomination;
    });

    setNumOfNotesForEachDenomination(numberOfNotes);
  }

  function validateBillAmount(billAmount) {
    setNumOfNotesForEachDenomination(["", "", "", "", "", "", ""]);

    if (Number(billAmount) <= 0) {
      setInvalidBillAmountErrorMessage("The Bill Amount should be greater than 0.");
    } else {
      setInvalidBillAmountErrorMessage("");
    }
  }

  function validateCashGivenAmount(cashGiven) {
    setNumOfNotesForEachDenomination(["", "", "", "", "", "", ""]);

    if (Number(cashGiven) <= 0) {
        setInvalidCashGivenErrorMessage("The Cash Amount should be greater than 0.");
    } else {
        setInvalidCashGivenErrorMessage("");
    }
  }

  return (
    <div className="container">
      <h1>Cash Register Manager</h1>
      <p>Enter the bill amount and cash given by the customer and know minimum number of notes to return.</p>
      <label>
        Bill Amount:
        <input
          type="number"
          onChange={(e) => {
            setBillAmount(e.target.value);
            validateBillAmount(e.target.value);
          }}
        />
      </label>
      <p className="error-message">{invalidBillAmountErrorMessage}</p>
      <label>
        Cash Given:
        <input
          type="number"
          onChange={(e) => {
            setCashGiven(e.target.value);
            validateCashGivenAmount(e.target.value);
          }}
        />
      </label>
      <p className="error-message">{invalidCashGivenErrorMessage}</p>
      <button onClick={handleCheck}>Check</button>
      <table>
        <caption>Return Change</caption>
        <tbody>
          <tr>
            <th>No of Notes</th>
            {numOfNotesForEachDenomination.map((items, index) => {
              return <td key={index}>{items}</td>;
            })}
          </tr>
          <tr>
            <th>Denominations</th>
            {denominations.map(function (notes, index) {
              return <td key={index}>{notes}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}