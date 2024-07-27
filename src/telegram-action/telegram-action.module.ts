import { Module } from '@nestjs/common';
import { TelegramActionService } from './telegram-action.service';

@Module({
  providers: [TelegramActionService],
  exports: [TelegramActionService],
})
export class TelegramActionModule {}
