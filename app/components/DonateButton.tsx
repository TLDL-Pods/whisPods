'use client';

import { useState } from 'react';
import { BiCopy, BiCheck } from 'react-icons/bi';
import { GiCoinflip } from 'react-icons/gi';

const DonateButton = () => {
  const [copied, setCopied] = useState<boolean>(false);

  // Function to copy text
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      onClick={() => handleCopy(' 0x88BA0f60a9E7Daaf765A907523eCec88022adFae')}
      className="relative mx-auto mt-4 flex cursor-pointer items-center rounded-lg border-2 border-gray-700 bg-base2 px-4 py-1 duration-300 hover:border-accent"
    >
      <div className="flex text-2xl">
        <p>tldl.eth</p>
      </div>{' '}
      <GiCoinflip className="my-auto ml-1 text-3xl text-accent opacity-80" />
      {copied ? (
        <BiCheck className="absolute -right-8 my-auto ml-2 text-xl text-green-500" />
      ) : (
        <BiCopy className="absolute -right-8 my-auto ml-2 cursor-pointer text-xl text-secondary" />
      )}
    </div>
  );
};

export default DonateButton;
