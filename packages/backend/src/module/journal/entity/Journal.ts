import { Entity, OneToMany, ManyToOne, Column } from 'typeorm';
import { JournalEntryEntity } from './JournalEntry';
import { UserEntity } from '../../user/entity/User';
import { AbstractEntity } from '../../../entity/AbstractEntity';

@Entity({
  name: 'journal'
})
export class JournalEntity extends AbstractEntity {

  @Column()
  name: string

  @ManyToOne(type => UserEntity, user => user.journals)
  user: UserEntity;

  @OneToMany(type => JournalEntryEntity, entry => entry.journal, {
    eager: true
  })
  entries: JournalEntryEntity[]

}
