import { QS } from '../src/js/dom';

describe('DOM', () => {

	describe('QS', () => {

		it('should grab an element using a selector', () => {

			// Set up
			const selector = 'html';

			// Test
			const element = QS(selector);

			// Result
			expect(typeof(element)).to.equal('object');

		});

	});

});
