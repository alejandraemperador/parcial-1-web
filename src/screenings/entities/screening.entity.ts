import { RoomEntity } from "src/rooms/entities/room.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("screenings")
export class ScreeningEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  movieTitle!: string;

  @CreateDateColumn({ name: "startsAt" })
  startsAt!: Date;

  @Column({ type: "varchar", length: 30, default: "scheduled" })
  type!: "scheduled" | "cancelled";

  @ManyToOne(() => RoomEntity, (room) => room.screenings, {
    nullable: false,
  })
  @JoinColumn({ name: "room_id" })
  room!: RoomEntity;
}
