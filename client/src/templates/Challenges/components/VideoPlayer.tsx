import React from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
import type { BilibiliIds, VideoLocaleIds } from '../../../redux/prop-types';

import envData from '../../../../../config/env.json';

// TODO: pull these types from all-langs
const { clientLocale } = envData as {
  clientLocale:
    | 'english'
    | 'chinese'
    | 'chinese-traditional'
    | 'espanol'
    | 'italian'
    | 'portuguese';
};

interface VideoPlayerProps {
  videoId: string;
  videoLocaleIds?: VideoLocaleIds;
  onVideoLoad: () => void;
  videoIsLoaded: boolean;
  bilibiliIds?: BilibiliIds;
  title: string;
}

function VideoPlayer({
  videoId,
  videoLocaleIds,
  onVideoLoad,
  videoIsLoaded,
  bilibiliIds,
  title
}: VideoPlayerProps): JSX.Element {
  const { t } = useTranslation();

  let bilibiliSrc = null;

  if (
    bilibiliIds &&
    ['chinese', 'chinese-traditional'].includes(clientLocale)
  ) {
    const { aid, bvid, cid } = bilibiliIds;
    bilibiliSrc = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&cid=${cid}`;
  }

  if (videoLocaleIds) {
    const localeId = videoLocaleIds[clientLocale as keyof VideoLocaleIds];
    videoId = localeId || videoId;
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
