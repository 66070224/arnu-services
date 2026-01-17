import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('varchar')
  email: string;

  @Index({ unique: true })
  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: false })
  isVerify: boolean; //Is user verified their email?
}
