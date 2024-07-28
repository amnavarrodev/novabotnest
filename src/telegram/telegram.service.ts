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
    this.setupAction();
  }

  private setupStartCommand() {
    // const bot = this.telegramBotProvider.getBotInstance();
    this.bot.start((ctx) =>
      this.telegramCommandService.handleStartCommand(ctx),
    );
  }

  private setupHears() {
    // const bot = this.telegramBotProvider.getBotInstance();
    this.bot.hears('🎮 Jugar', (ctx) =>
      this.telegramHearsService.handleHearsJugar(ctx),
    );
  }

  private setupAction() {
    // const bot = this.telegramBotProvider.getBotInstance();
    this.bot.action('main', async (ctx) =>
      this.telegramActionService.handleActionMain(ctx),
    );
    this.bot.action('colonia', async (ctx) =>
      this.telegramActionService.handleActionColoniaComun(ctx),
    );
    this.bot.action('habitat', async (ctx) =>
      this.telegramActionService.handleActionHabitat(ctx),
    );
    this.bot.action('mision', async (ctx) =>
      this.telegramActionService.handleActionMision(ctx),
    );
    this.bot.action(/vehiculo\d/, async (ctx) =>
      this.telegramActionService.handleActionVehiculo(ctx),
    );
  }

  public startBot() {
    // const bot = this.telegramBotProvider.getBotInstance();
    this.bot.launch();
  }
}
