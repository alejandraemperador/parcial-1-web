export class UpdateScreeningDto {
  movieTitle?: string;
  startsAt?: Date;
  status?: "scheduled" | "cancelled";
}
