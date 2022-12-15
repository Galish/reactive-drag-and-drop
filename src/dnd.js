import { on, once, onlyEvent } from './events.js';
import { filter, every, map, repeat, take } from './transformers.js';
import { parallel, seq } from './sequence.js';

export function dragAndDrop($el) {
	const $body = document.body;

	const asyncIterator = repeat(() => map(
			seq(
				once($el, 'mousedown'),
				every(
					parallel(
						on($body, 'mousemove'),
						on($body, 'mouseup')
					),
					onlyEvent('mousemove')
				),
			),
			({ screenX, screenY, type }) => [ screenX, screenY, type ]
		)
	);

	(async function(){
		let initial

		for await (const [ x, y, action ] of asyncIterator) {
			switch (action) {
				case 'mousedown': {
					initial ??= [ x, y ]
					break
				}

				default: {
					transform($el, x - initial[ 0 ], y - initial[ 1 ])
				}
			}
		}
	})();
}

function transform($el, x, y) {
	$el.style.transform = `translate(${x}px, ${y}px)`
}
