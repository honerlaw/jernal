import { Entity, ManyToOne, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { JournalEntryEntity } from './JournalEntry';
import { AbstractEntity } from '../../../entity/AbstractEntity';
import { QuestionEntity } from '../../question/entity/Question';

@Entity({
  name: 'journalEntryQuestion'
})
export class JournalEntryQuestionEntity extends AbstractEntity {

  @Column()
  answer: string // this is the answer you chose or wrote

  @ManyToOne(type => JournalEntryEntity, journal => journal.images)
  journalEntry: JournalEntryEntity;

  @ManyToOne(type => QuestionEntity, {
    eager: true
  })
  @JoinTable()
  question: QuestionEntity

}
