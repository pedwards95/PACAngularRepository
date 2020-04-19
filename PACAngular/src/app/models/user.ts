export default interface User
{
    UserId : number;
    PictureId : number;
    FirstName : string;
    LastName : string;
    Username :string;
    Password : string;
    Description? : string;
    Admin : boolean;
}