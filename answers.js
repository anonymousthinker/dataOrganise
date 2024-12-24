const data = [
  {
    name: "Rahul",
    age: 0,
    education: ["Computer Science"],
    employment: {
      status: true,
      profession: "software developer",
    },
    hobbies: [
      { type: "Chess", specifics: "" },
      { type: "Gardening", specifics: "" },
    ],
    hasCar: true,
    city: "Pune",
    pets: [
      {
        type: "dog",
        breed: "golden retriever",
        name: "Max",
        age: 4,
        vaccinated: true,
        favoriteActivity: "Playing fetch in the park",
      },
    ],
  },

  {
    name: "Ananya",
    age: 30,
    education: ["Computer Science", "Graphic Design"],
    employment: {
      status: false,
      profession: "",
    },
    hobbies: [
      { type: "Cooking", specifics: "experiment with italian recipes" },
    ],
    hasCar: false,
    city: "Bangalore",
    pets: [
      {
        type: "bird",
        breed: "parrot",
        name: "Kiwi",
        age: 0,
        vaccinated: true,
        favoriteActivity: "Mimicing voices",
      },
    ],
  },

  {
    name: "Ramesh",
    age: 45,
    education: [],
    employment: {
      status: true,
      profession: "Business Owner",
    },
    hobbies: [
      { type: "Gardening", specifics: "Tending to Rose Garden" },
      { type: "Reading", specifics: "Historical Fiction" },
    ],
    hasCar: true,
    city: "Jaipur",
    pets: [
      {
        type: "cat",
        breed: "persian cat",
        name: "Bella",
        age: 3,
        vaccinated: true,
        favoriteActivity: "Lounging in the sun",
      },
      {
        type: "cat",
        breed: "persian cat",
        name: "Leo",
        age: 3,
        vaccinated: true,
        favoriteActivity: "Lounging in the sun",
      },
    ],
  },

  {
    name: "Kavya",
    age: 28,
    education: [],
    employment: {
      status: false,
      profession: "dancer",
    },
    hobbies: [
      { type: "Watching", specifics: "Binge-watch sci-fi shows" },
      { type: "Reading", specifics: "Modern Fantasy Novels" },
    ],
    hasCar: false,
    city: "Chennai",
    pets: [
      {
        type: "rabbit",
        breed: "",
        name: "Snowy",
        age: 2,
        vaccinated: true,
        favoriteActivity: "Hopping around the backyard and nibbling on carrots",
      },
    ],
  },
];

//1. How many individuals are currently employed?

const noOfPeopleEmployed = () => {
  return data.filter(({ employment }) => employment.status).length;
};

console.log(noOfPeopleEmployed());

//2. How many people own a car?

const peopleOwningCar = () => {
  return data.filter((data) => data.hasCar).length;
};

console.log(peopleOwningCar());

//3. How many pets are fully vaccinated?

