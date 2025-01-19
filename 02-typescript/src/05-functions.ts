// function greetingUser(userName: string): string {
//     return `Hello ${userName}`
// }

// const greetingUser2 = (userName: string): string => {
//     return `Hello ${userName}`
// }

// console.log(greetingUser('Goku'));
// console.log(greetingUser2('Vegeta'));


export type User = {
    uid: string,
    username: string
}

export const getUser = (): User => ({
    uid: 'ABC123',
    username: 'user123'
})

// const user = getUser()
// console.log(user);

//Homework function
export const getActiveUser = (name: string): User => ({
    uid: 'ABC123',
    username: name
})


// const activeUser = getActiveUser('Kenneth')
// console.log(activeUser);

