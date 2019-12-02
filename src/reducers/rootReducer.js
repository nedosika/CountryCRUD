import {
  ADD_COUNTRY,
  REMOVE_COUNTRY,
  UPDATE_COUNTRY,
  FILTER_COUNTRY,
  SORT_COUNTRY
} from "../consts/consts";

import { setLocalStorage, initLocalStorage, generateRandomCountries } from "../utils";

const initialState = {
  // countries: [
  //   { id: "1", name: "Ukraine", capital: "Kyiv" },
  //   { id: "2", name: "Russia", capital: "Moscow" },
  //   { id: "3", name: "USA", capital: "Washington" },
  //   { id: "4", name: "Great Britain", capital: "London" },
  //   { id: "5", name: "India", capital: "Deli" }
  // ],
  countries: generateRandomCountries(100),
  filter: "",
  sortField: "name",
  sortDirection: "desc"
};

const rootReducer = (state = initLocalStorage(initialState), action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_COUNTRY:
      const withAddedCountry = [...state.countries, action.payload];
      setLocalStorage(withAddedCountry);
      return {
        ...state,
        countries: withAddedCountry
      };

    case REMOVE_COUNTRY:
      const withRemovedCountry = state.countries.filter(
        country => country.id !== action.payload
      );
      setLocalStorage(withRemovedCountry);
      return {
        ...state,
        countries: withRemovedCountry
      };

    case UPDATE_COUNTRY:
      const withUpdatedCountry = state.countries.map(country =>
        country.id === action.payload.id ? action.payload : country
      );
      setLocalStorage(withUpdatedCountry);
      return {
        ...state,
        countries: withUpdatedCountry
      };

    case FILTER_COUNTRY:
      return {
        ...state,
        filter: action.payload
      };

    case SORT_COUNTRY:
      return {
        ...state,
        sortField: action.payload,
        sortDirection:
          state.sortDirection === "desc" && action.payload === state.sortField
            ? "asc"
            : "desc"
      };

    default:
      return state;
  }
};

export default rootReducer;