const vaccinatedPets = () => {
  const pets = data.flatMap((person) => person.pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

console.log(vaccinatedPets());

//4. What are the names of all the pets, and what type of animal is each?

const getNameAndType = ({ pets }) => {
  const nameAndType = pets.map(({ name, type }) => {
    return { name, type };
  });
  return nameAndType;
};

const nameAndTypeOfpet = () => {
  return data.map(getNameAndType);
};

console.log("nameAndTypeOfPet ", nameAndTypeOfpet());

//5. Which cities do the individuals live in?

const getCities = () => {
  return data.map(({ city }) => city);
};

console.log(getCities());

// 6. How many hobbies are shared across the group? What are they?

const unique = (uniqueHobbies, { type }) => {
  if (!uniqueHobbies.includes(type)) {
    uniqueHobbies.push(type);
  }

  return uniqueHobbies;
};

const getUniqueHobbies = () => {
  const hobbies = data.flatMap((person) => person.hobbies);
  return hobbies.reduce(unique, []);
};

console.log("getUniqueHobbies ", getUniqueHobbies());

//7. How many pets belong to people who are currently unemployed?

const petsOfUnemployed = () => {
  const unemployed = data.filter(({ employment }) => !employment.status);
  return unemployed.flatMap(({ pets }) => pets).length;
};

console.log(petsOfUnemployed());

//8. What is the average age of the individuals mentioned in the passage?

const getAverage = () => {
  const ages = data.filter(({ age }) => {
    return age !== 0;
  });
  const totalAge = ages.reduce((sum, { age }) => sum + age, 0);

  return Math.floor(totalAge / ages.length);
};

console.log(getAverage());

//9. How many individuals have studied computer science, and how many of them have pets?

const noOfCsStudents = () => {
  const cs = data.filter(({ education }) =>
    education.includes("Computer Science")
  );
  const havePets = cs.filter(({ pets }) => pets.length !== 0);

  return [cs.length, havePets.length];
};

console.log(noOfCsStudents());

//10. How many individuals own more than one pet?

const moreThanOnePet = () => {
  const noOfPetsPerPerson = data.map(({ pets }) => pets.length);
  return noOfPetsPerPerson.reduce((countOfPeople, noOfPets) => {
    return noOfPets > 1 ? countOfPeople + 1 : countOfPeople;
  }, 0);
};

console.log(moreThanOnePet());

//11. Which pets are associated with specific favorite activities?

const petsAndTheirActivities = () => {
  const pets = data.flatMap(({ pets }) => pets);
  return pets.map(({ name, favoriteActivity }) => [name, favoriteActivity]);
};

console.log(petsAndTheirActivities());

//12. What are the names of all animals that belong to people who live in Bangalore or Chennai?

const petsOfBangaloreChennai = () => {
  const peopleOfBangaloreAndChennai = data.filter(
    ({ city }) => city === "Bangalore" || city === "Chennai"
  );
  const pets = peopleOfBangaloreAndChennai.flatMap(({ pets }) => pets);
  return pets.map(({ name }) => name);
};

console.log(petsOfBangaloreChennai());

//13. How many vaccinated pets belong to people who do not own a car?

const petsOfPeopleWithoutCar = () => {
  const peopleWithNoCar = data.filter(({ hasCar }) => !hasCar);
  const pets = peopleWithNoCar.flatMap(({ pets }) => pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

console.log(petsOfPeopleWithoutCar());

//14. What is the most common type of pet among the group?

const countTypes = (count, type) => {
  if (!count.flat().includes(type)) {
    return [...count, [type, 1]];
  }

  count.at(-1)[1] += 1;
  return count;
};

const getCommonPet = () => {
  const pets = data.flatMap(({ pets }) => pets);
  const petTypes = pets.map(({ type }) => type);

  const getCounts = petTypes.reduce(countTypes, []);

  return getCounts.reduce(
    (maxCount, animalCount) => {
      return maxCount[1] < animalCount[1] ? animalCount : maxCount;
    },
    ["", -Infinity]
  );
};

console.log("getCommonPet ", getCommonPet());

//15. How many individuals have more than two hobbies?

const moreThanTwoHobbies = () => {
  const noOfHobbies = data.map(({ hobbies }) => hobbies.length);
  return noOfHobbies.reduce(
    (count, number) => (number > 2 ? count + 1 : count),
    0
  );
};

console.log(moreThanTwoHobbies());

//16. How many individuals share at least one hobby with Ramesh?

const getHobbiesOf = (personName) => {
  const person = data.find(({ name }) => name === personName);
  return person.hobbies.flatMap(({ type }) => type);
};

const commonHobbiesLikeRamesh = () => {
  const rameshHobbies = getHobbiesOf("Ramesh");

  const peopleHavingCommonHobbies = data.filter(({ hobbies }) => {
    const commonHobbies = hobbies.filter(({ type }) =>
      rameshHobbies.includes(type)
    );
    return commonHobbies.length !== 0;
  });

  return peopleHavingCommonHobbies.length - 1;
};

console.log("commonHobbiesLikeRamesh ", commonHobbiesLikeRamesh());

// 17. Which pet is the youngest, and what is its name?

const youngestPet = () => {
  const pets = data.flatMap(({ pets }) => pets);
  return pets.reduce(
    (nameAndAge, { name, age }) => {
      if (age !== 0) {
        return nameAndAge[1] < age ? nameAndAge : [name, age];
      }

      return nameAndAge;
    },
    ["", Infinity]
  );
};

console.log("youngestPet ", youngestPet());

// 18. What types of books are mentioned as interests, and who reads them?

const getReadingHobby = (hobbies) => {
  return hobbies.filter(({ type }) => type === "Reading");
};

const booksAndTheirReaders = () => {
  const peopleWhoRead = data.filter(
    ({ hobbies }) => getReadingHobby(hobbies).length !== 0
  );
  const hobbies = data.flatMap(({ hobbies }) => hobbies);
  const books = getReadingHobby(hobbies).map(({ specifics }) => specifics);
  return peopleWhoRead.map(({ name }, index) => [name, books[index]]);
};

console.log(booksAndTheirReaders());

// 19. How many individuals live in cities starting with the letter "B"?

const livingInCitiesStartingWithB = () => {
  return data.filter(({ city }) => city.startsWith("B")).length;
};

console.log(livingInCitiesStartingWithB());

// 20. Which individuals do not own any pets?

const noPets = () => {
  return data.filter(({ pets }) => pets.length === 0).length;
};

console.log(noPets());
