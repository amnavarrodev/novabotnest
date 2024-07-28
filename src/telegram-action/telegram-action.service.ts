import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';

@Injectable()
export class TelegramActionService {
  private currentMessage: string = '';

  async handleActionMain(ctx) {
    console.log('Principal');
    try {
      const message = 'Sección inicial del juego.';

      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Colonia Común', 'colonia'),
        Markup.button.callback('Hábitat', 'habitat'),
        Markup.button.callback('Misiones', 'mision'),
      ]);

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionColoniaComun(ctx) {
    console.log('Colonia comun');
    try {
      const message =
        'Sección en construcción.' +
        '\nMuy pronto se mostrarán los datos de la Colonia aquí.';

      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('◀️ Atras', 'main'),
        Markup.button.callback('Hábitat', 'habitat'),
        Markup.button.callback('Misiones', 'mision'),
      ]);

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionHabitat(ctx) {
    console.log('Habitat');
    try {
      const message =
        'Sección en construcción.' +
        '\nMuy pronto se mostrarán los datos del Hábitat aquí.';

      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Colonia Común', 'colonia'),
        Markup.button.callback('◀️ Atras', 'main'),
        Markup.button.callback('Misiones', 'mision'),
      ]);

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionMision(ctx) {
    console.log('Seleccionando Vehículo para una misión.');
    try {
      const vehiculos = [
        { name: 'Rover', action: 'vehiculo1' },
        { name: 'Vehiculo 2', action: 'vehiculo2' },
        { name: 'Vehiculo 3', action: 'vehiculo3' },
        { name: 'Vehiculo 4', action: 'vehiculo4' },
        { name: 'Vehiculo 5', action: 'vehiculo5' },
        { name: 'Vehiculo 6', action: 'vehiculo6' },
        { name: 'Vehiculo 7', action: 'vehiculo7' },
        // { name: 'Vehiculo 8', action: 'vehiculo8' },
      ];
      const message =
        'Sección en construcción.' +
        '\nMuy pronto se mostrarán los datos de las Misiones aquí.' +
        '\nSeleccione el Vehículo a utilizar en la misión.';

      vehiculos.push({ name: `◀️ Atras`, action: `main` });
      const keyboard = Markup.inlineKeyboard(
        vehiculos.reduce((acc, vehiculo, index) => {
          if (index === vehiculos.length - 1) {
            acc.push([Markup.button.callback(vehiculo.name, vehiculo.action)]);
          } else {
            const rowIndex = Math.floor(index / 3); // Calcular la fila actual
            if (index % 3 === 0) {
              acc.push([]); // Agregar una nueva fila
            }
            acc[rowIndex].push(
              Markup.button.callback(vehiculo.name, vehiculo.action),
            );
          }
          return acc;
        }, []),
      );

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionVehiculo(ctx) {
    const btns = [
      { name: 'Exploración', action: 'tipomision1' },
      { name: 'Recolección', action: 'tipomision2' },
    ];

    const selectedVehicle = ctx.callbackQuery.data; // Obtener el vehículo seleccionado
    console.log('Vehículo seleccionado:', selectedVehicle);

    // Tomar decisiones basadas en el vehículo seleccionado
    // switch (selectedVehicle) {
    //   case 'vehiculo1':
    //     // Lógica para el Vehículo 1
    //     console.log('Vehículo 1');

    //     break;
    //   case 'vehiculo2':
    //     // Lógica para el Vehículo 2
    //     console.log('Vehículo 2');

    //     break;
    //   case 'vehiculo3':
    //     // Lógica para el Vehículo 3
    //     console.log('Vehículo 3');

    //     break;
    //   default:
    //     console.log('Vehículo no reconocido.');
    // }

    // Otros pasos que puedas necesitar realizar después de seleccionar un vehículo

    try {
      const message =
        'Sección en construcción.' +
        '\nSelección del tipo de misión en base al vehículo seleccionado.';

      btns.push({ name: `◀️ Atras`, action: `main` });
      const keyboard = Markup.inlineKeyboard(
        btns.reduce((acc, btn, index) => {
          if (index === btns.length - 1) {
            acc.push([Markup.button.callback(btn.name, btn.action)]);
          } else {
            const rowIndex = Math.floor(index / 3); // Calcular la fila actual
            if (index % 3 === 0) {
              acc.push([]); // Agregar una nueva fila
            }
            acc[rowIndex].push(Markup.button.callback(btn.name, btn.action));
          }
          return acc;
        }, []),
      );

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionTipoMision(ctx) {
    const btns = [
      { name: 'Destino 1', action: 'destino1' },
      { name: 'Destino 2', action: 'destino2' },
      { name: 'Destino 3', action: 'destino3' },
      { name: 'Destino 4', action: 'destino4' },
      { name: 'Destino 5', action: 'destino5' },
    ];

    const selectedTipoMision = ctx.callbackQuery.data; // Obtener el vehículo seleccionado
    console.log('Mision seleccionada:', selectedTipoMision);

    // Otros pasos que puedas necesitar realizar después de seleccionar un vehículo

    try {
      const message =
        'Sección en construcción.' +
        '\nSeleccion del destino para llevar a cabo la misión.';

      btns.push({ name: `◀️ Atras`, action: `main` });
      const keyboard = Markup.inlineKeyboard(
        btns.reduce((acc, btn, index) => {
          if (index === btns.length - 1) {
            acc.push([Markup.button.callback(btn.name, btn.action)]);
          } else {
            const rowIndex = Math.floor(index / 3); // Calcular la fila actual
            if (index % 3 === 0) {
              acc.push([]); // Agregar una nueva fila
            }
            acc[rowIndex].push(Markup.button.callback(btn.name, btn.action));
          }
          return acc;
        }, []),
      );

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async handleActionDestino(ctx) {
    const btns = [];

    const selectedDestino = ctx.callbackQuery.data; // Obtener el vehículo seleccionado
    console.log('Destino seleccionado:', selectedDestino);

    // Otros pasos que puedas necesitar realizar después de seleccionar un vehículo

    try {
      const message =
        'Sección en construcción.' +
        '\nLa misión ha iniciado de forma satisfactoria.' +
        '\nAhora debe esperar a que el Vehículo regrese de la misión.';

      btns.push({ name: `◀️ Atras`, action: `main` });
      const keyboard = Markup.inlineKeyboard(
        btns.reduce((acc, btn, index) => {
          if (index === btns.length - 1) {
            acc.push([Markup.button.callback(btn.name, btn.action)]);
          } else {
            const rowIndex = Math.floor(index / 3); // Calcular la fila actual
            if (index % 3 === 0) {
              acc.push([]); // Agregar una nueva fila
            }
            acc[rowIndex].push(Markup.button.callback(btn.name, btn.action));
          }
          return acc;
        }, []),
      );

      await ctx.answerCbQuery();
      await this.updateMessage(ctx, message, keyboard);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private async updateMessage(ctx, message, keyboard) {
    // Verificar si el nuevo mensaje es diferente al mensaje actual
    if (message !== this.currentMessage) {
      // Realizar la edición solo si los mensajes son diferentes
      await ctx.editMessageText(message, keyboard);
      this.currentMessage = message; // Actualizar el mensaje actual
    }
  }

  private handleExceptions(error: any) {
    console.log(error);
  }
}
