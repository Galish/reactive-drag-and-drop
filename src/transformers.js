export async function* filter(asyncIterator, predicate) {
	for await(const res of asyncIterator) {
		if (!predicate?.(res)) {
			continue
		}

		yield res
	}
}

export async function* every(asyncIterator, predicate) {
	for await(const res of asyncIterator) {
		if (!predicate?.(res)) {
			return
		}

		yield res
	}
}

export async function* map(asyncIterator, ...modifiers) {
	for await(const res of asyncIterator) {
		let value = res

		for (const fn of modifiers) {
			value = fn(value)
		}

		yield value
	}
}

export async function* repeat(asyncIteratorFn) {
	while (true) {
		for await (const res of asyncIteratorFn()) {
			yield res
		}
	}
}

export async function* take(asyncIterator, count = 1) {
	let index = 0

	for await (const res of asyncIterator) {
		if (index >= count) {
			return
		}

		index++

		yield res
	}
}
