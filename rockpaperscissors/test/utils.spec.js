import { merge, getRandomNumber } from '../src/js/utils';

describe('utils', () => {

	describe('merge', () => {

		it('should merge two objects', () => {

			// Set up
			const init = { player: [ 1, 2 ]};
			const test = { default: {}, spock: {} };

			// Test
			const result = merge(init, test);

			// Result
			expect(result.spock).to.not.be.undefined;
			expect(result.spock).to.be.an('object');

		});

	});

	describe('getRandomNumber', () => {

		it('should merge two objects', () => {

			// Test
			const result = getRandomNumber(10);

			// Result
			expect(result).to.not.be.undefined;
			expect(result).to.be.above(-1);
			expect(result).to.be.below(11);

		});

	});

});

