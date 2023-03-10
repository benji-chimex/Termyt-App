import { StateProvider } from '@/store'
import '@/styles/globals.css'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { modalConnectors, walletConnectProvider, EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { avalanche } from 'wagmi/chains'
import Head from 'next/head';

const projectId = "e283e02dc6922cf2ea683a1414f04c39"

const chains = [avalanche]

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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
      </Head>
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
