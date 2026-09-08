import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ScreeningsService } from "./screenings.service";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from './dto/update-screening.dto';

@Controller("screenings")
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  create(@Body() createScreeningDto: CreateScreeningDto) {
    return this.screeningsService.create(createScreeningDto);
  }

  @Get()
  findAll() {
    return this.screeningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return this.screeningsService.findOne(Number(id));
  }

  @Patch('id')
  update(@Param ('id') id:string, @Body() updateScreeningDto: UpdateScreeningDto) {
    return this.screeningsService.update (
        Number(id)
        updateScreeningDto,
    );
  }

  @Delete('canceled')
  remove() {
    return this.screeningsService.remove();
  }
}
