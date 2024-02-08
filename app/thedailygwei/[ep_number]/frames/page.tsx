// ./app/page.tsx

import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  getFrameMessage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
} from 'frames.js/next/server';
import { NextPage } from 'next';

type frameState = {
  count: number;
};

// Update the reducer function to use these types
const reducer: FrameReducer<frameState> = (state, action) => ({
  count: state.count + 1,
});

const Home: NextPage<NextServerPageProps> = async ({ searchParams }) => {
  const previousFrame = getPreviousFrame<frameState>(searchParams);

  const [state, dispatch] = useFramesReducer<frameState>(
    reducer,
    { count: 0 },
    previousFrame
  );

  // Component JSX remains the same
  return (
    <FrameContainer
      postUrl="/frames"
      state={state}
      previousFrame={previousFrame}
    >
      <FrameImage>
        <div tw="w-full h-full bg-slate-700 text-white justify-center items-center">
          {state.count}
        </div>
      </FrameImage>
      <FrameButton onClick={dispatch}>{state.count}</FrameButton>
    </FrameContainer>
  );
};

export default Home;
