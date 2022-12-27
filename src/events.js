export async function* once($element, eventName) {
	yield await oncePromise($element, eventName)
}

export async function* on($element, eventName) {
	while (true) {
		yield await oncePromise($element, eventName)
	}
}

export function onlyEvent(eventName) {
	return function(obj) {
		return (
			obj instanceof Event
			&&
			obj.type === eventName
		)
	}
}

function oncePromise($element, eventName) {
	return new Promise(resolve => {
		$element.addEventListener(eventName, handler)

		function handler(...args) {
			resolve(...args)
			$element.removeEventListener(eventName, handler)
		}
	})
}
