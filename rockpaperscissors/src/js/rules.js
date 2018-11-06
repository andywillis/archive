export const rules = {
  default: {
    rock: {
      scissors: 'crushes'
    },
    paper: {
      rock: 'covers'
    },
    scissors: {
      paper: 'cuts'
    }
  },
  spock: {
    rock: {
      scissors: 'crushes',
      lizard: 'crushes'
    },
    scissors: {
      paper: 'cuts',
      lizard: 'decapitate'
    },
    spock: {
      scissors: 'smashes',
      rock: 'vaporizes'
    },
    lizard: {
      spock: 'poisons',
      paper: 'eats'
    },
    paper: {
      spock: 'disproves',
      rock: 'covers'
    }
  }
}

/**
 * @function getRuleSets
 * @param  {object} rules Rules object
 * @return {array} Array of rule names
 */
export function getRuleSets(rules) {
	return Object.keys(rules);
}
