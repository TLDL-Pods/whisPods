import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from 'frames.js/next/server';
import Link from 'next/link';
import { getTokenUrl } from 'frames.js';
import { DEBUG_HUB_OPTIONS } from './action';
import { fetchEpisodeDataUtil } from '@/app/utils/fetchEpisodeData';

type frameState = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: '1', total_button_presses: 0 };

const reducer: FrameReducer<frameState> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : '1',
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const episodeData = await fetchEpisodeDataUtil('722');

  const previousFrame = getPreviousFrame<frameState>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
    fetchHubContext: true,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error('Invalid frame payload');
  }

  const [frameState, dispatch] = useFramesReducer<frameState>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  // Example with satori and sharp:
  // const imageUrl = await
  frameMessage;

  console.log('info: state is:', frameState);

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;

    console.log('info: frameMessage is:', frameMessage);
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

  // then, when done, return next frame
  return (
    <div className="p-4">
      TLDL boi
      {/* <Link href={`/debug?url=${baseUrl}`} className="underline">
        Debug
      </Link> */}
      <FrameContainer
        postUrl="/frames"
        state={frameState}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage>
          <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
            {frameMessage?.inputText
              ? frameMessage.inputText
              : episodeData[0]?.segment_title}
          </div>
        </FrameImage>
        <FrameInput text="put some text here" />
        <FrameButton onClick={dispatch}>
          {frameState?.active === '1' ? 'Active' : 'Inactive'}
        </FrameButton>
        <FrameButton onClick={dispatch}>
          {frameState?.active === '2' ? 'Active' : 'Inactive'}
        </FrameButton>
        {/* <FrameButton
          mint={getTokenUrl({
            address: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
            tokenId: '123',
            chainId: 7777777,
          })}
        >
          Mint
        </FrameButton> */}
        <FrameButton href={`https://www.google.com`}>External</FrameButton>
      </FrameContainer>
    </div>
  );
}
