import { ConflictException, Injectable } from "@nestjs/common";
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
    const existsroom = await this.roomRepository.findOneBy({
      name: createRoomDto.name,
    });

    if (!existsroom) {
      throw new ConflictException(
        `Room with name ${createRoomDto.name} already exists`,
      );
    }

    const room = this.roomRepository.create({
      name: createRoomDto.name,
      capacity: createRoomDto.capacity,
    });

    return this.roomRepository.save(room);
  }
}
