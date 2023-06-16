export class AddPatientDTO {
    email: string;
    password: string;
    family_name: string;
    first_name:string;
    CNP: string;
    date_of_birth: Date;
    
    constructor(email: string, password:string, family_name:string, first_name:string, CNP:string, date_of_birth:Date) {
        this.email = email;
        this.password = password;
        this.family_name = family_name;
        this.first_name = first_name;
        this.CNP = CNP;
        this.date_of_birth = date_of_birth;
  }
}