import { Button, Stack } from '@chakra-ui/react'

function App() {

  const ETH_POOL = '0xA5de4364e621f37F73Dfa6fCcd905aA427aE192a';

  function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  }

  return (
    <div>
      <Stack spacing={4} direction='row' align='center'>
        <Button colorScheme='green' variant='outline' size='md' onClick={connectWallet}>
          Connect Wallet
        </Button>
        <Button colorScheme='red' variant='outline' size='md'>
          Disconnect
        </Button>
      </Stack>
    </div>
  )
}

export default App
