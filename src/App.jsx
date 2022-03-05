import { 
  Button, 
  Stack, 
  Heading, 
  Text, 
  TabList, 
  Tab, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  FormControl, 
  FormLabel, 
  NumberInput, 
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
 } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon, CheckCircleIcon, ChevronRightIcon } from '@chakra-ui/icons';
import contractABI from './abi/ETHPool.json';
import Web3 from 'web3/dist/web3.min.js';
import { useEffect } from 'react';
import "./App.css";

const App = () => {

  const ETH_POOL = '0xA5de4364e621f37F73Dfa6fCcd905aA427aE192a';
  let userAddress, amountDeposit, amountRetire;

  useEffect(async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById('account').innerHTML = userAddress;
      window.ethereum.on('accountChanged', (accounts) => {
        userAddress = accounts[0];
        document.getElementById('account').innerHTML = userAddress;
      });
    }
    web3 = new Web3(provider);
    const contract = new web3.eth.Contract(contractABI.abi, ETH_POOL);
    const TVL = await contract.methods.poolValue().call();
    document.getElementById('totalValue').innerHTML = `Total Value Locked: ${TVL / 1000000000000000000} Ξ`;
    const balance = await contract.methods.balances(userAddress).call() / 1000000000000000000;
    document.getElementById('balance').innerHTML = `Your Balance is: ${balance} Ξ`;
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById('account').innerHTML = userAddress;
    }
  }

  const retireEther = () => {
    const contract = new web3.eth.Contract(contractABI.abi, ETH_POOL);
    amountRetire = (document.getElementById('retireValue').value * 1000000000000000000).toString();
    contract.methods.withdraw(amountRetire).send({ from: userAddress });
  }

  const sendEther = () => {
    amountDeposit = document.getElementById('depositValue').value;
    amountDeposit = amountDeposit * 1000000000000000000;
    web3.eth.sendTransaction({
      from: userAddress,
      to: ETH_POOL,
      value: amountDeposit
    });
  }
	
  const claimRewards = () => {
    const contract = new web3.eth.Contract(contractABI.abi, ETH_POOL);
    contract.methods.claimRewards().send({ from: userAddress });
  }

  return (
    <div id='back'>
      <Stack spacing={4} borderRadius='60px' direction='column' 
      align='center' backgroundColor='#0B091F' width='40%' 
      marginLeft='30%' marginRight='30%' marginTop='8%' paddingBlock='25px'>
        <Breadcrumb spacing='10px' separator={<ChevronRightIcon color='purple.50' />} color='purple.400'>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Owner</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as='h2' size='3xl' isTruncated color='purple.50' marginBottom='10px' marginTop='20px'>
          Ethereum Pool
        </Heading>
        <Heading as='h2' size='md' isTruncated color='purple.600' 
        marginBottom='10px' marginTop='20px' id='totalValue'></Heading>
        <Heading as='h2' size='md' isTruncated color='purple.600' 
        marginBottom='10px' marginTop='20px' id='balance'></Heading>
        <Button marginTop='10%' colorScheme='green' variant='outline' 
        size='md' marginLeft='50%' marginRight='50%' onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Text color='gray.500' isTruncated id='account'></Text>
        <Tabs isFitted variant='enclosed'>
        <TabList mb='1em' color='whiteAlpha.900'>
          <Tab color='purple.400'>DEPOSIT</Tab>
          <Tab color='purple.400'>RETIRE</Tab>
        </TabList>
        <TabPanels color='whiteAlpha.900'>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor='amount'>Amount in Ether</FormLabel>
              <NumberInput min={0} precision={3} step={0.001} >
                <NumberInputField id='depositValue' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme='purple' 
              marginTop='10%' variant='outline' onClick={sendEther} >
                Send
              </Button>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor='amount'>Amount in Ether</FormLabel>
              <NumberInput min={0} precision={3} step={0.001} >
                <NumberInputField id='retireValue' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper> 
              </NumberInput>
              <Button leftIcon={<ArrowBackIcon />} colorScheme='purple' 
              marginTop='10%' variant='outline' onClick={retireEther} >
                Retire
              </Button>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button leftIcon={<CheckCircleIcon />} colorScheme='purple' 
      variant='solid' onClick={claimRewards}>
        Claim Rewards
      </Button>
      </Stack>
    </div>
  )
}

export default App