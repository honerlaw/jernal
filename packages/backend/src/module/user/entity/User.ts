import { Entity, Column, OneToMany } from 'typeorm';
import { JournalEntity } from '../../journal/entity/Journal';
import { AbstractEntity } from '../../../entity/AbstractEntity';
import { CryptoEntity } from './Crypto';

@Entity({
  name: 'user'
})
export class UserEntity extends AbstractEntity {

  @Column({
    unique: true
  })
  email: string;

  @Column()
  hash: string;

  @OneToMany(type => JournalEntity, journal => journal.user)
  journals: JournalEntity[];

  @OneToMany(type => CryptoEntity, crypto => crypto.user)
  crypto: CryptoEntity[];
  
}
