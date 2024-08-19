import type { Component, Item } from 'warframe-items';
import { WARFRAME_CDN } from '../../configs/warframe.model';

export type ProgressState = 'pending' | 'inprogress' | 'done';
export interface WarframeProgress {
  progress: ProgressState;
  components: Record<string, ProgressState>;
}

export const getItemPreview = (item: Item) => {
  if ('wikiaThumbnail' in item) {
    const [image] = `${item.wikiaThumbnail}`.split('.png');
    return `${image}.png`;
  }

  return `${WARFRAME_CDN}/${item.imageName}`;
};

export const getItemProgressState = (state: ProgressState) => {
  switch (state) {
    case 'pending':
      return 'inprogress';
    case 'inprogress':
      return 'done';
    default:
      return 'pending';
  }
};

export const getWarframeProgress = (
  component: Item,
  state: ProgressState,
  warframeComponents?: Component[],
  warframeProgress?: WarframeProgress,
) => {
  const components = {
    ...warframeProgress?.components,
    [component.uniqueName || '']: state,
  };

  const progress = getWarframeProgressState(components, warframeComponents);

  return { components, progress };
};

const getWarframeProgressState = (
  components: WarframeProgress['components'],
  warframeComponents?: Component[],
): ProgressState => {
  const isAllDone =
    Object.entries(components).length === warframeComponents?.length &&
    Object.values(components).every((s) => s === 'done');

  const isInProgress = Object.values(components).some(
    (s) => s === 'inprogress' || s === 'done',
  );

  if (isAllDone) return 'done';
  if (isInProgress) return 'inprogress';
  return 'pending';
};

// ! TODO(screen-capture): use this code to handle screen caupture to scan images
// async capture() {
//   const canvas = document.createElement('canvas');
//   const video = document.createElement('video');
//   const img = document.createElement('img');

//   try {
//     const captureStream = await navigator.mediaDevices.getDisplayMedia();
//     video.srcObject = captureStream;

//     video.addEventListener('loadedmetadata', async () => {
//       console.log(video.videoWidth, video.videoHeight);
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       await video.play();
//       context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
//       const frame = canvas.toDataURL('image/png');
//       captureStream.getTracks().forEach((track) => track.stop());
//       const newTab = window.open();
//       if (!newTab) return;
//       img.src = frame;
//       newTab.document.body.appendChild(img);
//     });
//   } catch (err) {
//     console.error('Error: ' + err);
//   }
// }
