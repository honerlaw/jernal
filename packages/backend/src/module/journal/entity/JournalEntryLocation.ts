import { Entity, ManyToOne, Column } from 'typeorm';
import { JournalEntryEntity } from './JournalEntry';
import { AbstractEntity } from '../../../entity/AbstractEntity';

@Entity({
  name: 'journalEntryLocation'
})
export class JournalEntryLocationEntity extends AbstractEntity {

  // @todo maybe move to PostGIS?
  @Column({
    type: 'float'
  })
  latitude: number

  @Column({
    type: 'float'
  })
  longitude: number

  @ManyToOne(type => JournalEntryEntity, journal => journal.images)
  journalEntry: JournalEntryEntity;

}
