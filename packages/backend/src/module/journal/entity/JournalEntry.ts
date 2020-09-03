import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { JournalEntryImageEntity } from './JournalEntryImage';
import { JournalEntryLocationEntity } from './JournalEntryLocation';
import { JournalEntryQuestionEntity } from './JournalEntryQuestion';
import { AbstractEntity } from '../../../entity/AbstractEntity';
import { JournalEntity } from './Journal';

@Entity({
  name: 'journalEntry'
})
export class JournalEntryEntity extends AbstractEntity {

  @ManyToOne(type => JournalEntity, journal => journal.entries)
  journal: JournalEntity;

  @OneToMany(type => JournalEntryImageEntity, entry => entry.journalEntry, {
    eager: true
  })
  images: JournalEntryImageEntity[]

  @OneToMany(type => JournalEntryLocationEntity, entry => entry.journalEntry, {
    eager: true
  })
  locations: JournalEntryLocationEntity[]

  @OneToMany(type => JournalEntryQuestionEntity, entry => entry.journalEntry, {
    eager: true
  })
  questions: JournalEntryQuestionEntity[]

}
