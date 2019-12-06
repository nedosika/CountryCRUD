import shortid from "shortid";

export default class CountriesService {
  constructor(countries = CountriesService.generateRandomCountries()) {
    this.init(countries)
  };

  init = countries => {
    if(!localStorage.getItem("countries"))
      this.setCountries(countries);
  };

  setCountries = countries => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }

  getCountries = () => JSON.parse(localStorage.getItem("countries"));

  static generateRandomCountries = (count = 10000) => {
    const countries = [];
    for (let i = 0; i < count; i++) {
      countries.push({
        id: shortid.generate(),
        name: shortid.generate(),
        capital: shortid.generate()
      });
    }
    return countries;
  };
}
