import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn(
        {
            type: 'int',
            
        }
    )
    _id: number;

    @Column({type: 'varchar', length: 255, name: '_name'})
    name: string;

    @Column({type: 'varchar', length: 255, name: '_email'})
    email: string;

    @Column({type: 'varchar', length: 255, name: '_password'})
    password: string;

    @Column({type: 'varchar', length: 255, name: '_address', nullable: true})
    address: string;
}