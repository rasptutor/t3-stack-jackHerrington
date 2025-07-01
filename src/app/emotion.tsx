'use client';

import { CacheProvider } from '@emotion/react';
import { type PropsWithChildren, useState } from 'react';
import createEmotionCache from '@/utils/createEmotionCache';

export default function EmotionProvider({ children }: PropsWithChildren) {
  const [cache] = useState(() => createEmotionCache());

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
