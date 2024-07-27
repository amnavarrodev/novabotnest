import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramHearsService {
  handleHearsJugar(ctx) {
    ctx.reply('¡Vamos a jugar!');
  }
}
