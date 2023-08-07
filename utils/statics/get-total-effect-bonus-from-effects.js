const getTotalEffectBonusesFromEffects = effects => {
  let bonuses = {
    speed: 0,
    prosperity: 0,
    aptitude: 0,
    smash: 0,
    harvest: 0,
    hunt: 0,
    luck: 0
  }

  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    
    bonuses[effect.type] += parseFloat(effect.bonus)

    if (!!effect.max_bonus && bonuses[effect.type] > effect.max_bonus) {
      bonuses[effect.type] = effect.max_bonus;
    }
  }

  return bonuses
}

module.exports = getTotalEffectBonusesFromEffects