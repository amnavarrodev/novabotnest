import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';

@Injectable()
export class TelegramHearsService {
  handleHearsJugar(ctx) {
    const message = '¡Vamos a jugar! Elige una opción:';

    // Crear los botones
    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback('Colonia Común', 'colonia'),
      Markup.button.callback('Hábitat', 'habitat'),
      Markup.button.callback('Misiones', 'mision'),
    ]);

    // Enviar el mensaje con los botones
    ctx.reply(message, keyboard);
  }
}
