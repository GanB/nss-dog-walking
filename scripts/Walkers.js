import { getWalkers, getWalkerCities, getCities } from "./database.js";

const walkers = getWalkers();
const walkerCities = getWalkerCities();
const cities = getCities();

export const Walkers = () => {
  let walkerHTML = "<ul>";

  for (const walker of walkers) {
    walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`;
  }

  return (walkerHTML += "</ul>");
};

export const getWalkerDetails = (walkerId) => {
  const walkerCityNames = [];

  for (const walker of walkers) {
    if (walker.id === parseInt(walkerId)) {
      walkerCities
        .filter(({ walkerId }) => walkerId === walker.id)
        .map((walkerCity) => ({
          ...cities.find((city) => city.id === walkerCity.cityId),
          ...walkerCity,
        }))
        .forEach((x) => walkerCityNames.push(x.name));

      return { walkerName: walker.name, walkerCities: walkerCityNames };
    }
  }
};

document.addEventListener("click", (clickEvent) => {
  const itemClicked = clickEvent.target;
  if (itemClicked.id.startsWith("walker")) {
    const [, walkerId] = itemClicked.id.split("--");

    const walkerDetails = getWalkerDetails(walkerId);

    window.alert(
      `${
        walkerDetails.walkerName
      } services following cities: ${walkerDetails.walkerCities.join(", ")}`
    );
  }
});
