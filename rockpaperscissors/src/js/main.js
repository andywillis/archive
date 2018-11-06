require('../css/main.scss');

import { rules } from './rules';
import RockPaperScissors from './rockpaperscissors';

const game = new RockPaperScissors(rules, 'default');
game.init();
