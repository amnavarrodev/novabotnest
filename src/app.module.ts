import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramActionService } from './telegram-action/telegram-action.service';
import { TelegramHearsService } from './telegram-hears/telegram-hears.service';
import { TelegramCommandService } from './telegram-command/telegram-command.service';
import { TelegramCommandModule } from './telegram-command/telegram-command.module';
import { TelegramHearsModule } from './telegram-hears/telegram-hears.module';
import { TelegramActionModule } from './telegram-action/telegram-action.module';
// import { TelegramBotProvider } from './common/telegram-bot.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule,
    TelegramCommandModule,
    TelegramHearsModule,
    TelegramActionModule,
  ],
  providers: [
    // TelegramBotProvider,
    TelegramActionService,
    TelegramHearsService,
    TelegramCommandService,
  ],
})
export class AppModule {}
