import { CombatEffect } from '@/models/CombatEffect'

export interface Boost {

}

export interface BoostOngoing extends CombatEffect, Boost {

}

export interface BoostNow extends Effect, Boost {

}