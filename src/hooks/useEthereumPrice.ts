import { useEffect, useState } from 'react';

export function useEthereumPrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setPrice(data.ethereum.usd);
    }

    fetchPrice();
    const intervalId = setInterval(fetchPrice, 60000); // fetch the price every minute
    return () => clearInterval(intervalId);
  }, []);

  return price;
}
