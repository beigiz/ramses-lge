import { NativeCurrency, Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { SupportedChainId } from 'constants/chains';
import { nativeOnChain } from 'constants/tokens';
import { useMemo } from 'react';

export function useNativeCurrencyOnChain(chainId: number | undefined): NativeCurrency | Token {
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId],
  );
}

export default function useNativeCurrency(): NativeCurrency | Token {
  const { chainId } = useWeb3React();
  return useNativeCurrencyOnChain(chainId);
}