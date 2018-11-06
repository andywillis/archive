import { rules } from '../src/js/rules';
import RockPaperScissors from '../src/js/rockpaperscissors';

describe('RockPaperScissors', () => {

	it('should return an object', () => {

		const game = new RockPaperScissors(rules, 'default');
		expect(game).to.be.an('object');

	});

});
