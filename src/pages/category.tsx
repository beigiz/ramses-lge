
import { useWeb3React } from '@web3-react/core';
// import Input from 'components/basic/input';
import Navbar from "components/basic/navbar";
// import Modal from 'components/modal';
import { useTopic } from 'hooks/useArena';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToggleWalletModal } from 'state/application/hooks';
import { shortenAddress } from 'utils/index';


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


const Category = () => {
  const { account } = useWeb3React();
  const active = useMemo(() => !!account, [account]);



  const [voteSongModalOpen, setOpenVoteSongModalOpen] = useState(false);

  function openVoteSongModal() {
    setOpenVoteSongModalOpen(true);
  }

  function closeVoteSongModal() {
    setOpenVoteSongModalOpen(false);
  }


  const { id: topicId } = useParams();
  const { choices, loaded } = useTopic(Number(topicId));
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

  function toggleView(){
    setDefaultView(!defaultView)
  }



  // @ts-ignore
  return (
    <div className={'px-24 py-24 bg-ramses'}>
      <Navbar></Navbar>

      {/*<button className={'btn-primary-inverted'}>Hello Songdust!</button>*/}
    </div>
  );
};

export default Category; /* Rectangle 18 */
