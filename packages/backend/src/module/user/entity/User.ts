import { Entity, Column, OneToMany } from 'typeorm';
import { JournalEntity } from '../../journal/entity/Journal';
import { AbstractEntity } from '../../../entity/AbstractEntity';
import { CryptoEntity } from './Crypto';
import { AnswerEntity } from '../../question/entity/Answer';
import { QuestionEntity } from '../../question/entity/Question';

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

  @OneToMany(type => QuestionEntity, question => question.user, {
    nullable: true
  })
  questions?: QuestionEntity[]

  @OneToMany(type => AnswerEntity, answer => answer.user, {
    nullable: true
  })
  answers?: AnswerEntity[]
  
}
