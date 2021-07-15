import React from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  onVideoLoad: () => void;
  videoIsLoaded: boolean;
}

function VideoPlayer({
  videoId,
  onVideoLoad,
  videoIsLoaded
}: VideoPlayerProps): JSX.Element {
  const { t } = useTranslation();
  return (
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
  );
}

export default VideoPlayer;
