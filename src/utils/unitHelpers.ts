import {ITranslatable, TUnit, TUnitType} from "store/types";

const UNITS: { [k in TUnitType]: { [capacity: number]: ITranslatable } } = {
  mass: {
    1000: {
      en: 'kg',
      ru: 'кг',
    },
    1: {
      en: 'g',
      ru: 'г',
    },
  },
  volume: {
    1000: {
      en: 'l',
      ru: 'л',
    },
    1: {
      en: 'ml',
      ru: 'мл',
    },
  },
  pieces: {
    1: {
      en: 'pcs',
      ru: 'шт',
    }
  }
};

export const getCapacity = (unitType: TUnitType, unitValue: number): number => Object.keys(UNITS[unitType])
    .map((e) => Number(e))
    .sort((a, b) => b - a)
    .find((value) => unitValue >= value)
  || 1;

export const getUnitTranslation = (unitType: TUnitType, unitValue: number, lng: keyof ITranslatable): TUnit | '' => {
  const capacity = getCapacity(unitType, unitValue);
  return capacity && UNITS[unitType][capacity] ? UNITS[unitType][capacity][lng] as TUnit : '';
};

export const getUnitTranslatedQuantity = (unitType: TUnitType, unitQuantity: number): number => {
  const capacity = getCapacity(unitType, unitQuantity);
  return capacity ? Number((unitQuantity / capacity)) : 0;
};
