type Person = {
    firstName: string,
    age: number,
    nickname: string
}

// const personObject: Person = {
//     firstName: 'Tony',
//     age: 23,
//     nickname: 'Ironman'
// };

// const { firstName, age, nickname } = personObject;

// console.log(firstName, age, nickname);

export const returnPerson = ({ firstName, age, nickname } : Person): {[key: string]: any} => {
    console.log(firstName, age, nickname);
    
    return {
        nickname,
        newAge: age+2,
        latlng: {
            lat: 14.212214,
            lng: -12.232232
        }
    }
}

// const newPersonObject = returnPerson(personObject)
// const {nickname: otherNickname, newAge, latlng:{lat, lng}} = newPersonObject

// console.log(otherNickname, newAge, lat, lng);

