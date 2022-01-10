import { header } from './components/header';
import { footer } from './components/footer';

export default class Main {
  constructor() {
    header();
    footer();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Main();
});
