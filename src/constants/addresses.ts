import { SupportedChainId } from './chains';

export type AddressMap = { [chainId: number]: string };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
};

export const RAMSES_LGE_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x20516276fC86c562A1eBB63862d1D91f928aE157',
};
