import { ScreeningEntity } from "src/screenings/entities/screening.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rooms")
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120, unique: true })
  name!: string;

  @Column({ type: "int" })
  capacity!: number;

  @OneToMany(() => ScreeningEntity, (screening) => screening.room)
  screenings!: ScreeningEntity[];
}
