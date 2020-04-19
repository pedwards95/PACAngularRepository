export default interface User
{
    userId : number;
    pictureId : number;
    firstName : string;
    lastName : string;
    username :string;
    password : string;
    description? : string;
    admin : boolean;
}

// "userId": 1,
// "pictureId": 1,
// "firstName": "admin",
// "lastName": "admin",
// "username": "admin",
// "password": "admin",
// "description": null,
// "admin": true,