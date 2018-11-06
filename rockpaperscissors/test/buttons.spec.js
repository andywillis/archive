import { rules, getRuleSets } from '../src/js/rules';

import {
	addRuleButtons,
	getButtons,
	buttonHTML,
	buttonStripHTML
} from '../src/js/buttons';

const ruleset = getRuleSets(rules);

describe('buttons', () => {

	describe('addRuleButtons', () => {

		it('should produce an object from an array of keys', () => {

			// Test
			const result = addRuleButtons(rules, ruleset);

			// Result
			expect(result.spock).to.not.be.undefined;
			expect(result.spock.length).to.equal(5);
			expect(result.spock.indexOf('lizard')).to.not.equal(-1);

		});

	});

	describe('getButtons', () => {

		it('should return a new button object', () => {

			// Test
			const result = getButtons(rules);

			// Result
			expect(result.spock).to.not.be.undefined;
			expect(result.spock.length).to.equal(5);
			expect(result.spock.indexOf('lizard')).to.not.equal(-1);

		});

	});

	describe('buttonHTML', () => {

		it('should return an HTML string from an array of button names', () => {

			// Test
			const html = buttonHTML(ruleset);

			// Result
			expect(html).to.be.a('string');

		});

	});

	describe('buttonStripHTML', () => {

		it('should add a wrapper to some button HTML', () => {

			// Set up
			const html = buttonHTML(ruleset);

			// Test
			const result = buttonStripHTML(html, 'options');

			// Result
			expect(result).to.be.a('string');

		});

	});


});
