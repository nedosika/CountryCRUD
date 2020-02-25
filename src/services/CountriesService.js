export default class CountriesService {
  constructor() {
    this.init();
  }

  init = () => {
    if (!localStorage.getItem("countries"))
      this.setCountries(CountriesService.generateRandomCountries());
  };

  setCountries = countries => {
    localStorage.setItem("countries", JSON.stringify(countries));
  };

  getCountries = () => JSON.parse(localStorage.getItem("countries"));

  static generateRandomCountries = (count = 10000) => {
    console.log("generate");
    const countries = [
      { id: 1, name: "Ukraine", capital: "Kyiv" },
      { id: 2, name: "Russia", capital: "Moscow" },
      { id: 3, name: "USA", capital: "Washington" },
      { id: 4, name: "Great Britain", capital: "London" },
      { id: 5, name: "India", capital: "Deli" }
    ];

    for (let i = 6; i < count; i++) {
      countries.push({
        id: i,
        name: `Country - ${i}`,
        capital: `Capital - ${i}`
      });
    }
    return countries;
  };
}
