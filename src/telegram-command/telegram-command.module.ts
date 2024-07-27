import { Module } from '@nestjs/common';
import { TelegramCommandService } from './telegram-command.service';

@Module({
  providers: [TelegramCommandService],
  exports: [TelegramCommandService],
})
export class TelegramCommandModule {}
