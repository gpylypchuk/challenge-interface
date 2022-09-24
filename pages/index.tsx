import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import type { NextPage } from "next";
import "nes.css/css/nes.min.css";
import { HtmlHTMLAttributes, useState } from "react";
import { ethers } from "ethers";
import ETHPool from "./contract/ETHPool.json";

const Home: NextPage = () => {
  const CONTRACT_ADDRESS = "0x2C129bE4E59F56D8995bEFB38022a2F3c714d7b6";

  const [value, setValue] = useState();

  const [data, setData] = useState({
    address: "",
    addressTruncated: "",
    amount: "",
    balanceMetamask: "",
    balanceInPool: "",
    totalValueLocked: "",
  });

  const connectWallet = async () => {
    const accounts = await (window.ethereum as MetaMaskInpageProvider).request<
      string[]
    >({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      if ((window.ethereum as MetaMaskInpageProvider).networkVersion == "5") {
        const userAddress = accounts[0];
        const truncated = `0x...${userAddress?.slice(36, 42).toUpperCase()}`;

        const ethereum = (window as any).ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        let balance = (
          parseFloat((await provider.getBalance(`${userAddress}`)).toString()) /
          10 ** 18
        ).toFixed(4);

        const signer = provider.getSigner(userAddress);

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ETHPool.abi,
          signer
        );

        const TVL = (
          parseFloat((await provider.getBalance(CONTRACT_ADDRESS)).toString()) /
          10 ** 18
        ).toFixed(2);

        const balanceInPool = (
          parseFloat((await contract.balance(userAddress)).toString()) /
          10 ** 18
        ).toFixed(5);

        setData({
          address: `${userAddress}`,
          addressTruncated: truncated,
          amount: data.amount,
          balanceMetamask: balance,
          balanceInPool: balanceInPool,
          totalValueLocked: TVL,
        });
      }
    }
  };

  const deposit = async () => {
    const accounts = await (window.ethereum as MetaMaskInpageProvider).request<
      string[]
    >({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      if ((window.ethereum as MetaMaskInpageProvider).networkVersion == "5") {
        const userAddress = accounts[0];
        const truncated = `0x...${userAddress?.slice(36, 42).toUpperCase()}`;

        const ethereum = (window as any).ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        let balance = (
          parseFloat((await provider.getBalance(`${userAddress}`)).toString()) /
          10 ** 18
        ).toFixed(4);

        const signer = provider.getSigner(userAddress);

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ETHPool.abi,
          signer
        );

        const TVL = (
          parseFloat((await provider.getBalance(CONTRACT_ADDRESS)).toString()) /
          10 ** 18
        ).toFixed(2);

        const balanceInPool = (
          parseFloat((await contract.balance(userAddress)).toString()) /
          10 ** 18
        ).toFixed(5);

        setData({
          address: `${userAddress}`,
          addressTruncated: truncated,
          amount: data.amount,
          balanceMetamask: balance,
          balanceInPool: balanceInPool,
          totalValueLocked: TVL,
        });

        const amount = `${parseFloat(data.amount) * 10 ** 18}`;

        await contract.deposit({ value: amount });
      }
    }
  };

  const withdraw = async () => {
    const accounts = await (window.ethereum as MetaMaskInpageProvider).request<
      string[]
    >({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      if ((window.ethereum as MetaMaskInpageProvider).networkVersion == "5") {
        const userAddress = accounts[0];
        const truncated = `0x...${userAddress?.slice(36, 42).toUpperCase()}`;

        const ethereum = (window as any).ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        let balance = (
          parseFloat((await provider.getBalance(`${userAddress}`)).toString()) /
          10 ** 18
        ).toFixed(4);

        const signer = provider.getSigner(userAddress);

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ETHPool.abi,
          signer
        );

        const TVL = (
          parseFloat((await provider.getBalance(CONTRACT_ADDRESS)).toString()) /
          10 ** 18
        ).toFixed(2);

        const balanceInPool = (
          parseFloat((await contract.balance(userAddress)).toString()) /
          10 ** 18
        ).toFixed(5);

        setData({
          address: `${userAddress}`,
          addressTruncated: truncated,
          amount: data.amount,
          balanceMetamask: balance,
          balanceInPool: balanceInPool,
          totalValueLocked: TVL,
        });

        await contract.withdraw();
      }
    }
  };

  return (
    <div>
      <div
        style={{
          marginTop: 25,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={connectWallet}
        >
          {data.address == "" ? (
            <p
              style={{
                marginTop: "auto",
                textAlign: "center",
                marginBottom: "auto",

                marginLeft: 6,
                fontSize: 20,
              }}
            >
              Connect Wallet
            </p>
          ) : (
            <div style={{ display: "flex", textAlign: "center" }}>
              <i className="nes-icon coin is-medium" />
              <div style={{ display: "inline-block", marginTop: 4 }}>
                <p
                  style={{
                    marginTop: "auto",
                    textAlign: "center",
                    marginBottom: "auto",
                    marginLeft: 6,
                    fontSize: 12,
                  }}
                >
                  {data.addressTruncated}
                </p>
                <p
                  style={{
                    marginTop: "auto",
                    textAlign: "center",
                    marginBottom: "auto",
                    marginLeft: 6,
                    fontSize: 10,
                  }}
                >
                  Ξ {data.balanceMetamask}
                </p>
              </div>
            </div>
          )}
        </button>
      </div>
      <div style={{ textAlign: "center", fontWeight: "bold", marginTop: 30 }}>
        <span className="nes-text is-disabled">
          {data.address == "" ? `TVL: * Ξ` : `TVL: ${data.totalValueLocked} Ξ`}
        </span>
      </div>
      <div
        style={{
          marginTop: "2%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="nes-container with-title is-centered"
            style={{ backgroundColor: "white" }}
          >
            <p className="title">Deposit Ether</p>
            <div className="nes-field">
              <label style={{ fontSize: 10 }}>Amount (in Ether)</label>
              <input
                type="number"
                id="amount_field"
                style={{ backgroundColor: "white", color: "black" }}
                className="nes-input"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    amount: event.target.value,
                  });
                }}
              />
              <button
                type="button"
                className="nes-btn is-success"
                style={{ marginTop: 15 }}
                onClick={deposit}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "4%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="nes-container with-title is-centered"
            style={{
              backgroundColor: "white",
              paddingLeft: "4.6rem",
              paddingRight: "4.6rem",
            }}
          >
            <p className="title">Withdraw Ether</p>
            <div className="nes-field">
              <label style={{ fontSize: 10, fontWeight: "bold" }}>
                {data.balanceInPool == ""
                  ? `Your Balance: 0.00000 Ξ`
                  : `Your Balance: ${data.balanceInPool} Ξ`}
              </label>
              <label style={{ fontSize: 10 }}>(Without Rewards)</label>
              <button
                type="button"
                className="nes-btn is-error"
                onClick={withdraw}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          bottom: 30,
          width: "100%",
        }}
      >
        <footer style={{}}>
          <p style={{ textAlign: "center" }}>with ❤ by geroo</p>
          <section
            className="icon-list"
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            <a
              href="https://twitter.com/geropylypchuk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="nes-icon twitter is-large"></i>
            </a>
            <a
              href="https://www.instagram.com/geropylypchuk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="nes-icon instagram is-large"></i>
            </a>
            <a
              href="https://github.com/gpylypchuk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="nes-icon github is-large"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/geronimo-pylypchuk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="nes-icon linkedin is-large"></i>
            </a>
          </section>
        </footer>
      </div>
    </div>
  );
};

export default Home;
