import "./App.css";
import { useState } from "react";
import {
  FollowButton,
  Env,
  Blockchain,
} from "@cyberconnect/react-follow-button";

function App() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [address, setAddress] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [toAddress, setToAddress] = useState("");

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  const handleOnClickConnect = async () => {
    if(isMetaMaskInstalled()) {
      setIsBtnDisabled(true);
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAddress(accounts[0]);
      } catch (error) {
        alert("Something went wrong.");
      }
      setIsBtnDisabled(false);
    } else {
      alert("Please install MetaMask.");
    }
  }

  const handleOnChangeSearch = e => {
    setSearchValue(e.target.value);
  }

  const handleOnKeyDownSearch = e => {
    if(e.key === "Enter") {
      setToAddress(e.target.value);
    } else {
      setToAddress("");
    }
  }

  return (
    <div className="container">
      <div className="navbar">
        <button
          className="connect-btn"
          onClick={handleOnClickConnect}
          disabled={isBtnDisabled}
        >
          {
            address
            ? `${address.slice(0, 4)}...${address.slice(-4)}`
            : "Connect"
          }
        </button>
      </div>
      {
        address &&
        <div className="wrapper">
          <input
            className="search-bar"
            value={searchValue}
            onChange={handleOnChangeSearch}
            onKeyDown={handleOnKeyDownSearch}
          >
          </input>
          {
            toAddress &&
            <FollowButton
              provider={window.ethereum}
              namespace="CyberConnect"
              toAddr={toAddress}
              env={Env.PRODUCTION}
              chain={Blockchain.ETH}
              onSuccess={(e) => {
                console.log(e);
              }}
              onFailure={(e) => {
                console.log(e);
              }}
            />
          }
        </div>
      }
    </div>
  );
}

export default App;
