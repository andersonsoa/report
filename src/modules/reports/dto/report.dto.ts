import { IsObject, IsOptional, IsString, isNotEmpty } from "class-validator";

export class ReportDTO {
  @IsString()
  templateName: string;

  @IsOptional()
  data: Record<string, unknown>;
}
