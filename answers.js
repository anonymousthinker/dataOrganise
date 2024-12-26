const report = [
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

const noOfPeopleEmployed = (data) => {
  return data.filter(({ employment }) => employment.status).length;
};

console.log(noOfPeopleEmployed(report));

//2. How many people own a car?

const peopleOwningCar = (data) => {
  return data.filter(({ hasCar }) => hasCar).length;
};

console.log(peopleOwningCar(report));

//3. How many pets are fully vaccinated?

const vaccinatedPets = (data) => {
  const pets = data.flatMap((person) => person.pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

console.log(vaccinatedPets(report));

//4. What are the names of all the pets, and what type of animal is each?

const getNameAndType = ({ pets }) => {
  const nameAndType = pets.map(({ name, type }) => {
    return { name, type };
  });
  return nameAndType;
};

const nameAndTypeOfpet = (data) => {
  return data.map(getNameAndType);
};

console.log("nameAndTypeOfPet ", nameAndTypeOfpet(report));

//5. Which cities do the individuals live in?

const getCities = (data) => {
  return data.map(({ city }) => city);
};

console.log(getCities(report));

// 6. How many hobbies are shared across the group? What are they?

const unique = (uniqueHobbies, { type }) => {
  if (!uniqueHobbies.includes(type)) {
    uniqueHobbies.push(type);
  }

  return uniqueHobbies;
};

const getUniqueHobbies = (data) => {
  const hobbies = data.flatMap((person) => person.hobbies);
  return hobbies.reduce(unique, []);
};

console.log("getUniqueHobbies ", getUniqueHobbies(report));

//7. How many pets belong to people who are currently unemployed?

const petsOfUnemployed = (data) => {
  const unemployed = data.filter(({ employment }) => !employment.status);
  return unemployed.flatMap(({ pets }) => pets).length;
};

console.log(petsOfUnemployed(report));

//8. What is the average age of the individuals mentioned in the passage?

const getAverage = (data) => {
  const ages = data.filter(({ age }) => {
    return age !== 0;
  });
  const totalAge = ages.reduce((sum, { age }) => sum + age, 0);

  return Math.floor(totalAge / ages.length);
};

console.log(getAverage(report));

//9. How many individuals have studied computer science, and how many of them have pets?

const noOfCsStudents = (data) => {
  const cs = data.filter(({ education }) =>
    education.includes("Computer Science")
  );
  const havePets = cs.filter(({ pets }) => pets.length !== 0);

  return [cs.length, havePets.length];
};

console.log(noOfCsStudents(report));

//10. How many individuals own more than one pet?

const moreThanOnePet = (data) => {
  const noOfPetsPerPerson = data.filter(({ pets }) => pets.length > 1);
  return noOfPetsPerPerson.reduce((countOfPeople, noOfPets) => {
    return noOfPets > 1 ? countOfPeople + 1 : countOfPeople;
  }, 0);
};

console.log(moreThanOnePet(report));

//11. Which pets are associated with specific favorite activities?

const petsAndTheirActivities = (data) => {
  const pets = data.flatMap(({ pets }) => pets);
  return pets.map(({ name, favoriteActivity }) => {
    return { name, favoriteActivity };
  });
};

console.log(petsAndTheirActivities(report));

//12. What are the names of all animals that belong to people who live in Bangalore or Chennai?

const petsOfBangaloreChennai = (data) => {
  const cities = ["Bangalore", "Chennai"];
  const peopleOfBangaloreAndChennai = data.filter(({ city }) =>
    cities.includes(city)
  );
  const pets = peopleOfBangaloreAndChennai.flatMap(({ pets }) => pets);
  return pets.map(({ name }) => {
    return { name };
  });
};

console.log(petsOfBangaloreChennai(report));

//13. How many vaccinated pets belong to people who do not own a car?

const petsOfPeopleWithoutCar = (data) => {
  const peopleWithNoCar = data.filter(({ hasCar }) => !hasCar);
  const pets = peopleWithNoCar.flatMap(({ pets }) => pets);
  return pets.filter(({ vaccinated }) => vaccinated).length;
};

console.log(petsOfPeopleWithoutCar(report));

//14. What is the most common type of pet among the group?

const countTypes = (count, type) => {
  count[type] = count[type] || 0;
  count[type]++;
  return count;
};

const getCommonPet = (data) => {
  //redo this
};

console.log("getCommonPet ", getCommonPet(report));

//15. How many individuals have more than two hobbies?

const moreThanTwoHobbies = (data) => {
  const noOfHobbies = data.map(({ hobbies }) => hobbies.length);
  return noOfHobbies.reduce(
    (count, number) => (number > 2 ? count + 1 : count),
    0
  );
};

console.log(moreThanTwoHobbies(report));

//16. How many individuals share at least one hobby with Ramesh?

const getHobbiesOf = (personName) => {
  const person = report.find(({ name }) => name === personName);
  return person.hobbies.flatMap(({ type }) => type);
};

const commonHobbiesLikeRamesh = (data) => {
  const rameshHobbies = getHobbiesOf("Ramesh");

  const peopleHavingCommonHobbies = data.filter(({ hobbies }) => {
    return hobbies.some(({ type }) => rameshHobbies.includes(type));
  });

  return peopleHavingCommonHobbies.length - 1;
};

console.log("commonHobbiesLikeRamesh ", commonHobbiesLikeRamesh(report));

// 17. Which pet is the youngest, and what is its name?

const youngestPet = (data) => {
  const pets = data.flatMap(({ pets }) => pets);
  return pets.reduce(
    (nameAndAge, { name, age }) => {
      if (age !== 0) {
        return nameAndAge[1] < age ? nameAndAge : [name, age];
      }

      return nameAndAge;
    },
    ["", Infinity] //change this into object
  );
};

console.log("youngestPet ", youngestPet(report));

// 18. What types of books are mentioned as interests, and who reads them?

const getReadingHobby = (hobbies) => {
  return hobbies.filter(({ type }) => type === "Reading");
};

const booksAndTheirReaders = (data) => {
  const peopleWhoRead = data.filter(
    ({ hobbies }) => getReadingHobby(hobbies).length !== 0
  );
  const hobbies = data.flatMap(({ hobbies }) => hobbies);
  const books = getReadingHobby(hobbies).map(({ specifics }) => specifics);
  return peopleWhoRead.map(({ name }, index) => [name, books[index]]);
};

console.log(booksAndTheirReaders(report));

// 19. How many individuals live in cities starting with the letter "B"?

const livingInCitiesStartingWithB = (data) => {
  return data.filter(({ city }) => city.startsWith("B")).length;
};

console.log(livingInCitiesStartingWithB(report));

// 20. Which individuals do not own any pets?

const noPets = (data) => {
  return data.filter(({ pets }) => pets.length === 0).length;
};

console.log(noPets(report));
