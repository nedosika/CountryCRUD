import {
  ADD_COUNTRY,
  REMOVE_COUNTRY,
  UPDATE_COUNTRY,
  FILTER_COUNTRY,
  SORT_COUNTRY
} from "../consts/consts";

export const addCountry = country => ({
  type: ADD_COUNTRY,
  payload: country
});

export const removeCountry = id => ({
  type: REMOVE_COUNTRY,
  payload: id
});

export const updateCountry = country => ({
  type: UPDATE_COUNTRY,
  payload: country
});

export const sortCountries = field => ({
  type: SORT_COUNTRY,
  payload: field
});

export const filterCountries = filter => ({
  type: FILTER_COUNTRY,
  payload: filter
});
