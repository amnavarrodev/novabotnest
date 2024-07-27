import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';

@Injectable()
export class TelegramCommandService {
  handleStartCommand(ctx) {
    const menu = Markup.keyboard([
      Markup.button.callback('🎮 Jugar', 'JUGAR'),
      Markup.button.callback('⚙️ Configuración', 'CONFIGURACION'),
    ])
      .resize()
      .oneTime();

    ctx.reply('¡Bienvenido! ¿Qué te gustaría hacer?', menu);
  }
}
