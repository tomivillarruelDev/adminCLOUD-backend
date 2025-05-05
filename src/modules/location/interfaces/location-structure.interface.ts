export interface LocationStructureCity {
  _id: any;
  name: string;
  code?: string;
  postalCodes?: string[];
}

export interface LocationStructureState {
  _id: any;
  name: string;
  code: string;
  cities: LocationStructureCity[];
}

export interface LocationStructureCountry {
  _id: any;
  name: string;
  code: string;
  flag?: string;
  states: LocationStructureState[];
}
