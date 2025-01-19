// const characters: string[] = ['Goku', 'Vegeta', 'Trunks']

// //Skip one element of the array
// const [, ch2, ch3] = characters
// console.log(ch2, ch3);

//Return an array
export const returnArray = (): (string | number)[]=>{
    return ['ABC', 123]
}

// const [letters, numbers] = returnArray()
// console.log(letters, numbers);


// //Homework
// const stateProbe = (value: string): [string,  (value: string) => void ]=>{
//     return [value, (value: string):void=>{console.log(`Hello ${value}`);
//     }]
// }

// const arr = stateProbe('User')

// console.log(arr);

// const [value, setValue] = arr;

// setValue(value)