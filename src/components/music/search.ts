import yts from 'yt-search';

export class Search {

  async findLinkBySearch(search: string) {
    console.log('Searching:', search);
    const result = (await yts.search(search)).videos;

    if (result.length === 0) {
      throw new Error('Could not find any video for this search');
    }

    return result[0].url;
  }
}