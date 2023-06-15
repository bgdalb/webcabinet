export class DisplayDoctorDTO {
    name: string;
    picturePath: string;
    doctorTitle: string;
    constructor(name: string, picturePath: string, doctorTitle: string) {
        this.name = name;
        this.picturePath = picturePath;
        this.doctorTitle = doctorTitle;
  }
}