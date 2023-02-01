import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from "typeorm"
import {hash} from "../helpers/bcrypt.helper";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(this.password){
            console.log(this.password);
            
            this.password = await hash(this.password);
        }
    }
}


