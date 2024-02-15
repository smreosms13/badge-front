"use client"
import './globals.css'
import { notoSansKr, inter, poppins} from './font'
import { AuthProvider } from '@/context/Context';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, chain, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  sepolia,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const metadata = {
  title: 'VDB',
  description: 'VDB Demo Application',
};

const cls = (...classnames) => {
  return classnames.join(" ");
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    sepolia
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <title>{metadata.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="description" content={metadata.description}/>
      </head>
      <body className={cls(notoSansKr.className, inter.variable, poppins.variable)}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider modalSize="compact" chains={chains}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </RainbowKitProvider>
        </WagmiConfig>      
      </body>
    </html>
  )
}
