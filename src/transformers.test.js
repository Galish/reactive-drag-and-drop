import jest from 'jest-mock'

import { every, filter, map, repeat, take } from './transformers.js'

async function* asyncIteratorFn() {
	yield await Promise.resolve(1)
	yield await Promise.resolve(2)
	yield await new Promise(resolve => setTimeout(() => resolve(3), 10))
	yield await Promise.resolve(4)
	yield await Promise.resolve(5)
}

describe('Filter', () => {
	const fn = val => val > 2

	it('#1', async() => {
		const spyFn = jest.fn()

		for await (const val of filter(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenCalledTimes(3)
	})

	it('#2', async() => {
		const spyFn = jest.fn()

		for await (const val of filter(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenNthCalledWith(1, 3)
		expect(spyFn).toHaveBeenNthCalledWith(2, 4)
		expect(spyFn).toHaveBeenNthCalledWith(3, 5)
	})

})

describe('Every', () => {
	const fn = val => val !== 3

	it('#1', async() => {
		const spyFn = jest.fn()

		for await (const val of every(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenCalledTimes(2)
	})

	it('#2', async() => {
		const spyFn = jest.fn()

		for await (const val of every(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenNthCalledWith(1, 1)
		expect(spyFn).toHaveBeenNthCalledWith(2, 2)
	})

})

describe('Map', () => {
	const fn = val => val * 2

	it('#1', async() => {
		const spyFn = jest.fn()

		for await (const val of map(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenCalledTimes(5)
	})

	it('#2', async() => {
		const spyFn = jest.fn()

		for await (const val of map(asyncIteratorFn(), fn)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenNthCalledWith(1, 2)
		expect(spyFn).toHaveBeenNthCalledWith(2, 4)
		expect(spyFn).toHaveBeenNthCalledWith(3, 6)
	})

})

describe('Repeat', () => {

	it('#1', async() => {
		const spyFn = jest.fn()
		let count = 0

		for await (const val of repeat(asyncIteratorFn)) {
			if (count > 10) {
				break
			}

			spyFn(val)
			count++
		}

		expect(spyFn).toHaveBeenCalledTimes(11)
	})

	it('#2', async() => {
		const spyFn = jest.fn()
		let count = 0

		for await (const val of repeat(asyncIteratorFn)) {
			if (count > 7) {
				break
			}

			spyFn(val)
			count++
		}

		expect(spyFn).toHaveBeenNthCalledWith(1, 1)
		expect(spyFn).toHaveBeenNthCalledWith(2, 2)
		expect(spyFn).toHaveBeenNthCalledWith(3, 3)
		expect(spyFn).toHaveBeenNthCalledWith(4, 4)
		expect(spyFn).toHaveBeenNthCalledWith(5, 5)
		expect(spyFn).toHaveBeenNthCalledWith(6, 1)
		expect(spyFn).toHaveBeenNthCalledWith(7, 2)
		expect(spyFn).toHaveBeenNthCalledWith(8, 3)
	})

})

describe('Take', () => {

	it('#1', async() => {
		const spyFn = jest.fn()

		for await (const val of take(asyncIteratorFn(), 3)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenCalledTimes(3)
	})

	it('#2', async() => {
		const spyFn = jest.fn()

		for await (const val of take(asyncIteratorFn(), 3)) {
			spyFn(val)
		}

		expect(spyFn).toHaveBeenNthCalledWith(1, 1)
		expect(spyFn).toHaveBeenNthCalledWith(2, 2)
		expect(spyFn).toHaveBeenNthCalledWith(3, 3)
	})

})
