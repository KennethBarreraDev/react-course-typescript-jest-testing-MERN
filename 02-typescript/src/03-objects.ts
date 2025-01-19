export const person = {
    name: 'tony',
    lastName: 'stark',
    age: 45,
    address:{
        city: 'New York',
        zip: 12345,
        lat: 14.32432,
        lng: 34.92932
    }

}

//Copy memory reference, not values
//const person = person2

//With Object.assign
// const person2 = {...person}

// person2.name = 'Bruce'

// console.log(person);
// console.log(person2);
