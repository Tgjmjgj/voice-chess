import { rand, LocalizationObject, WordForms } from './helpers';

export class Answer {
  private static lang: string;

  static setLanguage(language = 'ru'): void {
    this.lang = language;
  }

  static firstPlay(): string {
    return ({
      en:
        'Welcome to Voice Chess! Voice Chess is a game of chess, designed entirely for voice ' +
        'control. To learn about the features and available commands, say "Help" or "Info".',
      ru:
        'Добро пожаловать в Голосовые Шахматы! Голосовые Шахматы - это игра в шахматы, ' +
        'рассчитанная полностью на голосовое управление. Чтобы узнать о возможностях и ' +
        'доступных командах произнесите "Помощь", "Инфо" или "Справка".',
    } as LocalizationObject<string>)[this.lang];
  }
  static welcome(): string {
    return rand(
      ({
        en: [
          'Welcome to the Voice Chess!',
          'Hi!',
          'Want to play chess? This we can.',
          'Hi, I have not seen you for a while!',
        ],
        ru: [
          'Добро пожаловать в Голосовые Шахматы!',
          'С возвращением!',
          'Соскучились по шахматам? Я ждал вас.',
          'С возвращением в Голосовые Шахматы!',
          'Привет!',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static continueGame(): string {
    return rand(
      ({
        en: [
          "I was waiting for you! Now it's your turn.",
          "Let's go! Your turn.",
          "It's time! And your turn.",
        ],
        ru: [
          'Я ждал вас! Сейчас ваш ход.',
          'Поехали! Вам ходить.',
          'Давно пора! Ваш ход.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static newgame(): string {
    return rand(
      ({
        en: ['New game is started.', "Let's go, I cleared the board.", 'Ok.'],
        ru: [
          'Новая игра запущена.',
          'Ну давайте заново.',
          'Всегда рад новой партейке!',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static noGameToContinue(): string {
    return rand(
      ({
        en: [
          "Sorry, but you don't have a running game to continue.",
          "You don't have a running game.",
          "Sorry, but we don't have a running game.",
        ],
        ru: [
          'У вас нет запущенной игры, чтобы продолжить.',
          'Чтобы что-то продолжить, нужно чтобы было что-то, что можно продолжить.',
          'Простите, но у нас нет запущенной партии...',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static firstFallback(): string {
    return rand(
      ({
        en: [
          "I didn't understand.",
          "I'm sorry, can you try again?",
          "Sorry, I didn't understand you...",
          'Sorry, can you say it again?',
        ],
        ru: [
          'Я вас не совсем понял...',
          'Повторите, пожалуйста.',
          'Можно ещё раз?',
          'Не могли бы вы повторить?',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static secondFallback(): string {
    return rand(
      ({
        en: [
          "Sorry, I didn't understand what you want.",
          "I'm sorry, I didn't understand.",
        ],
        ru: [
          'Простите, я не могу понять, чего вы хотите.',
          'Извините, я не могу понять, о чём вы говорите.',
          'Я не могу вас понять...',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static confusedExit(): string {
    return rand(
      ({
        en: [
          "Sorry, but I can't understand what you want.\nMaybe try again later...",
          "It is a Chess Game. Is that exactly what you need?\nI'm not sure...",
          'Sorry, try again later.',
        ],
        ru: [
          'Извините, но я совсем не могу вас понять.\nПопробуйте позже.',
          'Может быть в другой раз...',
          'Это игра в шахматы. Вы точно попали куда нужно?\nЯ не уверен.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static board1(): string {
    return rand(
      ({
        en: [
          'You want see the board? Here is the first part: ',
          'Look at first part: ',
          'The first part of the board: ',
        ],
        ru: [
          'Первая половина доски: ',
          'Слушайте, что на первой половине доски: ',
          'Вот первая половина доски: ',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static board2(): string {
    return rand(
      ({
        en: ['The second part of the board: '],
        ru: ['Вторая половина доски: '],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static noboard(): string {
    return rand(
      ({
        en: [
          'There is no chess board yet.',
          "We don't play to see the board.",
          'Start a new game first!',
        ],
        ru: [
          'А нечего показывать.',
          'Сейчас нет запущенной партии.',
          'Доску можно увидеть только при запущенной игре.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static illegalMove(from: string, to: string, details: object): string {
    return rand(
      ({
        en: [
          "But you can't!",
          "You can't do this move!",
          `<speak>You can\'t move <say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>!</speak>`,
          'This makes no sense!\nYou need to come up with another move.',
          "Sorry, but you can't move like that...",
        ],
        ru: [
          'Вы не можете так походить!',
          'Вы не можете сделать такой ход!',
          `<speak>Вы не можете ходить с <say-as interpret-as="characters">${from}</say-as> на <say-as interpret-as="characters">${to}</say-as>.</speak>`,
          'Нельзя так ходить!',
          `<speak><say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>... Это некорректный ход.</speak>`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static playerMove(from: string, to: string, details: any): string {
    if (details.piece) {
      return rand(
        ({
          en: [
            `<speak><p><s>The move is made!</s><s>You move ${
              details.piece
            } from <say-as interpret-as="characters">${from}</say-as> to <say-as interpret-as="characters">${to}</say-as>.</s></p></speak>`,
          ],
          ru: [
            `<speak><p><s>Ход сделан!</s><s>Вы передвинули ${
              details.piece
            } с позиции <say-as interpret-as="characters">${from}</say-as> на <say-as interpret-as="characters">${to}</say-as>.</s></p></speak>`,
          ],
        } as LocalizationObject<string[]>)[this.lang]
      );
    } else {
      return rand(
        ({
          en: [
            `<speak><p><s>The move is made!</s><s>Your move: <say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>.</s></p></speak>`,
          ],
          ru: [
            `<speak><p><s>Принято!</s><s>Ваш ход: <say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>.</s></p></speak>`,
          ],
        } as LocalizationObject<string[]>)[this.lang]
      );
    }
  }
  static enemyMove(from: string, to: string, details: any): string {
    return rand(
      ({
        en: [
          `<break time="2s"/>I would move from <say-as interpret-as="characters">${from}</say-as> to <say-as interpret-as="characters">${to}</say-as>!`,
          `<break time="2s"/><say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>! And what do you say to that?`,
          `<break time="2s"/>I move <say-as interpret-as="characters">${from}</say-as> to <say-as interpret-as="characters">${to}</say-as>.`,
        ],
        ru: [
          `<break time="2s"/>Мой ход таков: с <say-as interpret-as="characters">${from}</say-as> на <say-as interpret-as="characters">${to}</say-as>.`,
          `<break time="2s"/>Хм... Пожалуй, <say-as interpret-as="characters">${from}</say-as> <say-as interpret-as="characters">${to}</say-as>.`,
          `<break time="2s"/>Я сделаю ход с <say-as interpret-as="characters">${from}</say-as> на <say-as interpret-as="characters">${to}</say-as>!`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static color(code: string, opt = 'mus'): string {
    if (code === code.toUpperCase()) {
      return ({
        en: 'black',
        ru: ({
          mus: 'чёрный',
          fem: 'чёрная',
        } as WordForms)[opt],
      } as LocalizationObject<string>)[this.lang];
    } else {
      return ({
        en: 'white',
        ru: ({
          mus: 'белый',
          fem: 'белая',
        } as WordForms)[opt],
      } as LocalizationObject<string>)[this.lang];
    }
  }
  static piece(code: string): string {
    code = code.toLowerCase();
    switch (code) {
      case 'p':
        return ({
          en: 'Pawn',
          ru: 'Пешка',
        } as LocalizationObject<string>)[this.lang];
      case 'r':
        return ({
          en: 'Rook',
          ru: 'Слон',
        } as LocalizationObject<string>)[this.lang];
      case 'n':
        return ({
          en: 'Knight',
          ru: 'Конь',
        } as LocalizationObject<string>)[this.lang];
      case 'b':
        return ({
          en: 'Bishop',
          ru: 'Ладья',
        } as LocalizationObject<string>)[this.lang];
      case 'q':
        return ({
          en: 'Queen',
          ru: 'Ферзь',
        } as LocalizationObject<string>)[this.lang];
      case 'k':
        return ({
          en: 'King',
          ru: 'Король',
        } as LocalizationObject<string>)[this.lang];
      default:
        return 'Error';
    }
  }
  static coloredPiece(code: string): string {
    const piece = this.piece(code);
    let color = null;
    if (piece === 'Пешка' || piece === 'Ладья') {
      color = this.color(code, 'fem');
    } else {
      color = this.color(code, 'mus');
    }
    return color + ' ' + piece;
  }
  static nRow(n: number, opt = 'mus'): string {
    switch (n) {
      case 1:
        return ({
          en: 'First row',
          ru: ({
            mus: 'Первый ряд',
            na: 'Первом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 2:
        return ({
          en: 'Second row',
          ru: ({
            mus: 'Второй ряд',
            na: 'Втором ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 3:
        return ({
          en: 'Third row',
          ru: ({
            mus: 'Третий ряд',
            na: 'Третьем ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 4:
        return ({
          en: 'Fourth row',
          ru: ({
            mus: 'Четвёртый ряд',
            na: 'Четвёртом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 5:
        return ({
          en: 'Fifth row',
          ru: ({
            mus: 'Пятый ряд',
            na: 'Пятом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 6:
        return ({
          en: 'Sixth row',
          ru: ({
            mus: 'Шестой ряд',
            na: 'Шестом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 7:
        return ({
          en: 'Seventh row',
          ru: ({
            mus: 'Седьмой ряд',
            na: 'Седьмом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      case 8:
        return ({
          en: 'Eighth row',
          ru: ({
            mus: 'Восьмой ряд',
            na: 'Восьмом ряду',
          } as WordForms)[opt],
        } as LocalizationObject<string>)[this.lang];
      default:
        return 'Error';
    }
  }
  static emptyRow(n: number): string {
    return rand(
      ({
        en: [`${this.nRow(n)} is empty.`],
        ru: [`На ${this.nRow(n, 'na')} нет фигур.`],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static coloredPieceOnPosition(code: string, pos: string): string {
    return rand(
      ({
        en: [
          `on <say-as interpret-as="characters">${pos}</say-as> ${this.coloredPiece(
            code
          )}`,
        ],
        ru: [
          `на <say-as interpret-as="characters">${pos}</say-as> ${this.coloredPiece(
            code
          )}`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static emptyPosition(pos: string): string {
    return rand(
      ({
        en: [`<say-as interpret-as="characters">${pos}</say-as> is free.`],
        ru: [
          `Клетка <say-as interpret-as="characters">${pos}</say-as> свободна.`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static incorrectRowNumber(num: number): string {
    return rand(
      ({
        en: [
          `Row ${num}? What does it mean?`,
          'You called the wrong row number. Rows are numbered from 1 to 8.',
        ],
        ru: [
          `Ряда ${num} не существует в шахматах.`,
          'Вы назвали неверный номер. Ряды в шахматах нумеруются от 1 до 8.',
          'Такого ряда не существует. Нумерация идёт с 1 до 8.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static noNextRow(): string {
    return rand(
      ({
        en: [
          'There is no next row.',
          'It was the 8th row.\nThere is no next row!',
          'It was the last row.\n',
        ],
        ru: [
          'Следующего ряда нет.',
          'Это был восьмой ряд.\nДальше некуда!',
          'Это был последний ряд.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static whiteSide(): string {
    return rand(
      ({
        en: ['Your side is White.\nAnd your turn is first!'],
        ru: [
          'Ваша сторона - Белая.\nПервый ход за вами.',
          'Вы за белых, ходите первыми.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static blackSide(): string {
    return rand(
      ({
        en: [
          'Your side is Black. My turn is first...',
          "Ok, you are for Black. Then I'll go first.",
        ],
        ru: [
          'Ваша сторона - Чёрная. Я хожу первым...',
          'Ладно, вы за Чёрных. Тогда мой ход первый.',
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static showDifficulty(current: number): string {
    return rand(
      ({
        en: [
          `The current difficulty level is ${current}.`,
          `At the moment, the difficulty is set to ${current}.`,
          `For now, the difficulty level is ${current}. Valid values are from 0 to 20.`,
        ],
        ru: [
          `Текущий уровень сложности: ${current}.`,
          `Текущая сложность: ${current}. Допустимые значения: от 0 до 20.`,
          `Сейчас уровень сложности равен ${current}`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static difficultyChanged(newLevel: number, oldLevel: number): string {
    return rand(
      ({
        en: [
          `The difficulty level has been changed from ${oldLevel} to ${newLevel}!`,
          `The difficulty level now is set to ${newLevel}!`,
          `Ok! Difficulty is now set to ${newLevel}.`,
        ],
        ru: [
          `Уровень сложности был изменён с ${oldLevel} на ${newLevel}!`,
          `Окей, теперь уровень сложности равен ${newLevel}.`,
          `Дело сделано - сложность теперь будет равна ${newLevel}`,
        ],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
  static difficultyTheSame(level: number): string {
    return rand(
      ({
        en: [`The difficulty level is already ${level}}!`],
        ru: [`Уровень сложности уже равен ${level}!`, 'Сложность и так такая!'],
      } as LocalizationObject<string[]>)[this.lang]
    );
  }
}