import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScreeningEntity } from "./entities/screening.entity";
import { Repository } from "typeorm";
import { RoomEntity } from "src/rooms/entities/room.entity";

@Injectable()
export class ScreeningsService {
    constructor(
        @InjectRepository (ScreeningEntity)
        private readonly screeningsRepository: Repository <ScreeningEntity>

        @InjectRepository (RoomEntity)
        private readonly roomsRepository: Repository <RoomEntity>
    ) {}

}
