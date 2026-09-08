import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScreeningEntity } from "./entities/screening.entity";
import { Repository } from "typeorm";
import { RoomEntity } from "src/rooms/entities/room.entity";
import { CreateScreeningDto } from './dto/create-screening.dto';

@Injectable()
export class ScreeningsService {
    constructor(
        @InjectRepository (ScreeningEntity)
        private readonly screeningsRepository: Repository <ScreeningEntity>

        @InjectRepository (RoomEntity)
        private readonly roomsRepository: Repository <RoomEntity>
    ) {}
    async create(
        createScreeningDto: CreateScreeningDto,
    ): Promise <ScreeningEntity> {
        const roomId = await this.roomsRepository.findOneBy ({
            id: createScreeningDto.roomId,
        });
        if (!roomId) {
            throw new NotFoundException (
                `Room with id ${createScreeningDto.roomId} was not found`,
            );
        }
        const screening= this.screeningsRepository.create({
            movieTitle: createScreeningDto.movieTitle,
            startsAt: createScreeningDto.startsAt,
            status: 'scheduled',
            roomId,
        });
        return this.screeningsRepository.save(screening);
    }

    async findAll(): Promise<ScreeningEntity[]> {
        return this.screeningsRepository.find({
            relations: {
            roomId: true,
            },
            order: {
            id: "ASC",
            },
            });
  }

  async remove(): Promise<{ deleted: number }> {
    const result = await this.screeningsRepository.delete({
      status: "cancelled",
    });
    return { deleted: result.affected ?? 0 };
  }
}

