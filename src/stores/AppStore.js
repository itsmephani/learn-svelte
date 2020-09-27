import { writable } from 'svelte/store';

const AppStore = writable({
  showModal: false
});

export default AppStore;
