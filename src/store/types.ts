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
}

export interface IGroceryWithCategory extends IGrocery{
  category: ICategory;
}
