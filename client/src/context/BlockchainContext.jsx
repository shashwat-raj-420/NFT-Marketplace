import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import ABI from '../contracts/NFTMarketplace.sol/NFTMarketplace.json';

const BlockchainContext = createContext();

export const useBlockchainContext = () => {
  return useContext(BlockchainContext);
};

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
    try {
      console.log("connecting");
      if (!window.ethereum) {
        alert("Install MetaMask");
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const reloadContract = async () => {
    if (!provider) return;

    const signer = await provider.getSigner();

    const contractAddress = process.env.REACT_APP_MY_MARKET_PLACE_CONTRACT;

    const deployedContract = new Contract(
      contractAddress,
      ABI.abi,
      signer
    );

    setContract(deployedContract);
  };

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);

        // Listen for account changes and update the currentAccount state
        window.ethereum.on('accountsChanged', async (accounts) => {

          if (!accounts.length) {
            setCurrentAccount("");
            setContract(null);
            return;
          }

          const signer = await provider.getSigner(accounts[0]);

          const contractAddress = process.env.REACT_APP_MY_MARKET_PLACE_CONTRACT;

          const deployedContract = new Contract(
            contractAddress,
            ABI.abi,
            signer
          );

          setContract(deployedContract);
          setCurrentAccount(accounts[0]);

        });
      } else {
        window.alert("Non-Ethereum browser detected. You should consider trying Metamask !");
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {

    const loadBlockchainData = async () => {

      if (!provider) return;

      try {

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (!accounts.length) return;

        const signer = await provider.getSigner(accounts[0]);

        const contractAddress = process.env.REACT_APP_MY_MARKET_PLACE_CONTRACT;

        const deployedContract = new Contract(
          contractAddress,
          ABI.abi,
          signer
        );

        setContract(deployedContract);
        setCurrentAccount(accounts[0]);

      }
      catch (error) {
        console.error(error);
      }

    };

    loadBlockchainData();

  }, [provider]);

  const contextValue = {
    provider,
    contract,
    currentAccount,
    connectWallet,
    reloadContract,
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};

