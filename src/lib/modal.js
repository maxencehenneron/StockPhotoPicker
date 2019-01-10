export default class Modal {
  constructor(options) {
    this.options = options;
    this.lastUpdate = new Date();
    this.renderModal();
  }

  // MARKER: - Rendering

  /**
   * Creates the base modal
   */
  renderModal() {
    const { onClose } = this.options;

    this.rootElem = document.createElement('div');
    this.rootElem.classList.add('photo-picker-modal');
    this.rootElem.onclick = (elem) => {
      if (elem.target !== this.rootElem) {
        return;
      }
      onClose();
    };

    this.contentElem = document.createElement('div');
    this.contentElem.classList.add('photo-picker-modal-content');

    this.renderSearchBar(this.contentElem);
    this.renderGrid();

    this.rootElem.appendChild(this.contentElem);
  }

  /**
   * Creates the grid and appends the columns to it
   */
  renderGrid() {
    this.columns = [];

    const gridElem = document.createElement('div');
    gridElem.classList.add('photo-picker-grid');
    gridElem.onscroll = (el) => { this.onScroll(el.target); };

    let i;
    for (i = 0; i < 3; i += 1) {
      const column = document.createElement('div');
      column.classList.add('photo-picker-column');
      gridElem.appendChild(column);
      this.columns.push(column);
    }

    this.contentElem.appendChild(gridElem);
  }

  /**
   * Renders the top search bar
   */
  renderSearchBar(contentElem) {
    const { placeholder, onSearch, image } = this.options;

    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('photo-picker-search-container');

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('search-bar');
    searchInput.placeholder = placeholder || 'Search something awesome';
    searchWrapper.appendChild(searchInput);

    const providerImage = document.createElement('img');
    providerImage.src = image;
    providerImage.classList.add('photo-picker-provider-icon');
    searchWrapper.appendChild(providerImage);

    searchInput.oninput = () => {
      // Adds a delay to prevent abusive API requests
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {
        this.resetGrid();
        onSearch(searchInput.value);
      }, 750);
    };

    contentElem.appendChild(searchWrapper);
  }

  // MARKER: - Public functions

  /**
   * Appends the photos in the grid
   * @param {photos} An object that contains all the photos to add in the grid
   */
  addPhotos(photos) {
    const { onImageSelected, onClose } = this.options;
    photos.forEach((value) => {
      const photoContainer = document.createElement('div');
      photoContainer.classList.add('photo-picker-photo');

      const photo = document.createElement('img');
      photo.src = value.small;
      photo.onclick = (element) => {
        onImageSelected(element.target.src);
        onClose();
      };
      photoContainer.appendChild(photo);

      photo.onload = () => {
        this.getSmallestColumn().appendChild(photoContainer);
      };
    });
  }

  /**
   * Attaches the modal to the DOM, at the end of the body.
   */
  attach() {
    document.body.appendChild(this.rootElem);
  }

  /**
   * Detaches the modal to the DOM
   */
  detach() {
    this.rootElem.remove();
  }

  // MARKER - Event handlers
  onReachBottom() {
    const { onReachBottom } = this.options;
    if ((new Date().getTime() - this.lastUpdate.getTime()) > 1000) {
      this.lastUpdate = new Date();
      onReachBottom();
    }
  }

  onScroll(el) {
    // visible height + pixel scrolled = total height
    if (el.offsetHeight + el.scrollTop >= 0.80 * el.scrollHeight) {
      this.onReachBottom();
    }
  }

  // MARKER - Helpers
  resetGrid() {
    this.columns.forEach((col) => {
      while (col.firstChild) {
        col.removeChild(col.firstChild);
      }
    });
  }

  getSmallestColumn() {
    return this.columns.sort((a, b) => (a.scrollHeight - b.scrollHeight))[0];
  }
}
