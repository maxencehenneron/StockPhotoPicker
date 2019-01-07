import Unsplash, { toJson } from 'unsplash-js';

export default function Search(token, value, page) {
  return new Promise((resolve, reject) => {
    new Unsplash({
      applicationId: token,
    }).search.photos(value, page)
      .then(toJson)
      .then((json) => {
        const photos = json.results.map(element => ({
          src: element.urls.full,
          small: element.urls.small,
        }));

        resolve(photos);
      }).catch(reject);
  });
}
