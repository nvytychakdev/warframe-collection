export type ProgressState = 'pending' | 'inprogress' | 'done';
export interface WarframeProgress {
  progress: ProgressState;
  components: Record<string, ProgressState>;
}
