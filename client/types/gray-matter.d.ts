import { GrayMatterFile as GrayMatterFileOriginal } from 'gray-matter';

declare namespace matter {
  type Input = string | Buffer;
  interface GrayMatterFile<I extends Input> extends GrayMatterFileOriginal {
    isEmpty: boolean;
  }
}
declare module 'gray-matter' {
  type Input = string | Buffer;
  interface GrayMatterFile<I extends Input> extends GrayMatterFileOriginal {
    // interface GrayMatterFile {
    isEmpty: boolean;
  }
}
