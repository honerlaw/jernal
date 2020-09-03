import { Entity, ManyToOne, Column } from 'typeorm';
import { JournalEntryEntity } from './JournalEntry';
import { AbstractEntity } from '../../../entity/AbstractEntity';

@Entity({
  name: 'journalEntryQuestion'
})
export class JournalEntryQuestionEntity extends AbstractEntity {

  @Column()
  question: string

  @Column()
  answer: string

  @ManyToOne(type => JournalEntryEntity, journal => journal.images)
  journalEntry: JournalEntryEntity;

}
