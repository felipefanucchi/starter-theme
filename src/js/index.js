import { header } from './headerComponent';
import { footer } from './footerComponent';

export default class Testing {
  constructor() {
    header();
    footer();
  }
}

window.on('load', () => {
  new Testing();
});
