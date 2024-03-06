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

// 사용 가능한 chain 정의 (현재 testnet인 sepolia만 가능)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    sepolia
  ],
  [publicProvider()]
);

// rainbowkit app config, projectId 필요
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

// wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// 기본 layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="description" content={metadata.description}/>
      </head>
      {/* 
        - add font in body 
        - Wagmi, RainbowKit, Firebase Auth
      */}
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
