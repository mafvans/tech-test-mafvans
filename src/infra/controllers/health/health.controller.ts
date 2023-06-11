import { Controller, Get, HttpStatus } from '@nestjs/common';
@Controller()
export class HealthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  public check(): { status: HttpStatus.OK } {
    return {
      status: HttpStatus.OK,
    };
  }
}
