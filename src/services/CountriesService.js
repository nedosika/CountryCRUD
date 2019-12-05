import shortid from "shortid";

export default class CountriesService {
  constructor(countries = CountriesService.generateRandomCountries()) {
    this.init(countries)
  };

  init = countries => {
    if(!localStorage.getItem("countries"))
      localStorage.setItem("countries", JSON.stringify(countries));
  };

  getCountries = () => JSON.parse(localStorage.getItem("countries"));

  static generateRandomCountries = (count = 1000) => {
    const countries = [];
    for (let i = 0; i < count; i++) {
      countries.push({
        id: i + 1,
        name: shortid.generate(),
        capital: shortid.generate()
      });
    }
    return countries;
  };
}
