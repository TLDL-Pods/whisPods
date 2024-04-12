const cryptoLogos = [
  { name: 'Ethereum', img: './cryptoLogos/ethereum.png' },
  { name: 'Optimism', img: '/cryptoLogos/optimism.png' },
  { name: 'Arbitrum', img: '/cryptoLogos/arbitrum.png' },
  { name: 'Base', img: '/cryptoLogos/base.png' },
  { name: 'Polygon', img: '/cryptoLogos/polygon.png' },
  { name: 'Zora', img: '/cryptoLogos/zora.png' },
];

const SupportedTokens = () => {
  return (
    <div className="mt-6">
      <h2 className="text-center text-sm">Dashboard currently supports</h2>
      <div className="mt-2 flex justify-evenly gap-4 rounded-full bg-black p-3">
        {cryptoLogos.map((logo, i) => (
          <div>
            <div
              style={{ backgroundImage: `url(${logo.img})`, opacity: '70%' }}
              className="m-auto h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat"
            ></div>
            {/* <p className="text-center">{logo.name}</p> */}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-secondary">
        *Don't see your favorite L2? Reachout to @sters on Farcaster!
      </p>
    </div>
  );
};

export default SupportedTokens;
