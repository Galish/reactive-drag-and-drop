import { dragAndDrop } from './dnd.js';

(function() {
	for (const $el of document.querySelectorAll('*[data-dnd="true"]')) {
		dragAndDrop($el)
	}
})()
