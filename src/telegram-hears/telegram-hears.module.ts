import { Module } from '@nestjs/common';
import { TelegramHearsService } from './telegram-hears.service';

@Module({
  providers: [TelegramHearsService],
  exports: [TelegramHearsService],
})
export class TelegramHearsModule {}
