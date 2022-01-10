import { header } from './components/header';
import { footer } from './components/footer';

export default class Testing {
  constructor() {
    header();
    footer();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Testing();
});
