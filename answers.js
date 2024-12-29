import { report } from "./organize.js";

const getAnswer = (question, answer) => {
  console.log(question);
  console.log(answer);
};

const noOfPeopleEmployed = (report) => {
  return report.filter(({ employment }) => employment.status).length;
};

getAnswer(
  "How many individuals are currently employed?",
  noOfPeopleEmployed(report)
);

const peopleOwningCar = (report) => {
  return report.filter(({ hasCar }) => hasCar).length;
};

getAnswer("How many people own a car?", peopleOwningCar(report));

const vaccinatedPets = (report) => {
  const pets = report.flatMap((person) => person.pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

getAnswer("How many pets are fully vaccinated?", vaccinatedPets(report));

const getNameAndType = ({ pets }) => {
  const nameAndType = pets.map(({ name, type }) => {
    return { name, type };
  });
  return nameAndType;
};

const nameAndTypeOfpet = (report) => {
  return report.map(getNameAndType);
};

getAnswer(
  "What are the names of all the pets, and what type of animal is each? ",
  nameAndTypeOfpet(report)
);

const getCities = (report) => {
  return report.map(({ city }) => city);
};

getAnswer("Which cities do the individuals live in?", getCities(report));

const unique = (uniqueHobbies, { type }) => {
  if (!uniqueHobbies.includes(type)) {
    uniqueHobbies.push(type);
  }

  return uniqueHobbies;
};

const getUniqueHobbies = (report) => {
  const hobbies = report.flatMap((person) => person.hobbies);
  return hobbies.reduce(unique, []);
};

getAnswer(
  "How many hobbies are shared across the group? What are they? ",
  getUniqueHobbies(report)
);

const petsOfUnemployed = (report) => {
  const unemployed = report.filter(({ employment }) => !employment.status);
  return unemployed.flatMap(({ pets }) => pets).length;
};

getAnswer(
  "How many pets belong to people who are currently unemployed?",
  petsOfUnemployed(report)
);

const getAverage = (report) => {
  const ages = report.filter(({ age }) => {
    return age !== 0;
  });
  const totalAge = ages.reduce((sum, { age }) => sum + age, 0);

  return Math.floor(totalAge / ages.length);
};

getAnswer(
  "What is the average age of the individuals mentioned in the passage?",
  getAverage(report)
);

const noOfCsStudents = (report) => {
  const cs = report.filter(({ education }) =>
    education.includes("Computer Science")
  );
  const havePets = cs.filter(({ pets }) => pets.length !== 0);

  return [cs.length, havePets.length];
};

getAnswer(
  "How many individuals have studied computer science, and how many of them have pets?",
  noOfCsStudents(report)
);

const moreThanOnePet = (report) => {
  const noOfPetsPerPerson = report.filter(({ pets }) => pets.length > 1);
  return noOfPetsPerPerson.reduce((countOfPeople, noOfPets) => {
    return noOfPets > 1 ? countOfPeople + 1 : countOfPeople;
  }, 0);
};

getAnswer(
  "How many individuals own more than one pet?",
  moreThanOnePet(report)
);

const petsAndTheirActivities = (report) => {
  const pets = report.flatMap(({ pets }) => pets);
  return pets.map(({ name, favoriteActivity }) => {
    return { name, favoriteActivity };
  });
};

getAnswer(
  "Which pets are associated with specific favorite activities?",
  petsAndTheirActivities(report)
);

const petsOfBangaloreChennai = (report) => {
  const cities = ["Bangalore", "Chennai"];
  const peopleOfBangaloreAndChennai = report.filter(({ city }) =>
    cities.includes(city)
  );
  const pets = peopleOfBangaloreAndChennai.flatMap(({ pets }) => pets);
  return pets.map(({ name }) => {
    return { name };
  });
};

getAnswer(
  "What are the names of all animals that belong to people who live in Bangalore or Chennai?",
  petsOfBangaloreChennai(report)
);

const petsOfPeopleWithoutCar = (report) => {
  const peopleWithNoCar = report.filter(({ hasCar }) => !hasCar);
  const pets = peopleWithNoCar.flatMap(({ pets }) => pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

getAnswer(
  "How many vaccinated pets belong to people who do not own a car?",
  petsOfPeopleWithoutCar(report)
);

const countTypes = (count, type) => {
  count[type] = count[type] || 0;
  count[type]++;
  return count;
};

const getCommonPet = (report) => {
  const pets = report.flatMap(({ pets }) => pets);
  const petTypes = pets.map(({ type }) => type);

  const countOfPets = Object.entries(petTypes.reduce(countTypes, {}));

  //never forget the places where you have to destructure stuff.
  return countOfPets.reduce((common, [type, count]) => {
    const [_, maxCount] = Object.entries(common)[0] || ["", 0];
    return count > maxCount ? { [type]: count } : common;
  }, {});
};

getAnswer(
  "What is the most common type of pet among the group? ",
  getCommonPet(report)
);

const moreThanTwoHobbies = (report) => {
  const noOfHobbies = report.map(({ hobbies }) => hobbies.length);
  return noOfHobbies.reduce(
    (count, number) => (number > 2 ? count + 1 : count),
    0
  );
};

getAnswer(
  "How many individuals have more than two hobbies?",
  moreThanTwoHobbies(report)
);

const getHobbiesOf = (personName) => {
  const person = report.find(({ name }) => name === personName);
  return person.hobbies.flatMap(({ type }) => type);
};

const commonHobbiesLikeRamesh = (report) => {
  const rameshHobbies = getHobbiesOf("Ramesh");

  const peopleHavingCommonHobbies = report.filter(({ hobbies }) => {
    return hobbies.some(({ type }) => rameshHobbies.includes(type));
  });

  return peopleHavingCommonHobbies.length - 1;
};

getAnswer(
  "How many individuals share at least one hobby with Ramesh? ",
  commonHobbiesLikeRamesh(report)
);

const youngestPet = (report) => {
  const pets = report.flatMap(({ pets }) => pets);

  const agesWithoutDefaults = pets.filter(({ age }) => age !== 0);
  const youngestAge = Math.min(...agesWithoutDefaults.map(({ age }) => age));

  const youngestPet = pets.find(({ age }) => age === youngestAge);

  return { type: youngestPet.type, name: youngestPet.name };
};

getAnswer(
  "Which pet is the youngest, and what is its name? ",
  youngestPet(report)
);

const getReadingHobby = (hobbies) => {
  return hobbies.filter(({ type }) => type === "Reading");
};

const booksAndTheirReaders = (report) => {
  const peopleWhoRead = report.filter(
    ({ hobbies }) => getReadingHobby(hobbies).length !== 0
  );
  const hobbies = report.flatMap(({ hobbies }) => hobbies);
  const books = getReadingHobby(hobbies).map(({ specifics }) => specifics);
  return peopleWhoRead.map(({ name }, index) => [name, books[index]]);
};

getAnswer(
  "What types of books are mentioned as interests, and who reads them?",
  booksAndTheirReaders(report)
);

const livingInCitiesStartingWithB = (report) => {
  return report.filter(({ city }) => city.startsWith("B")).length;
};

getAnswer(
  'How many individuals live in cities starting with the letter "B"?',
  livingInCitiesStartingWithB(report)
);

const noPets = (report) => {
  return report.filter(({ pets }) => pets.length === 0).length;
};

getAnswer("Which individuals do not own any pets?", noPets(report));
