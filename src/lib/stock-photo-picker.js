import Modal from './modal';
import Unsplash from './providers/unsplash';
import UnsplashImage from '../img/unsplash.svg';
import Giphy from './providers/giphy';
import GiphyImage from '../img/giphy.png';

const providers = {
  unsplash: {
    api: Unsplash,
    image: UnsplashImage,
  },
  giphy: {
    api: Giphy,
    image: GiphyImage,
  },
};

export default class StockPhotoPicker {
  constructor(config) {
    this.config = config;
  }

  open(options) {
    const { onImageSelected } = this.config;

    this.provider = options.provider;

    if (this.opened) {
      return;
    }

    this.modal = new Modal({
      onSearch: (value) => {
        this.currentPage = 1;
        this.searchText(value);
      },
      onReachBottom: () => {
        this.currentPage += 1;
        this.searchText(this.currentSearchText);
      },
      onClose: () => {
        this.close();
      },
      onImageSelected: (url) => {
        onImageSelected(url);
      },
      image: providers[this.provider].image,
    });

    this.modal.attach();
    this.opened = true;
  }

  close() {
    this.modal.detach();
    this.opened = false;
  }

  searchText(value) {
    this.currentSearchText = value;

    providers[this.provider].api(this.config[this.provider].token, value, this.currentPage).then(
      (photos) => {
        this.modal.addPhotos(photos);
      },
    );
  }
}
