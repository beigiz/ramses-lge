import { CurrencyAmount } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import EXTERNAL_LINK from 'assets/images/external-link.svg';
import eth_LOGO from 'assets/images/simple-eth.svg';
import Input from 'components/basic/input';
// import Input from 'components/basic/input';
import Navbar from 'components/basic/navbar';
import { SupportedChainId } from 'constants/chains';
import { COLLATERAL_TOKEN } from 'constants/tokens';
import { useEthereumPrice } from 'hooks/useEthereumPrice';
import { useRamsesLge } from 'hooks/useRamsesLge';
import JSBI from 'jsbi';
// import Modal from 'components/modal';
// import { useTopic } from 'hooks/useArena';
import React, { useMemo, useState } from 'react';
import { useToggleWalletModal } from 'state/application/hooks';
import { shortenAddress } from 'utils/index';
// import SingleChart from 'components/App/Swap/SingleChart'

const style = {
  '--fa-primary-color': '#353535',
  '--fa-secondary-color': '#EF476F',
  '--fa-primary-opacity': 1,
  '--fa-secondary-opacity': 0.4,
} as React.CSSProperties;

const monoStyle = {
  '--fa-primary-color': '#353535',
  '--fa-secondary-color': '#193154',
  '--fa-primary-opacity': 1,
  '--fa-secondary-opacity': 0.4,
} as React.CSSProperties;

const Index = () => {
  const { account } = useWeb3React();
  const active = useMemo(() => !!account, [account]);

  const toggleWalletModal = useToggleWalletModal();

  const renderConnector = () => {
    return active ? (
      <p data-testid="wallet-connect">Wallet Connected {shortenAddress(account)}</p>
    ) : (
      <button data-testid="wallet-connect" className={'btn-primary x'} onClick={toggleWalletModal}>
        Connect Wallet
      </button>
    );
  };

  const [defaultView, setDefaultView] = useState(true);

  function toggleView() {
    setDefaultView(!defaultView);
  }

  const { provider } = useWeb3React();
  const etherPrice = useEthereumPrice();
  const { totalRaised } = useRamsesLge();

  const ramsesLgeBalanceAmount = useMemo(() => {
    if (!totalRaised) return null;
    const amount = JSBI.BigInt(totalRaised.toString());
    return CurrencyAmount.fromRawAmount(COLLATERAL_TOKEN[SupportedChainId.ARBITRUM_ONE], amount);
  }, [totalRaised]);

  const ramPrice = useMemo(() => {
    if (!ramsesLgeBalanceAmount || !etherPrice) return null;
    return '$' + (Number(ramsesLgeBalanceAmount.toExact()) * etherPrice) / 10000000;
  }, [etherPrice, ramsesLgeBalanceAmount]);

  // @ts-ignore
  return (
    <div className={'px-32 py-24 bg-ramses min-h-screen bg-cover'}>
      <Navbar></Navbar>
      <header className={'flex justify-between gap-4'}>
        <div className={'home-card'}>
          <p className={'text-3xl text-white mb-4 font-bold'}>
            RAM <span className={'text-lg'}>Price</span>
          </p>
          <p className={'text-2xl text-primary font-semibold'}>{ramPrice || '...'}</p>
        </div>

        <div className={'home-card flex justify-between gap-4 items-center'}>
          <div>
            <p className={'text-3xl text-white mb-4 font-bold'}>
              ETH <span className={'text-lg'}>Raised</span>
            </p>
            <p className={'text-2xl text-primary font-semibold'}>
              {ramsesLgeBalanceAmount ? ramsesLgeBalanceAmount.toSignificant(5) : '...'}
            </p>
          </div>
          <img className={'w-12'} src={eth_LOGO} />
        </div>

        <div className={'home-card'}>
          <p className={'text-2xl text-gray100 text-white mb-4 font-bold'}>Full documentation</p>
          <a href={'google.com'} className={'read-more-link text-xl text-gray100/50'}>
            Read more <img className={'pl-1 pb-1 w-[14px] opacity-50 inline-block'} src={EXTERNAL_LINK} />
          </a>
        </div>
      </header>
      <main className={'flex gap-4 mt-8'}>
        <div className={'home-card flex justify-center items-center'}>
          <p className={'text-2xl text-white'}>CHART HERE</p>
        </div>

        <div className={'home-card py-10'}>
          <Input value={'0'} placeholder={'0.0'} onUserInput={() => {}}></Input>
          <button className={'btn-primary btn-large mt-16 w-full'} onClick={() => {}}>
            Add ETH Collateral
          </button>
        </div>
        {/*<SingleChart label={'xDEUS Ratio'} />*/}
      </main>
      {/*<button className={'btn-primary-inverted'}>Hello Songdust!</button>*/}
    </div>
  );
};

export default Index; /* Rectangle 18 */
