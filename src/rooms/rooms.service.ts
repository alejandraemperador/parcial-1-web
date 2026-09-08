import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomEntity } from "./entities/room.entity";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}
  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    const room = await this.roomRepository.findOneBy({
      id: createRoomDto.roomId,
    });

    if (!room) {
      throw new NotFoundException(
        `Room with id ${createRoomDto.roomId} was not found`,
      );
    }

    const room = this.roomRepository.create({
      name: createRoomDto.name,
      capacity: createRoomDto.capacity,
      room,
    });

    return this.roomRepository.save(room);
  }
}
