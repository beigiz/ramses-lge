import { StaticJsonRpcProvider } from '@ethersproject/providers';

import { SupportedChainId } from './chains';

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const RPC_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [SupportedChainId.ARBITRUM_ONE]: 'https://arbitrum-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const RPC_PROVIDERS: { [key in SupportedChainId]: StaticJsonRpcProvider } = {
  [SupportedChainId.MAINNET]: new StaticJsonRpcProvider(RPC_URLS[SupportedChainId.MAINNET]),
  [SupportedChainId.ARBITRUM_ONE]: new StaticJsonRpcProvider(RPC_URLS[SupportedChainId.ARBITRUM_ONE]),
};
