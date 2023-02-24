import React from 'react';

import { ApproveTransactionInfo, TransactionInfo, TransactionType } from '../../state/transactions/types';

function ApprovalSummary({ info }: { info: ApproveTransactionInfo }) {
  return (
    <>
      <p className={'font-semibold'}>Approve</p>
      <p className={'text-sm'}>Approve {info.tokenSymbol}</p>
    </>
  );
}

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  switch (info.type) {
    case TransactionType.APPROVAL:
      return <ApprovalSummary info={info} />;
  }
}
