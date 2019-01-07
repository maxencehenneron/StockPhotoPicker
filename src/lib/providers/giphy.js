import GphApiClient from 'giphy-js-sdk-core';

const RESULTS_TO_RETURN = 10;

export default function Search(token, value, page) {
  return new Promise((resolve, reject) => {
    const client = GphApiClient(token);
    client.search('gifs',
      {
        q: value,
        limit: RESULTS_TO_RETURN,
        offset: page * RESULTS_TO_RETURN,
      }).then((response) => {
      const photos = response.data.map(element => ({
        src: element.images.original.url,
        small: element.images.downsized.url,
      }));
      resolve(photos);
    }).catch(reject);
  });
}
