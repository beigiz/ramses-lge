import { SupportedChainId } from './chains';

export type AddressMap = { [chainId: number]: string };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
};

export const RAMSES_LGE_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x20516276fC86c562A1eBB63862d1D91f928aE157',
};

export const COLLATERAL_TOKEN_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x86A90A01cEb05Da93001140b1e25A73189410055',
};

export const DISTRIBUTION_TOKEN_ADDRESS: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x27F3D4D69ef6D9563976233ab7047c1A35507b16',
};
