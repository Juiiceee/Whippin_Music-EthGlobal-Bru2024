// auth.ts
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";

const clientId = "BPGFQ_lbwOCWolj8UpsOmsDgRTaVhjxR0Bw9MtLSI0UjOKvc1r_pU2jx52s6jW30ivB57iZVAm3HqbsHxdiUQik"; // Remplacez par votre client ID Web3Auth

const chainConfig = {
  chainId: "0xaa36a7", 
  rpcTarget: "https://eth-sepolia.api.onfinality.io/public",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Ethereum sEPOLIA",
  blockExplorerUrl: "https://SEPOLIA.etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export const initWeb3Auth = async () => {
  try {
    await web3auth.initModal();
  } catch (error) {
    console.error("Web3Auth initialization error:", error);
  }
};

export const login = async (): Promise<IProvider | null> => {
  try {
    const web3authProvider = await web3auth.connect();
    return web3authProvider;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await web3auth.logout();
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const getAccounts = async (provider: IProvider) => {
  try {
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.error("Get accounts failed", error);
    return [];
  }
};

export const getBalance = async (provider: IProvider) => {
  try {
    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    return balance;
  } catch (error) {
    console.error("Get balance failed", error);
    return null;
  }
};

export const signMessage = async (provider: IProvider, message: string) => {
  try {
    const web3 = new Web3(provider as any);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const signedMessage = await web3.eth.personal.sign(message, fromAddress, "test password!");
    return signedMessage;
  } catch (error) {
    console.error("Sign message failed", error);
    return null;
  }
};
