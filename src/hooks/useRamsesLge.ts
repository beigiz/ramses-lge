import { Interface } from '@ethersproject/abi';
import RAMSES_LGE_ABI from 'abis/RamsesLge.json';
import { useRamsesLgeContract } from 'hooks/useContract';
import { useSingleContractWithCallData } from 'lib/hooks/multicall';
import { useMemo } from 'react';

import { RamsesLge } from '../abis/types/RamsesLge';

const ramsesLgeInterface = new Interface(RAMSES_LGE_ABI);

export type ContractFunctionReturnType<T> = T extends (...args: any) => Promise<infer R>
  ? // TODO: handle struct return type
    R extends void
    ? void
    : R
  : any;

export function useRamsesLge() {
  const ramsesLgeContract = useRamsesLgeContract();

  const totalRaisedCall = useMemo(() => {
    return [ramsesLgeInterface.encodeFunctionData('totalRaised', [])];
  }, []);

  const [totalRaisedResult] = useSingleContractWithCallData(ramsesLgeContract, totalRaisedCall);

  const totalRaised: ContractFunctionReturnType<RamsesLge['callStatic']['totalRaised']> | undefined =
    totalRaisedResult?.result?.[0];

  return { totalRaised };
}
