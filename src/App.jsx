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
 } from '@chakra-ui/react'
import { useEffect } from 'react';

const App = () => {

  const ETH_POOL = '0xA5de4364e621f37F73Dfa6fCcd905aA427aE192a';
  let userAddress;

  useEffect(async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById('account').innerHTML = userAddress;
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      document.getElementById('account').innerHTML = userAddress;
    }
  }

  return (
    <div>
      <Stack spacing={4} borderRadius='60px' direction='column' align='center' backgroundColor='gray.900' width='40%' marginLeft='30%' marginRight='30%' marginTop='12.5%'>
        <Heading as='h2' size='3xl' isTruncated color='whiteAlpha.900' marginBottom='10px' marginTop='20px'>
          Ethereum Pool
        </Heading>
        <Button marginTop='10%' colorScheme='green' variant='outline' size='md' marginLeft='50%' marginRight='50%' onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Text color='gray.500' isTruncated id='account'></Text>
        <Tabs isFitted variant='enclosed'>
        <TabList mb='1em' color='whiteAlpha.900'>
          <Tab>DEPOSIT</Tab>
          <Tab>RETIRE</Tab>
        </TabList>
        <TabPanels color='whiteAlpha.900' paddingBottom='50px'>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor='amount'>Amount in Ether</FormLabel>
              <NumberInput min={0}>
                <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor='amount'>Amount in Ether</FormLabel>
              <NumberInput min={0}>
                <NumberInputField id='amount' />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Stack>
    </div>
  )
}

export default App
