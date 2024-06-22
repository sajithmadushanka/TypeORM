import { Exclude } from "class-transformer";

export class SerializedUserDto {
    _id: number;
    name: string;
    email: string;
    address: string;

    @Exclude()
    password: string;

    constructor(user: SerializedUserDto) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.address = user.address;
    }
}