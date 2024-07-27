// telegram.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegramCommandModule } from 'src/telegram-command/telegram-command.module';
import { TelegramActionModule } from 'src/telegram-action/telegram-action.module';
import { TelegramHearsModule } from 'src/telegram-hears/telegram-hears.module';

@Module({
  imports: [
    ConfigModule,
    TelegramCommandModule,
    TelegramActionModule,
    TelegramHearsModule,
  ],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
