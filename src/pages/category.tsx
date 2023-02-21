import {
  faCheckToSlot,
  faCoins,
  faEye,
  faGuitars,
  faHexagonVerticalNft,
  faHourglassClock,
  faMagnifyingGlass,
  faPeopleGroup,
  faSpinnerThird
} from '@fortawesome/pro-duotone-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useWeb3React } from '@web3-react/core';
import Input from 'components/basic/input';
import Navbar from "components/basic/navbar";
import Modal from 'components/modal';
import AddSongModal from 'components/modal/AddSongModal';
import VoteSongModal from 'components/modal/VoteSongModal';
import SongCard from 'components/song/SongCard';
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

  const [addSongModalOpen, setAddSongModalOpen] = useState(false);

  function openAddSongModal() {
    setAddSongModalOpen(true);
  }

  function closeAddSongModal() {
    setAddSongModalOpen(false);
  }

  const [moreActionModalOpen, setMoreActionModalOpen] = useState(false);

  function openMoreActionModal() {
    setMoreActionModalOpen(true);
  }

  function closeMoreActionModal() {
    setMoreActionModalOpen(false);
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

  function renderList() {
    return loaded ? (
      choices.map((song, index) => {
        return song.meta ? (
          !defaultView  ? (<SongCard key={song.id} songMeta={song.meta} id={song.id} />) :
            (<div className={'flex w-full gap-2'}>
              <div className={'bg-light-gray-2 rounded-xl w-20 h-20 flex justify-center items-center text-4xl font-bold'}>{index+1}</div>

              <div className={'bg-light-gray-2 rounded-xl w-full px-4 py-2'}>

                <div className={'flex gap-2 justify-between items-center'}>
                  <p className={'ranked-card-title text-xl font-bold'}>What About Our Content And Infinite Suffering</p>
                  <div className={'flex gap-2 items-center'}>
                    <p className={'bg-gray30 px-2 py-1 rounded-md'}>Your vote: <span className={'font-semibold text-primary text-xs'}>120SONG (1.2%)</span></p>
                    <p className={'text-3xl'}>26%</p>
                  </div>
                </div>

                <div className={'flex gap-4 justify-between items-center'}>

                  <div className={'flex-1'}>
                    <div className={'ranked-card-progress-bar bg-soft-pink relative rounded-full w-full h-4'}>
                      <div className={'ranked-card-your-progress rounded-full absolute bg-primary left-0 h-full w-[23%]'}></div>
                    </div>
                  </div>

                  <div className={'flex gap-2'}>
                    <a
                      href={`https://opensea.io/assets/`}
                      className={'flex gap-1.5'}
                    >
                      <FontAwesomeIcon fontSize={24} icon={faHexagonVerticalNft} style={style} />
                      <span className={'text-primary font-semibold text-under underline'}>View on Opensea</span>
                    </a>
                    <a
                      href={`https://opensea.io/assets/`}
                      className={'flex gap-1.5'}
                    >
                      <FontAwesomeIcon fontSize={24} icon={faHexagonVerticalNft} style={style} />
                      <span className={'text-primary font-semibold text-under underline'}>View on Opensea</span>
                    </a>
                    <p className={'text-2l'}>2.4K SONG</p>
                  </div>

                </div>
              </div>
            </div>)
        ) : (
          <div className={'bg-squircle w-[311px] h-[316px] bg-cover p-4'} data-testid={`category-list-item-${song.id}`}>
            loading...
          </div>
        );
      })
    ) : (
      <div>loading</div>
    );
  }

  // @ts-ignore
  return (
    <div className={'px-24 py-24'}>
      <Navbar></Navbar>
      <VoteSongModal closeModal={closeVoteSongModal} open={voteSongModalOpen} />
      <AddSongModal closeModal={closeAddSongModal} open={addSongModalOpen} />
      <Modal
        className={'relative overflow-hidden'}
        title={`What do you want to add?`}
        closeModal={closeMoreActionModal}
        open={moreActionModalOpen}
      >
        <main className={'flex flex-wrap gap-6'}>
          <button>new category</button>
          <button onClick={openAddSongModal}>new Song-a-day song</button>
        </main>
      </Modal>

      {/*<div>{renderConnector()}</div>*/}
      <header className={'bg-gradient-light w-full h-40 rounded-3xl flex p-6 mb-12 relative'}>
        <div className={''}>
          <h1>Songs were written in a hotel room</h1>
          <p className={'text-label mt-6'}>
            This is the description section of this category called “songs were written in a hotel room”, as the name
            suggests, Jonathan recorded all of the songs here in a hotel room.
          </p>
        </div>
        <img alt="header" className={'relative w-56 h-56 bottom-20'} src={'/category-header.png'} />
      </header>
      <main className={'flex gap-8'}>
        <section className={'flex-1'}>
          <header className={'mb-8 flex gap-4 justify-between'}>
            <Input className={'w-104'} icon={faMagnifyingGlass} placeholder={'Search songs in this category'} onUserInput={() => {}}></Input>
            <Input inputType={'submit'} className={''} icon={faEye} toggle submitLabel={`${defaultView ? 'Default View' : 'Ranked View'}`} onPress={() => toggleView} onUserInput={() => {}}></Input>
            {/*<Input type="button"></Input>*/}
          </header>
          <main className={'flex flex-wrap gap-6'}>{renderList()}</main>
        </section>
        <aside className={'w-64'}>
          <button
            onClick={openVoteSongModal}
            className={'btn-primary btn-large w-full mb-2'}
            data-testid="open-vote-modal"
          >
            Vote for a Song!
          </button>
          <section className={'days-left rounded-2xl bg-primary-light-2 flex gap-4 py-3 justify-center items-center mt-6 mb-4'}>
            <div><FontAwesomeIcon fontSize={36} icon={faHourglassClock} style={style} /></div>
            <div>
              <h2 className={'font-bold'}>24 Days</h2>
              <p className={'font-semibold'}>Left untill the snapshot</p>
            </div>
          </section>
          <section className={'category-info rounded-2xl bg-primary-light-2 flex flex-col gap-6 px-6 pt-6 mb-4 pb-7'}>
            <div className={'flex gap-3 flex-col'}>
              <label className={'font-semibold'}>Category&apos;s General Stats</label>
              <div className={'rounded-xl bg-g1 flex gap-4 py-4 px-5 justify-between items-center'}>
                <div><FontAwesomeIcon fontSize={42} icon={faCheckToSlot} style={monoStyle} /></div>
                <div className={''}>
                  <h1 className={'font-bold'}>2.25k</h1>
                  <p className={'font-semibold relative -mt-2'}>SONG casted</p>
                </div>
              </div>
              <section className={'flex gap-4'}>
                <div className={'rounded-xl bg-yellowC flex flex-col justify-center items-center w-24 h-24'}>
                  <FontAwesomeIcon fontSize={24} icon={faPeopleGroup} style={monoStyle} />
                  <h2 className={'font-bold'}>3</h2>
                  <p className={'font-normal text-sm'}>Participants</p>
                </div>
                <div className={'rounded-xl bg-greenC flex-col flex justify-center items-center w-24 h-24'}>
                  <FontAwesomeIcon fontSize={24} icon={faSpinnerThird} style={monoStyle} />
                  <h2 className={'font-bold'}>32/50</h2>
                  <p className={'font-normal text-sm'}>Cycles past</p>

                </div>
              </section>
            </div>
            <div className={'flex gap-3 flex-col'}>
              <label className={'font-semibold'}>Your stats in this category</label>
              <div className={'rounded-xl bg-g1 flex gap-4 py-4 px-5 justify-between items-center'}>
                <div><FontAwesomeIcon fontSize={42} icon={faCoins} style={monoStyle} /></div>
                <div className={''}>
                  <h1 className={'font-bold'}>2.73</h1>
                  <p className={'font-semibold relative -mt-2'}>SONG earned</p>
                </div>
              </div>
              <section className={'flex gap-4'}>
                <div className={'rounded-xl bg-yellowC flex flex-col justify-center items-center w-24 h-24'}>
                  <FontAwesomeIcon fontSize={24} icon={faGuitars} style={monoStyle} />
                  <h2 className={'font-bold'}>3</h2>
                  <p className={'font-normal text-sm'}>Song voted</p>
                </div>
                <div className={'rounded-xl bg-greenC flex-col flex justify-center items-center w-24 h-24'}>
                  <FontAwesomeIcon fontSize={24} icon={faCheckToSlot} style={monoStyle} />
                  <h2 className={'font-bold'}>240</h2>
                  <p className={'font-normal text-sm'}>SONG casted</p>
                </div>
              </section>
            </div>
          </section>
          <button onClick={openMoreActionModal} className={'btn-primary-inverted btn-large w-full'}>
            More Actions
          </button>
          <section>
            <div className={'time-left'}></div>
            <div className={'info-summery'}></div>
          </section>
        </aside>
      </main>
      {/*<button className={'btn-primary-inverted'}>Hello Songdust!</button>*/}
    </div>
  );
};

export default Category; /* Rectangle 18 */
