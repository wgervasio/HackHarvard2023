import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("data")
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trash: number;

  @Column({ unique: true })
  plastic: number;

  @Column({ unique: true })
  metal: number;

  @Column({ unique: true })
  cardboard: number;

  @Column({ unique: true })
  paper: number;
}