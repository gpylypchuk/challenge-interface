import { Button, Stack, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react';

const App = () => {

  const ETH_POOL = '0xA5de4364e621f37F73Dfa6fCcd905aA427aE192a';
  let userAddress;

  useEffect(() => {
    let provider = window.ethereum;
		if(typeof provider !== 'undefined') {
      provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        selectedAccount = accounts[0];
				document.getElementById('account').innerHTML = selectedAccount;
      });
      window.ethereum.on('accountsChanged', (accounts) => {
        selectedAccount = accounts[0];
				document.getElementById('account').innerHTML = selectedAccount;
      });
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
      <Stack spacing={4} direction='column' align='center'>
        <Heading as='h2' size='3xl' isTruncated>
          Ethereum Pool
        </Heading>
        <Button marginTop='10%' colorScheme='green' variant='outline' size='md' marginLeft='50%' marginRight='50%' onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Text color='gray.500' isTruncated id='account'></Text>
      </Stack>
    </div>
  )
}

export default App
