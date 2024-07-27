// telegram.service.ts

import { Injectable } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('5769580134:AAHpL8afRODzrsBAkzGzTStAuDWfmmXFv-w');
    this.setupBot();
  }

  private setupBot() {
    this.setupStartCommand();

    this.bot.action('JUGAR', (ctx) => {
      ctx.reply('¡Vamos a jugar!');
    });

    this.bot.action('CONFIGURACION', (ctx) => {
      ctx.reply('Configuración seleccionada');
    });
    // Agregar más métodos para manejar otros comandos o tipos de mensajes

    this.bot.action('button_click', (ctx) => {
      // const buttonData = ctx.callbackQuery.data;
      console.log(ctx.callbackQuery);
    });

    this.bot.hears('🎮 Jugar', (ctx) => {
      console.log(ctx);

      ctx.reply('¡Vamos a jugar!');
    });
  }

  private setupStartCommand() {
    this.bot.start((ctx) => this.handleStartCommand(ctx));
  }

  private handleStartCommand(ctx) {
    // const menu = Markup.inlineKeyboard([
    //   Markup.button.callback('🎮 Jugar', 'JUGAR'),
    //   Markup.button.callback('⚙️ Configuración', 'CONFIGURACION'),
    // ]);
    const menu = Markup.keyboard([
      Markup.button.callback('🎮 Jugar', 'JUGAR'),
      Markup.button.callback('⚙️ Configuración', 'CONFIGURACION'),
    ])
      .resize()
      .oneTime();

    ctx.reply('¡Bienvenido! ¿Qué te gustaría hacer?', menu);
  }

  public startBot() {
    this.bot.launch();
  }
}
