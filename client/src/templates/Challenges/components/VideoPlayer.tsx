import React from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
import type { BilibiliIds } from '../../../redux/prop-types';

import envData from '../../../../../config/env.json';

const { clientLocale } = envData;

interface VideoPlayerProps {
  videoId: string;
  onVideoLoad: () => void;
  videoIsLoaded: boolean;
  bilibiliIds: BilibiliIds | null;
  title: string;
}

function VideoPlayer({
  videoId,
  onVideoLoad,
  videoIsLoaded,
  bilibiliIds,
  title
}: VideoPlayerProps): JSX.Element {
  const { t } = useTranslation();

  let bilibiliSrc = null;

  if (
    bilibiliIds !== null &&
    ['chinese', 'chinese-traditional'].includes(clientLocale)
  ) {
    const { aid, bvid, cid } = bilibiliIds;
    bilibiliSrc = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&cid=${cid}`;
  }
  return (
    <>
      {bilibiliSrc ? (
        <iframe
          frameBorder='no'
          scrolling='no'
          src={bilibiliSrc}
          title={title}
        />
      ) : (
        <>
          <YouTube
            className={
              videoIsLoaded ? 'display-youtube-video' : 'hide-youtube-video'
            }
            onReady={onVideoLoad}
            opts={{
              playerVars: {
                rel: 0
              },
              width: 'auto',
              height: 'auto'
            }}
            videoId={videoId}
          />
          <i>
            <a
              href={
                'https://www.youtube.com/timedtext_editor?action_mde_edit_form=1&v=' +
                videoId +
                '&lang=en&bl=watch&ui=hd&ref=wt&tab=captions'
              }
              rel='noopener noreferrer'
              target='_blank'
            >
              {t('learn.add-subtitles')}
            </a>
            .
          </i>
        </>
      )}
    </>
  );
}

export default VideoPlayer;
