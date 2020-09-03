import { Entity, ManyToOne, Column } from "typeorm";
import { AbstractEntity } from "../../../entity/AbstractEntity";
import { UserEntity } from "./User";

@Entity({
    name: 'crypto'
})
export class CryptoEntity extends AbstractEntity {

    @Column()
    secretKey: string;

    @Column()
    initVector: string;

    @ManyToOne(type => UserEntity, user => user.journals)
    user: UserEntity;

}
