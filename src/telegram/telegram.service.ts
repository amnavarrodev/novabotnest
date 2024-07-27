// telegram.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { TelegramCommandService } from 'src/telegram-command/telegram-command.service';
import { TelegramActionService } from 'src/telegram-action/telegram-action.service';
import { TelegramHearsService } from 'src/telegram-hears/telegram-hears.service';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
    private readonly telegramCommandService: TelegramCommandService,
    private readonly telegramActionService: TelegramActionService,
    private readonly telegramHearsService: TelegramHearsService,
  ) {
    this.bot = new Telegraf(configService.get('TELEGRAM_BOT_TOKEN'));
    this.setupBot();
  }

  private setupBot() {
    this.setupStartCommand();
    this.setupHears();
  }

  private setupStartCommand() {
    this.bot.start((ctx) =>
      this.telegramCommandService.handleStartCommand(ctx),
    );
  }

  private setupHears() {
    this.bot.hears('🎮 Jugar', (ctx) =>
      this.telegramHearsService.handleHearsJugar(ctx),
    );
  }

  public startBot() {
    this.bot.launch();
  }
}
