import { StateProvider } from '@/store'
import '@/styles/globals.css'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { modalConnectors, walletConnectProvider, EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { avalanche, avalancheFuji } from 'wagmi/chains'

const projectId = "e283e02dc6922cf2ea683a1414f04c39"

const chains = [avalanche, avalancheFuji]

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])

const wagmiClient = createClient({
  autoConnect : true,
  connectors : modalConnectors({ version : "1", appName : "Termyt", chains, projectId }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }) {  
  return (
    <>
      <StateProvider>
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      </StateProvider>

      <Web3Modal 
        projectId={projectId} 
        ethereumClient={ethereumClient} 
        themeMode="dark" 
        themeColor='blackWhite'
        themeBackground='themeColor'
      />
    </>
  )
}
