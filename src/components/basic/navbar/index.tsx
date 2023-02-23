import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import {useWeb3React} from "@web3-react/core";
import RAMSES_LOGO from 'assets/images/logo.png';
import React, {useMemo} from "react";
import {useParams} from "react-router-dom";
import {useToggleWalletModal} from "state/application/hooks";
import {shortenAddress} from "utils/index";
// import React, { useCallback } from 'react';


export interface NavbarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currencyBalance?: CurrencyAmount<Currency>;
  testid?: string;
  icon?: IconDefinition;
  className?: string;
  toggle?: boolean;
  toggleLabel?: string;
}

const style = {
  '--fa-primary-color': '#353535',
  '--fa-secondary-color': '#EF476F',
  '--fa-primary-opacity': 1,
  '--fa-secondary-opacity': 0.4,
}as React.CSSProperties;

const Navbar = (props: NavbarProps) => {

  const { account } = useWeb3React();
  const active = useMemo(() => !!account, [account]);

  const { id: topicId } = useParams();
  // const { choices, loaded } = useTopic(Number(topicId));
  const toggleWalletModal = useToggleWalletModal();

  const renderConnector = () => {
    return active ? (
        <button className={'btn-primary btn-default rounded-xl'} >
          {shortenAddress(account)}
        </button>
    ) : (
      <button data-testid="wallet-connect" className={'btn-primary btn-default rounded-xl'} onClick={toggleWalletModal}>
        Connect Wallet
      </button>
    );
  };

  const { className, } = props;


  return (
    <div className={'mb-8'}>
    <div className={`${(className) ? className : ''} absolute top-8 left-0 w-full max-w-screen-2xl px-32`}>

      <nav className="border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className=" flex flex-wrap items-center justify-between mx-0">
          <a href="#" className="flex items-center">
            <img src={RAMSES_LOGO} className="h-6 mr-3 sm:h-10" alt="Ramses logo"/>
            {/*<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SONG DUST</span>*/}
          </a>

          <p className={'text-gray100'}>Liquidity Generation Event</p>
          {/*<button data-collapse-toggle="navbar-dropdown" type="button"*/}
          {/*        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg*/}
          {/*        md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400*/}
          {/*        dark:hover:bg-gray-700 dark:focus:ring-gray-600"*/}
          {/*        aria-controls="navbar-dropdown" aria-expanded="false">*/}
          {/*  <span className="sr-only">Open main menu</span>*/}
          {/*  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"*/}
          {/*       xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <path fillRule="evenodd"*/}
          {/*          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"*/}
          {/*          clipRule="evenodd"></path>*/}
          {/*  </svg>*/}
          {/*</button>*/}
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul
              className="flex flex-col p-4 pr-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              {/*<li>*/}
              {/*  <a href="#"*/}
              {/*     className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"*/}
              {/*     aria-current="page">Home</a>*/}
              {/*</li>*/}
              <li>
                <div>{renderConnector()}</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>
    </div>
  );
};

export default Navbar;
