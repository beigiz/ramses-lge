import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import eth_gray from 'assets/images/eht-gray.svg';
import React, { useCallback } from 'react';
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount';
import { maxAmountSpend } from 'utils/maxAmountSpend';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  currencyBalance?: CurrencyAmount<Currency>;
  onUserInput: (value: string) => void;
  testid?: string;
  icon?: IconDefinition;
  className?: string;
  toggle?: boolean;
  submitLabel?: string;
  inputType?: string;
  label?: string;
  onPress?: React.MouseEventHandler<HTMLDivElement>
}



const style = {
  '--fa-primary-color': '#353535',
  '--fa-secondary-color': '#EF476F',
  '--fa-primary-opacity': 1,
  '--fa-secondary-opacity': 0.4,
}as React.CSSProperties;

const Input = (props: InputProps) => {

  // @ts-ignore
  Input.defaultProps = {
    inputType: 'default',
  };

  const { currencyBalance, placeholder, onUserInput, icon, className, toggle, submitLabel, inputType, onPress, label } = props;

  const maxAmountInput = maxAmountSpend(currencyBalance);
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact());
  }, [maxAmountInput, onUserInput]);
  return (
    <div onClick={onPress} className={`${(className) ? className : ''}`}>
      <div className={` bg-gray00 rounded-xl px-4 py-4 flex justify-center
       ${toggle ? 'justify-center' : ''}`}>
        {/*<div className={'input-icon'}>*/}
        {/*  { icon && (<FontAwesomeIcon fontSize={24} icon={icon} style={style} />)}*/}
        {/*</div>*/}
        {/*todo remove focus on input*/}
        <input
          type="number"
          placeholder={placeholder}
          className={'bg-gray00 text-white !focus:outline-0 !outline-0 !border-0 focus:ring-0 !focus:shadow-none shadow-none w-full text-2xl'}
          onChange={(e) => onUserInput(e.target.value)}
          value={props.value}
          data-testid={props.testid && `${props.testid}-input`}
        ></input>
        <div className={'flex flex-col'}>
        <div className={'flex justify-between'}>

          {/*<label>{label}</label>*/}
          <div className={'max-container flex gap-2 items-center'}>
            <p className={'text-white'}>0</p>
            <div>
            <button
              onClick={handleMax}
              className={'btn-primary-inverted rounded-md px-2 py-1 text-xs font-semibold'}
              data-testid={props.testid && `${props.testid}-max`}
            >
              Max
            </button>
            </div>
          </div>
        </div>
        <div className={'input-token-label mt-4'}>
          <div className={'flex justify-end gap-2 '}>
            <p className={'text-white text-2xl text-gray100/50'}>ETH</p>
            <img className={'w-4'} src={eth_gray} />
          </div>
        </div>

        </div>

        {/*<div className={'input-token'}></div>*/}
      </div>
      <footer className={'mt-2'}>
        {/* This is for error messages and showing balance */}
        {currencyBalance && (
          <div className={'flex justify-end gap-2 pr-2'}>
            <p className={'text-dark-gray text-sm'}>
              Balance:{' '}
              <span className={'font-semibold'}>
                {currencyBalance
                  ? formatCurrencyAmount(currencyBalance, 4) + ' ' + currencyBalance.currency.symbol
                  : ''}
              </span>
            </p>
            <button
              onClick={handleMax}
              className={'btn-primary-inverted rounded-md px-2 text-xs font-semibold'}
              data-testid={props.testid && `${props.testid}-max`}
            >
              Max
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Input;
