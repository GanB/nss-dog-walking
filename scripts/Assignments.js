import { getPets, getWalkers } from "./database.js";
import { getWalkerDetails } from "./Walkers.js";

// Get copy of state for use in this module
const pets = getPets();
const walkers = getWalkers();

// Function whose responsibility is to find the walker assigned to a pet
const findWalker = (pet, allWalkers) => {
  let petWalker = null;

  for (const walker of allWalkers) {
    if (walker.id === pet.walkerId) {
      petWalker = getWalkerDetails(walker.id);
    }
  }

  return petWalker;
};

export const Assignments = () => {
  let assignmentHTML = "";
  assignmentHTML = "<ul>";

  for (const currentPet of pets) {
    const currentPetWalker = findWalker(currentPet, walkers);
    assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${
                  currentPetWalker.walkerName
                } in ${currentPetWalker.walkerCities.join(", ")}
            </li>
        `;
  }

  assignmentHTML += "</ul>";

  return assignmentHTML;
};
