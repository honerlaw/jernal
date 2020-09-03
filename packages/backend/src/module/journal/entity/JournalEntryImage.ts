import { Entity, ManyToOne, Column } from 'typeorm';
import { JournalEntryEntity } from './JournalEntry';
import { AbstractEntity } from '../../../entity/AbstractEntity';

@Entity({
  name: 'journalEntryImage'
})
export class JournalEntryImageEntity extends AbstractEntity {

  @Column()
  path: string

  @ManyToOne(type => JournalEntryEntity, journal => journal.images)
  journalEntry: JournalEntryEntity;

}
