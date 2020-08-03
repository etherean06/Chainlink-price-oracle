import React, { useEffect, useState } from "react";
import Web3 from "web3";

import "./App.css";

const CHAINLINK_ORACLE_ABI = [
  {
    constant: true,
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        name: "",
        type: "int256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "latestTimestamp",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [price, setPrice] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const ORACLE_ADDRESS = "0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F";

  useEffect(() => {
    const w3 = new Web3("https://cloudflare-eth.com");
    let oracle = new w3.eth.Contract(CHAINLINK_ORACLE_ABI, ORACLE_ADDRESS);
    oracle.methods.latestAnswer().call({}, function (error, res) {
      if (error != null) {
        console.log(error);
        return;
      }
      setPrice(res);
    });

    oracle.methods.latestTimestamp().call({}, function (error, res) {
      if (error != null) {
        console.log(error);
        return;
      }
      setTimeStamp(res);
    });
  }, []);
  return (
    <div className="App">
      <p>Latest price from the oracle is: {price}</p>
      <p>Latest timestamp was: {timeStamp}</p>
    </div>
  );
}

export default App;
