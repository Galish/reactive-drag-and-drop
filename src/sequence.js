export async function* seq(...asyncIterators) {
	for (const asyncIterator of asyncIterators) {
		for await (const res of asyncIterator) {
			yield res
		}
	}
}

export async function* parallel(...asyncIterators) {
	const promise = {};

	for (const asyncIterator of asyncIterators) {
		(async function(){
			for await (const res of asyncIterator) {
				promise.resolve(res)
			}
		})()
	}

	while(true) {
		yield await new Promise(resolve => promise.resolve = resolve)
	}
}
