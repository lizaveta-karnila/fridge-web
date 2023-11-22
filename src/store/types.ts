export interface ITranslatable {
  en: string;
  ru: string;
}

export interface ICategory {
  id: string;
  iconLocation: string;
  iconURI: string;
  name: ITranslatable;
}

export interface IGrocery {
  id: string;
  iconLocation: string;
  iconURI: string;
  name: ITranslatable;
  standardQuantity: number;
  unitType: TUnitType;
}

export interface IGroceryWithCategory extends IGrocery {
  category: ICategory;
}

export interface ISelectedGrocery {
  grocery: IGrocery;
  quantity: number;
}

export type TUnitType = 'mass' | 'volume' | 'pieces';
export type TUnitOfMassType = 'kg' | 'g';
export type TUnitOfVolumeType = 'l' | 'ml';
export type TUnitOfPiecesType = 'pcs';
export type TUnit = TUnitOfMassType | TUnitOfVolumeType | TUnitOfPiecesType;
