/**
 * Project-level TypeScript types for better JSDoc and type checking while using checkJs.
 */

/**
 * Minimal song info type used in messages and caching.
 */
export type SongInfo = {
  title: string;
  artist?: string;
  videoId?: string;
  album?: string;
  source?: string;
  [key: string]: any;
};

/**
 * Minimal lyric line structure.
 */
export type LyricLine = {
  id?: string | number;
  text: string;
  timestamp?: number;
  syllables?: Array<{ text: string; start?: number; end?: number }>;
  [key: string]: any;
};
