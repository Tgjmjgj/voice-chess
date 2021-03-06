import { rand, char, upFirst } from '../support/helpers';
import { ChessSide, WhoseSide, oppositeSide, getSide } from '../chess/chessUtils';
import { Langs, rLangs } from './struct/struct';
import { Vocabulary as Voc } from './vocabulary';
import { Phrases as Phr } from './phrases';

// prettier-ignore
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
        'доступных командах произнесите "Помощь" или "Справка".',
    } as Langs)[this.lang];
  }
  static welcome(): string {
    return rand(
      ({
        en: [
          'Welcome to the Voice Chess!',
          'Hi!',
          'Voice Chess welcomes you!',
          'Chessy chessy chess! Welcome back!',
          'Welcome back, grandmaster!',
          'Want to play chess? This we can.',
          'Hi, I have not seen you for a while!',
        ],
        ru: [
          'Добро пожаловать в Голосовые Шахматы!',
          'С возвращением!',
          'С возвращением, гроссмейстер!',
          'Соскучились по шахматам? Я ждал вас.',
          'С возвращением в Голосовые Шахматы!',
          'Привет!',
          'Рад вас видеть, гроссмейстер!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static continueGame(side: ChessSide, lastMove: string): string {
    const from = lastMove.slice(0, 2);
    const to = lastMove.slice(2, 4);
    return rand(
      ({
        en: [
          `I was waiting for you! You play ${Voc.side(side)}. Now it's your turn.`,
          `Let's go! Your turn. I remind, that you play ${Voc.side(side)}.`,
          `It's time! You are ${Voc.side(side, 'plr')}. And now it's your turn.`,
          `Well, we continue our game. I remind you that last time I made the  move ${char(from)} ${char(to)}, and now your turn.`,
          `Good, let's continue! We stopped at my turn ${char(from)} ${char(to)}. What are you going to do?`,
        ],
        ru: [
          `Я ждал вас! Вы играете за ${Voc.side(side, 'plr/rod')}, и сейчас ваш ход.`,
          `Поехали! Напоминаю, что вы за ${Voc.side(side, 'plr/rod')} и сейчас ваш ход.`,
          `Давно пора! Ваш ход. Вы играете ${Voc.side(side, 'plr/tvr')}.`,
          `Значит продолжаем. Напомню, что последний раз я сделал ход ${char(from)} ${char(to)}, и сейчас ваша очередь.`,
          `Отлично, давайте продолжим! Мы остановились на моём ходе ${char(from)} ${char(to)}. Что вы будете делать?`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static continueNewGame(side: ChessSide): string {
    return rand(
      ({
        en: [
          "Well, let's continue. By the way, we have not made any move yet.",
          'So, we continue, you are for white. All pieces in the original positions. We have not made any move yet.',
          'Continue the game? Ok, but we have just begun, and no one has yet made a single move.',
        ],
        ru: [
          'Значит продолжаем. Между прочим, мы ещё не сделали ни одного хода.',
          'Продолжаем, вы за белых. Все фигуры на начальных позициях. Мы ещё не сделали ни одного хода.',
          'А продолжать то практически и нечего - мы начали новую игру, и вы ещё не сделали в ней ни одного хода',
        ],
      } as rLangs)[this.lang]
    );
  }
  static newgame(): string {
    return rand(
      ({
        en: [
          'New game is started.',
          "Let's go, I cleared the board.",
          'Ok.',
          'Ok, we start a new game.',
          'We are starting a new game from scratch.',
          'So, new game!',
          "Let's go! It's a new game.",
        ],
        ru: [
          'Новая игра запущена.',
          'Поехали!. Новая игра.',
          'Всегда рад новой партейке!',
          'Ладно, мы начинаем новую партию!',
          'Что ж, да начнётся новая игра!',
          'Тогда мы начинаем!',
          'Новую игру в студию!',
        ],
      } as rLangs)[this.lang]
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
      } as rLangs)[this.lang]
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
          "I don't get it.",
          'What do you mean?',
          "What it's mean?",
          "I don't know what to answer",
          "I don't know what to say about this",
          "Are you sure this is what you want from me?",
        ],
        ru: [
          'Я вас не совсем понял...',
          'Повторите, пожалуйста.',
          'Можно ещё раз?',
          'Не могли бы вы повторить?',
          'Я вас не понял.',
          'Что вы хотели этим сказать?',
          'Что это значит?',
          'Я даже не знаю, что сказать.',
          'Я даже не знаю, как на это ответить',
          'Я не знаю, как мне на это отреагировать...',
        ],
      } as rLangs)[this.lang]
    );
  }
  static secondFallbackInGame(): string {
    return rand(
      ({
        en: [
          'May I ask you, maybe you want to make a move?',
          'Just make a move, amigo.',
          `Just say "Make a move", or something like ${char('g2')} ${char('g4')}.`,
          'You kidding me?',
          'Are you joking?',
          "Are you specifically asking me about something extra? I'm just a robot chess player.",
          "I'm a robot chess player, and I can't do anything except chess.",
          "Don't ask me about anything, I'm not Google Assistant, I'm just a poor robot chess player.",
          `If you want to make a move, just say it. Fore example, pawn ${char('a7')} ${char('a5')}.`,
        ],
        ru: [
          'Может быть вы хотите сделать ход?',
          'Может вы хотите походить?',
          `Просто скажите "Сделать ход", или назовите ход, например ${char('g2')} ${char('g4')}.`,
          'Вы шутите?',
          'Вы специально спрашиваете меня о чём-то лишнем? Я просто робот шахматист.',
          'Я робот шахматист, и не умею ничего кроме шахмат.',
          'Не спрашивайте меня ни о чём постороннем, я не Google Ассистент, я просто бедный робот шахматист.',
          `Если вы хотите походить, то просто назовите свой ход. Например так: пешка ${char('a7')} ${char('a5')}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static secondFallbackOutOfGame(): string {
    return rand(
      ({
        en: [
          'You kidding me?',
          'Are you joking?',
          "Are you specifically asking me about something extra? I'm just a robot chess player.",
          "I'm a robot chess player, and I can't do anything except chess.",
          "Don't ask me about anything, I'm not Google Assistant, I'm just a poor robot chess player.",
          'Just say that you want to start a new game, and we will play chess.',
          'This can no longer continue! Or start a new game, or exit!',
          `Please say "Let's start a new game", otherwise we will have to go to extremes!`,
        ],
        ru: [
          'Вы шутите?',
          'Вы специально спрашиваете меня о чём-то лишнем? Я просто робот шахматист.',
          'Я робот шахматист, и не умею ничего кроме шахмат.',
          'Не спрашивайте меня ни о чём постороннем, я не Google Ассистент, я просто бедный робот шахматист.',
          'Просто скажите, что вы хотите начать новую игру, и мы начнём.',
          'Так не может продолжаться долго! Или начинайте новую игру, или заканчивайте.',
          'Скажите "Давай начнём новую игру", или нам придётся дойти до крайностей!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static thirdFallback(): string {
    return rand(
      ({
        en: [
          "Sorry, I didn't understand what you want.",
          "I'm sorry, I didn't understand.",
          "I can't understand.",
          "I still don't understand.",
          "Sorry, I'm still didn't understand what you want.",
          'I just show you the help options...',
          "I don't know what to do, and just show you the help options...",
        ],
        ru: [
          'Простите, я не могу понять, чего вы хотите.',
          'Извините, я не могу понять, о чём вы говорите.',
          'Я никак не могу вас понять.',
          'Видимо это бесполезно.',
          'Нет, никак... Тогда я просто зачитаю вам справку:',
          'Не знаю ,что и делать, вот вам справка:',
          'Я не знаю, что с вами делать. Просто покажу вам справку:',
        ],
      } as rLangs)[this.lang]
    );
  }
  static confusedExit(): string {
    return rand(
      ({
        en: [
          "Sorry, but I can't understand what you want.\nMaybe try again later...",
          "It is a chess game. Is that exactly what you need?\nI'm not sure...",
          'Sorry, try again later.',
          'Come back when you are ready to play chess!',
          'Come back when you decide to play chess and not something else!',
          'Sorry, It was not normal, I hope this will not happen again.',
          'Sorry, It was strange. I hope this will not happen here again.',
        ],
        ru: [
          'Извините, но я совсем не могу вас понять.\nПопробуйте позже.',
          'Может быть в другой раз...',
          'Это игра в шахматы. Вы точно попали куда нужно?\nЯ не уверен.',
          'Возвращайтесь, когда будет настроены играть в шахматы!',
          'Приходите, когда решите сыграть в шахматы, а не во что-то другое!',
          'Это было не нормально, надеюсь, такого больше не повторится',
          'Это было странно. Я надеюсь, у нас такого больше не произойдет.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static board1(): string {
    return rand(
      ({
        en: [
          'You want to see the board? Here is the first part: ',
          'Look at first part: ',
          'The first part of the board: ',
          "Let's start with the first row of the board",
          "Now I'll tell you.",
          'Okay, listen.',
          'Ok, here it is. Listen.',
        ],
        ru: [
          'Первая половина доски: ',
          'Слушайте, что на первой половине доски: ',
          'Вот первая половина доски: ',
          'Начну с первого ряда: ',
          'Сначала первая половина доски: ',
          'Сейчас расскажу.',
          'Хорошо, слушайте.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static board2(): string {
    return rand(
      ({
        en: [
          'The second part of the board: ',
          'Next: ',
          'Next part: ',
          'And the next part of the board: ',
          '',
        ],
        ru: [
          'Вторая половина доски: ',
          'Следующая часть: ',
          'Следующая половина: ',
          'Продолжаю.',
          '',
        ],
      } as rLangs)[this.lang]
    );
  }
  static board(): string {
    return rand(
      ({
        en: [
          'Here is what we have on the board now: ',
          'So, chessboard: ',
          "What's on the board? Listen: ",
          'Listen. ',
          'Here it is. Listen. ',
          'Here is the situation: ',
          'The game is in full swing: ',
          'We are almost on the endgame: ',
          "That's what we have: ",
          "I'll show you now. ",
          '',
        ],
        ru: [
          'Вот что у нас сейчас на доске: ',
          'Итак, шахматная доска: ',
          'Что у нас на доске? Слушайте: ',
          'Вот: ',
          'Вот как обстоят дела: ',
          'Игра в самом разгаре: ',
          'Мы практически на эндшпиле: ',
          'Вот что у нас есть: ',
          'Что мы имеем: ',
          '',
        ],
      } as rLangs)[this.lang]
    );
  }
  static initialBoard(): string {
    return rand(
      ({
        en: [
          'We have just started new game, and all the pieces in the original position.',
          'All pieces in the starting position.',
          'All in the starting position - we have not played yet.',
          "It's an original position. You have not made a first move.",
          'All pieces in their original places.',
          'I have nothing unusual to show, the chessboard is now in initial position.',
        ],
        ru: [
          'Это новая игра, все фигуры в начальном положении.',
          'Все фигуры на своих начальных позициях.',
          'Всё на начальных позициях - мы только начали.',
          'Это начальная позиция. Вы ещё не сделали первого хода.',
          'Все фигуры на своих начальных местах.',
          'Нечего показывать, шахматная доска в начальном положении.',
        ],
      } as rLangs)[this.lang]
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
      } as rLangs)[this.lang]
    );
  }
  static illegalMove(from: string, to: string, pieceCode: string): string {
    return rand(
      ({
        en: [
          `${upFirst(Voc.piece(pieceCode))} ${char(from)} ${char(to)}. You can't move like that!`,
          `${char(from)} ${char(to)}. You can't do this move!`,
          `You can't move ${Voc.fromTo(from, to)}!`,
          `You can't make a ${Voc.piece(pieceCode)} move ${Voc.fromTo(from, to)}.`,
          `${char(from)} ${char(to)}... It is incorrect move.`,
          `${upFirst(Voc.pieceFrom(pieceCode, from))} can't make such a move!`,
          `You can't move ${Voc.piece(pieceCode)} from ${char(from)} to ${Voc.square(to)}.`,
          `${upFirst(Voc.pieceFrom(pieceCode, from))} can't move to ${Voc.square(to)}.`,
          `${char(from)} ${char(to)}. This move makes no sense!\n You need to come up with another move.`,
          "Sorry, but you can't move like that...",
        ],
        ru: [
          `${upFirst(Voc.piece(pieceCode))} ${char(from)} ${char(to)}. Вы не можете так походить!`,
          `${char(from)} ${char(to)}. Вы не можете сделать такой ход!`,
          `Вы не можете ходить ${Voc.fromTo(from, to)}.`,
          `Вы не можете сделать ход ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `${char(from)} ${char(to)}... Это некорректный ход.`,
          `${upFirst(Voc.pieceFrom(pieceCode, from))} не может так ходить!`,
          `Нельзя походить ${Voc.piece(pieceCode, 'tvr')} с ${char(from)} на ${char(to)}.`,
          `${upFirst(Voc.piece(pieceCode))} с ${Voc.square(from, 'rod')} не может ходить на ${char(to)}.`,
          'Извините, но вы не можете так походить...',
        ],
      } as rLangs)[this.lang]
    );
  }
  static playerMove(from: string, to: string, pieceCode: string): string {
    return rand(
      ({
        en: [
          `The move is made! You move ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `Ok, you move ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `You move your ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `You move ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}. I get it.`,
          `Well, you make a ${Voc.piece(pieceCode)} move ${Voc.fromTo(from, to)}.`,
          `So you make your move by setting the ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `Your ${Voc.piece(pieceCode)} from ${Voc.square(from)} moves to ${Voc.square(to)}.`,
          `${upFirst(Voc.piece(pieceCode))} ${Voc.fromTo(from, to)}. You made your move.`,
          `You move ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}. Not bad.`,
          `${char(from)} ${char(to)}. Ok, let it be so.`,
        ],
        ru: [
          `Ход сделан! Вы передвинули ${Voc.piece(pieceCode, 'vin')} ${Voc.fromTo(from, to)}.`,
          `Ладно, значит вы играете ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Вы передвигаете ${Voc.selfPiece(pieceCode, 'vin')} ${Voc.fromTo(from, to)}.`,
          `Что ж, вы переместили ${Voc.yourPiece(pieceCode, 'vin')} ${Voc.fromTo(from, to)}.`,
          `Значит, вы сделали ход ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `${upFirst(Voc.yourPiece(pieceCode))} с ${Voc.square(from, 'rod')} переходит на ${Voc.square(to, 'vin')}`,
          `Вы делаете ход ${Voc.selfPiece(pieceCode, 'tvr')}, передвигая его ${Voc.fromTo(from, to)}`,
          `${Voc.piece(pieceCode)} с ${char(from)} на ${char(to)}. Вы сделали свой ход!`,
          `Ход ${Voc.piece(pieceCode, 'tvr')} с ${Voc.square(from)} на ${Voc.square(to)}. Неплохо.`,
          `${char(from)} ${char(to)}. Ход принят.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static playerEat(eatedPieceCode: string): string {
    return rand(
      ({
        en: [
          `And grab my ${Voc.piece(eatedPieceCode)}. What a loss.`,
          `And you take off my ${Voc.piece(eatedPieceCode)}.`,
          `And I lose my ${Voc.piece(eatedPieceCode)}!`,
          `And so I loose ${Voc.piece(eatedPieceCode)}`,
          `And you eat my ${Voc.piece(eatedPieceCode)}. Very unpleasant.`,
          `You eat my ${Voc.piece(eatedPieceCode)}!`,
          `And you beat my ${Voc.piece(eatedPieceCode)}.`,
          `And you capture my ${Voc.piece(eatedPieceCode)}!`,
          `You are capturing my beloved ${Voc.piece(eatedPieceCode)}!`,
        ],
        ru: [
          `Ко всему прочему, я теряю ${Voc.selfPiece(eatedPieceCode, 'vin')}.`,
          `И вы забираете ${Voc.myPiece(eatedPieceCode, 'vin')}, чёрт...`,
          `Вы забираете ${Voc.myPiece(eatedPieceCode, 'vin')}!`,
          `И я лишаюсь ${Voc.selfPiece(eatedPieceCode, 'rod')}!`,
          `Вы съедаете ${Voc.myPiece(eatedPieceCode, 'vin')}!`,
          `И я теряю ${Voc.selfPiece(eatedPieceCode, 'vin')}.`,
          `${upFirst(Voc.myPiece(eatedPieceCode))} выходит из игры.`,
          `И вы лишили меня ${Voc.piece(eatedPieceCode, 'rod')}.`,
          `Весьма неприятно, но вы лишаете меня ${Voc.myPiece(eatedPieceCode, 'rod')}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static enemyMove(from: string, to: string, pieceCode: string): string {
    return rand(
      ({
        en: [
          `I will play a ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}!`,
          `My move is a ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}!`,
          `I move my ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `I'll make a ${Voc.piece(pieceCode)} move from ${char(from)} to ${char(to)}.`,
          `Now my turn. I'll make a move by the ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `Very interesting... I'll venture and make a move ${Voc.fromTo(from, to)} by my ${Voc.piece(pieceCode)}.`,
          `Then I'll make a move ${Voc.fromTo(from, to)} by the ${Voc.piece(pieceCode)}.`,
          `Then I'll play my ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `In turn, I will make a ${Voc.piece(pieceCode)} move ${Voc.fromTo(from, to)}.`,
          `And now it's my turn. Let's say I moved my ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
        ],
        ru: [
          `Мой ход: ${Voc.piece(pieceCode)} с ${char(from)} на ${char(to)}.`,
          `Мой ход таков: ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `Что ж, пожалуй я отвечу следующим образом: ${Voc.piece(pieceCode)} ${char(from)} ${char(to)}.`,
          `А я отвечу вам ходом ${Voc.piece(pieceCode, 'tvr')} с ${char(from)} на ${char(to)}.`,
          `Я сделаю ход ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}!`,
          `А я похожу ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Теперь я. ${upFirst(Voc.piece(pieceCode))} с ${char(from)} на ${char(to)}.`,
          `Любопытно... Я рискну и сделаю ход ${Voc.selfPiece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Теперь мой черёд. Я похожу ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Тогда я, в свою очередь, сделаю ход ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Мой ход. Я решил сыграть ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}`,
          `Не буду заставлять вас ждать. Мой ход: ${Voc.piece(pieceCode)} с ${char(from)} на ${char(to)}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static enemyEat(eatedPieceCode: string): string {
    return rand(
      ({
        en: [
          `I eat ${Voc.yourPiece(eatedPieceCode)}!`,
          `And I''ll take ${Voc.yourPiece(eatedPieceCode)}!`,
          `Minus ${Voc.yourPiece(eatedPieceCode)}.`,
          `And I captured ${Voc.yourPiece(eatedPieceCode)}!`,
          `I captured ${Voc.yourPiece(eatedPieceCode)}.`,
          `Say goodbye to your ${Voc.piece(eatedPieceCode)}!`,
          `Of course, I capture your ${Voc.piece(eatedPieceCode)}.`,
          `I take your ${Voc.piece(eatedPieceCode)}!`,
          `And I took your ${Voc.piece(eatedPieceCode)}!`,
          `Now your ${Voc.piece(eatedPieceCode)} is mine!`,
          `You lose ${Voc.piece(eatedPieceCode)}.`,
        ],
        ru: [
          `${upFirst(Voc.yourPiece(eatedPieceCode, 'sin'))} теперь ${Voc.my(Voc.pieceGender(eatedPieceCode))}!`,
          `И я лишаю вас ${Voc.piece(eatedPieceCode, 'rod')}.`,
          `Попрощайтесь со ${Voc.selfPiece(eatedPieceCode, 'tvr')}!`,
          `И я забираю ${Voc.yourPiece(eatedPieceCode, 'vin')}.`,
          `${upFirst(Voc.yourPiece(eatedPieceCode, 'vin'))} уходит в минус.`,
          `С вашего позволения, я забираю ${Voc.yourPiece(eatedPieceCode, 'vin')}.`,
          `Я съедаю ${Voc.yourPiece(eatedPieceCode, 'vin')}!`,
          `Я захвачу ${Voc.yourPiece(eatedPieceCode, 'vin')}.`,
          `И я возьму ${Voc.yourPiece(eatedPieceCode, 'vin')}.`,
          `И этим ходом я бью ${Voc.yourPiece(eatedPieceCode, 'vin')}!`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static enPassantPlayer(from: string, to: string, pawnPos: string): string {
    return rand(
      ({
        en: [
          `En passant! You move your pawn ${Voc.fromTo(from, to)} and capture my pawn in passing to ${Voc.square(pawnPos)}!`,
          `En passant! You capture my pawn in passing to ${Voc.square(pawnPos)}! You made a move by pawn ${Voc.fromTo(from, to)}.`,
          `How could I forget this? You take my pawn which I played the last move by making En Passant move from A2 to F5.`,
          `How I did not consider En Passant?. You took my pawn ${Voc.on(pawnPos)}, moving your pawn ${Voc.fromTo(from, to)}.`,
          `Have you decided to make En Passant? Very clever. I lose my pawn ${Voc.on(pawnPos)}.`,
          `You make En Passant - capturing in the passing! I lose my pawn ${Voc.on(pawnPos)}, and you move move your pawn ${Voc.fromTo(from, to)}.`,
        ],
        ru: [
          `Энпассант! Вы переходите пешкой ${Voc.fromTo(from, to)} и забираете мою пешку на проходе к ${Voc.square(pawnPos, 'dat')}!`,
          `Энпассант! Вы забираете мою пешку на проходе к ${Voc.square(pawnPos, 'dat')} ходом ${char(from)} ${char(to)}!`,
          `Как же я не предусмотрел! Вы забираете мою пешку Эн пассант, ходом ${Voc.fromTo(from, to)}!`,
          `Как же я не учёл Эн Пассант. Вы забираете пешку, которой я только что сыграл, сделав ход ${Voc.fromTo(from, to)} своей пешкой.`,
          `Вы решили сделать Эн Пассант? Умно. Я теряю свою пешку на ${char(pawnPos)}.`,
          `Вы делаете Эн Пассант - взятие на проходе! Я лишаюсь своей пешки ${Voc.on(pawnPos)}, а вы перемещаете свою на ${Voc.square(to, 'vin')}`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static enPassantEnemy(from: string, to: string, pawnPos: string): string {
    return rand(
      ({
        en: [
          `En passant! I move my pawn ${Voc.fromTo(from, to)} and capture your pawn in passing to ${Voc.square(pawnPos)}!`,
          `En passant! I will capture your pawn in passing to ${Voc.square(pawnPos)}! My move is pawn ${Voc.square(from)} ${Voc.square(to)}.`,
          `What about this? En Passant! I catch your pawn ${Voc.on(pawnPos)}, making a move ${char(from)} ${char(to)}.`,
          `And I will answer you capturing on the pass! En Passant! I move my pawn ${Voc.fromTo(from, to)}, and take off your pawn!`,
          `Have you considered this? ${char(from)} ${char(to)}. I make En Passant and grab the pawn you just moved!`,
          `Now my turn. I move my pawn ${Voc.fromTo(from, to)} and capture En Passant the pawn you just moved!`,
        ],
        ru: [
          `Энпассант! Я хожу пешкой ${Voc.fromTo(from, to)} и забираю вашу пешку ${char(pawnPos)} на проходе!`,
          `Энпассант! Я заберу вашу пешку на проходе к ${Voc.square(pawnPos, 'dat')}! Мой ход - пешка ${char(from)} ${char(to)}.`,
          `А об этом вы подумали? Эн Пассант! Я захватываю вашу пешку ${Voc.on(pawnPos)} своим ходом с ${char(from)} на ${char(to)}.`,
          `А я отвечу вам взятием на проходе! Эн Пассант! Я переставляю свою пешку ${Voc.fromTo(from, to)}, и забираю вашу ${Voc.on(pawnPos)}.`,
          `А вы учли вот это? Я делаю Эн Пассант и забираю пешку, которой вы только что походили! ${char(from)} ${char(to)}!`,
          `Теперь мой черёд. Я сделаю ход пешкой ${Voc.fromTo(from, to)} и заберу Эн Пассант вашу пешку на ${char(pawnPos)}!`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static castlingByPlayer(kFrom: string, kTo: string, rFrom: string, rTo: string): string {
    const cSide = Voc.castlSide(kFrom + kTo);
    return rand(
      ({
        en: [
          `You made castling! The king moves from ${Voc.square(kFrom)} to ${Voc.square(kTo)} and the rock moves from ${Voc.square(rFrom)} to ${Voc.square(rTo)}!`,
          `This is castling! You move the king through two squares from ${Voc.square(kFrom)} to ${Voc.square(kTo)}, and place your rock from ${Voc.square(rFrom)} to ${Voc.square(rTo)} behind the king.`,
          `This move you castling, moving your king from ${Voc.square(kFrom)} to ${Voc.square(kTo)} and the rock from ${Voc.square(rFrom)} to ${Voc.square(rTo)}.`,
          `So you make castling on the ${cSide}.`,
          `And you do ${cSide} castling!`,
          `You make castling on the ${cSide}. The king moves to ${Voc.square(kTo)}, and the rook moves to ${Voc.square(rTo)}.`,
        ],
        ru: [
          `Вы делаете рокировку! Король перемещается с ${Voc.square(kFrom, 'rod')} на ${Voc.square(kTo, 'vin')}, а ладья с ${Voc.square(rFrom, 'rod')} двигается за короля на ${Voc.square(rTo, 'vin')}.`,
          `И это рокировка! Вы перемещаете короля на две клетки c ${char(kFrom)} на ${Voc.square(kTo, 'vin')} и ставите ладью с ${Voc.square(rFrom, 'rod')} за своего короля, на ${Voc.square(rTo, 'vin')}.`,
          `Этим ходом вы совершаете рокировку, перемещая своего короля с ${Voc.square(kFrom, 'rod')} на ${Voc.square(kTo, 'vin')} и ладью с ${Voc.square(rFrom, 'rod')} на ${Voc.square(rTo, 'vin')}!`,
          `Вы делаете рокировку на ${cSide}!`,
          `И вы совершаете рокировку на ${cSide}.`,
          `И вы делаете рокировку на ${cSide}. Король перемещается на ${Voc.square(kTo, 'vin')}, а ладья на ${Voc.square(rTo, 'vin')}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static castlingByOpponent(kFrom: string, kTo: string, rFrom: string, rTo: string): string {
    const cSide = Voc.castlSide(kFrom + kTo);
    return rand(
      ({
        en: [
          `I will do castling! My king from ${Voc.square(kFrom)} moves to ${Voc.square(kTo)} and my rock from ${Voc.square(rFrom)} moves to ${Voc.square(rTo)}!`,
          `And I make castling! I move the king from ${Voc.square(kFrom)} to ${Voc.square(kTo)}, and place the rock from ${Voc.square(rFrom)} on ${Voc.square(rTo)} behind the king.`,
          `I will do castling in my turn. I move my king from ${Voc.square(kFrom)} to ${Voc.square(kTo)} and rock from ${Voc.square(rFrom)} to ${Voc.square(rTo)}.`,
          `And my turn. I'll make a ${cSide} castling!`,
          `Let's see... I make castling on the ${cSide}.`,
          `Then I'll make castling on the ${cSide}! My king moves to ${Voc.square(kTo)}, and my rook from ${Voc.square(rFrom)} moves to ${Voc.square(rTo)}.`,
        ],
        ru: [
          `Я сделаю рокировку! Мой король перемещается с ${Voc.square(kFrom, 'rod')} на ${Voc.square(kTo, 'vin')}, а ладья с ${Voc.square(rFrom, 'rod')} встаёт за короля на ${Voc.square(rTo, 'vin')}.`,
          `И это рокировка! Я перемещаю короля на две клетки c ${char(kFrom)} на ${Voc.square(kTo, 'vin')} и ставлю ладью с ${Voc.square(rFrom, 'rod')} за своего короля, на ${Voc.square(rTo, 'vin')}.`,
          `Я совершу своим ходом рокировку, и перемещу короля с ${Voc.square(kFrom, 'rod')} на ${Voc.square(kTo, 'vin')}, а ладью с ${Voc.square(rFrom, 'rod')} на ${Voc.square(rTo, 'vin')}!`,
          `Мой ход. И я сделаю рокировку на ${cSide}.`,
          `Что ж, тогда я сделаю рокировку. На ${cSide}.`,
          `А я выполняю рокировку на ${cSide}. Мой король перемещается на ${Voc.square(kTo, 'vin')}, а ладья на ${Voc.square(rTo, 'vin')}`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static incorrectRankNumber(num: number): string {
    return rand(
      ({
        en: [
          `In chess there is no row ${num}!`,
          'You said the wrong rank number. The ranks in standard chess are numbered from 1 to 8.',
          "Rank with this number doesn't exist. The numbering starts from 1 and ends at 8.",
          `Rank ${num}? What does it mean?`,
          `${num} is an invalid rank number.`,
          `Where on the chessboard did you see rank number ${num}?`,
        ],
        ru: [
          `Ряда ${num} не существует в шахматах.`,
          'Вы назвали неверный номер. Ряды в шахматах нумеруются от 1 до 8.',
          'Такого ряда не существует. Нумерация идёт с 1 до 8.',
          `Ряд ${num}? Что это значит?`,
          `${num} - это некорректный номер ряда.`,
          `Где вы видели на шахматной доске ряд под номером ${num}?`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static noNextRank(): string {
    return rand(
      ({
        en: [
          'There is no next rank.',
          'It was the 8th rank.\nThere is no next rank!',
          'It was the last rank.',
          'It was the last rank I guess.',
          'Which row do you want to see after the last one?',
          'It was the end of a chessboard.',
        ],
        ru: [
          'Следующего ряда нет.',
          'Это был восьмой ряд.\nДальше некуда!',
          'Это был последний ряд.',
          'Только что был последний восьмой ряд.',
          'Какой ряд вы хотите увидеть после последнего?',
          'Это конец шахматной доски. Следующего ряда нет.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static noPrevRank(): string {
    return rand(
      ({
        en: [
          'There is no previous rank.',
          'It was the 1th rank.\nThere is no previous rank!',
          'It was the first rank on the chessboard. What is the "previous"?',
          'It was the first rank.',
          'Which row do you want to see before the first one?',
          'No previous rank.',
        ],
        ru: [
          'Это был первый ряд, куда дальше то!',
          'Только что был первый ряд, перед ним на доске ничего нет.',
          'Это вам не программирование, в шахматах нумерация идёт с единицы, а не с нуля!',
          'Больше предыдущих нет!',
          'Только что был самый первый ряд. Что значит "предыдущий" от него?',
          'В шахматах нет нулевого ряда!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static whiteSide(): string {
    return rand(
      ({
        en: [
          'Your side is white. And your turn is first!',
          'You are for the whites, then must go first.',
          'Ok, you are for the whites.',
          'So, you move first.',
          'Good. Then you need to move first.',
          "Well, you are for whites, I'm for blacks.",
          "Ok, so I'm for black.",
          "Then I'm for black.",
          "So be it, this time I'll be for black.",
          "Ok, this time I'll play black.",
        ],
        ru: [
          'Ваша сторона - белая. Первый ход за вами.', 
          'Вы за белых, и должны ходить первыми.',
          'Ладно, вы за белых.',
          'Значит ваш ход первый.',
          'Значит первый ход ваш.',
          'Хорошо, вы за белых, я за чёрных.',
          'Ок, значит я за чёрных.',
          'Тогда я за чёрных.',
          'Тогда ваш ход первый.',
          'Хорошо, в этот раз я буду за чёрных.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static blackSide(): string {
    return rand(
      ({
        en: [
          'Your side is black. My turn is first.',
          "Ok, you are for black. Then I'll go first.",
          'Then I play white.',
          'So, I play white, and my move is first.',
          "You are for black, I'm for whites. And I'll made a move first.",
          'You are for black... Consequently, the first move for me.',
          "If you play black, then I'm white. And white goes first.",
          "You have decided for blacks? Well, now I'll play for whites.",
          'If so, then I go first.',
          "Good, this time I'm for whites, you're for blacks.",
        ],
        ru: [
          'Ваша сторона - чёрная. Я хожу первым.',
          'Ладно, вы за чёрных. Тогда мой ход первый.',
          'Тогда за белых я.',
          'Значит я за белых, и сейчас мой ход.',
          'Вы за чёрных, я за белых. Значит я должен сделать первый ход.',
          'Вы за чёрных... Следовательно, первый ход за мной.',
          'Если вы играете за чёрных, то я за белых. Белые ходят первыми.',
          'Вы решили за чёрных? Хорошо, сейчас за белых сыграю я.',
          'Раз так, то я хожу первым.',
          'Хорошо, в этот раз вы за чёрных, я за белых.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static showDifficulty(current: number): string {
    return rand(
      ({
        en: [
          `The current difficulty level is ${current}.`,
          `At the moment, the difficulty is set to ${current}.`,
          `For now, the difficulty level is ${current}. Valid values are from 0 to 20.`,
          `The difficulty level is set to ${current} from 20.`,
          `The current level of difficulty is ${current}. You can change it to any value from 0 to 20.`,
          `You're now on the ${current}th difficulty level.`,
        ],
        ru: [
          `Текущий уровень сложности: ${current}.`,
          `Текущая сложность: ${current}. Допустимые значения: от <sub alias="нуля">0</sub> до <sub alias="двадцати">20</sub>.`,
          `Сейчас уровень сложности равен ${current}.`,
          `В данный момент выбрана ${current}-ая сложность.`,
          `На текущий момент, уровень сложности выставлен в ${current} из <sub alias="двадцати">20</sub>.`,
          `Сейчас сложность равна ${current}, из <sub alias="двадцати">20</sub доступных уровней.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static difficultyChanged(newLevel: number, oldLevel: number): string {
    return rand(
      ({
        en: [
          `The difficulty level has been changed from ${oldLevel} to ${newLevel}!`,
          `The difficulty level is now set to ${newLevel}!`,
          `Ok! Difficulty is now set to ${newLevel}.`,
          `All right, the level of difficulty is now set to ${newLevel}.`,
          `You have successfully changed the difficulty from level ${oldLevel} to level ${newLevel}.`,
          `You set the difficuly level to ${newLevel}. Well, let's see how the game will go now.`,
        ],
        ru: [
          `Уровень сложности был изменён с ${oldLevel} на ${newLevel}!`,
          `Окей, теперь уровень сложности равен ${newLevel}.`,
          `Дело сделано - сложность теперь будет равна ${newLevel}.`,
          `Хорошо, вы изменили сложность с ${oldLevel} на ${newLevel}.`,
          `Хорошо, теперь уровень сложности будет равен ${newLevel}.`,
          `Вы изменили уровень сложности с ${oldLevel} на ${newLevel}. Посмотрим, как игра пойдёт теперь.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static difficultyTheSame(level: number): string {
    return rand(
      ({
        en: [
          `The difficulty level is already ${level}!`,
          `The difficulty level is equal to ${level}!`,
          `Ok, I change the level of difficulty from ${level} to ${level}. Good?`,
          `But the level of difficulty is already equal to 7!`,
          `Ok, I will leave the difficulty at the same level.`,
          `Then difficulty level will remain the same.`,
        ],
        ru: [
          `Уровень сложности уже равен ${level}!`,
          'Сложность и так такая!',
          `Ладно, я поменял сложность с ${level} на ${level}. Теперь вы довольны?`,
          `Но уровень сложности сейчас и так равен ${level}.`,
          `Хорошо, я оставлю сложность на прежнем уровне.`,
          `Тогда сложность останется прежней.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static checkmateToPlayer(movesNum: number): string {
    return rand(
      ({
        en: [
          `Checkmate in ${movesNum} moves!`,
          'Checkmate!',
          'Checkmate, my friend!',
          "It's a checkmate.",
          'Checkmate, by the way.',
          'Checkmate, I think!',
          'Check and mate!',
        ],
        ru: [
          `Шах и мат в ${movesNum} ходов!`,
          'Шах и мат!',
          'Вам шах и мат!',
          'Шах и мат, друг мой!',
          'Я полагаю, вам шах и мат!',
          'И я ставлю вам шах и мат!',
          'И это шах и мат!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static checkmateToEnemy(movesNum: number): string {
    return rand(
      ({
        en: [
          `Oh... You checkmate me! Very impressive!`,
          `And it's a checkmate! In ${movesNum} moves!`,
          'Checkmate!',
          "It's a checkmate!",
          'Checkmate to me!',
          'Check and mate! How did you do it?',
        ],
        ru: [
          'Погодите секундочку... Вы поставили мне шах и мат?',
          `Мне шах и мат! За ${movesNum} ходов!`,
          'Вы поставили мне шах и мат!',
          'И вы ставите меня в положение шаха и мата!',
          'Мне шах и мат!',
          'Вы ставите мне шах и мат! Как вы это сделали?',
        ],
      } as rLangs)[this.lang]
    );
  }
  static youLose(): string {
    return rand(
      ({
        en: [
          "I won! Don't worry, next time you get it!",
          'This is my victory!',
          'You lose this game, but who knows, maybe you are lucky in our next game!',
          'I defeated you!',
          'I won!',
          'This time I am a winner!',
          'You played well! But this time I became a winner!',
          "Easy-breezy. I'm joke. Nice game!",
        ],
        ru: [
          'Вы проиграли! Ничего, в другой раз всё получится.',
          'Что ж, победа за мной!',
          'И я выхожу из этой схватки победителем!',
          'Я выиграл, и это было легко!',
          'Легкая победа!',
          'Вы неплохо справлялись, но победа за мной!',
          'Вы хорошо играли! Но в этот раз победа досталсь мне.',
          'На этот раз я победил! Посмотрим, что будет дальше.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static youWin(): string {
    return rand(
      ({
        en: [
          'You won! Congratulations!',
          'And you exit this game as a winner!',
          'Congratulations, this match is yours!',
          'I lose! This time you will be the winner.',
          'It was a nice game. You won!',
          'Victory is yours. Congratulations!',
        ],
        ru: [
          'Ничего себе, да вы победили! Поздравляю!',
          'И вы выходите из этой партии победителем!',
          'Поздравляю, эта партия за вами.',
          'Я проиграл! На этот раз победителем будете вы.',
          'Это была славная игра. Вы победили!',
          'Победа за вами! Примите мои поздравления!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static draw(): string {
    return rand(
      ({
        en: [
          'It seems like a draw.',
          "It's a draw. The game is over.",
          "Draw, well played. Now it's over.",
          'And this is a draw. Here we finish.',
          "Here we'll stop. This is a draw.",
          'And we end this game with a draw!',
        ],
        ru: [
          'Похоже, у нас ничья!',
          'И это ничья! Партия окончена.',
          'Ничья. Дальше играть некуда.',
          'И это ничья. Здесь мы и закончим.',
          'Здесь мы и остановимся. Это ничья.',
          'И мы заканчиваем эту партию ничьёй!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static checkToEnemy(): string {
    return rand(
      ({
        en: [
          'And you set me a check!',
          'You set me the check, by the way!',
          'Check to my king!',
          "And it's a check to my king!",
          "And I'm in check now.",
          'You are check my king!',
        ],
        ru: [
          'И тем самым вы ставите мне шах!',
          'Между прочим, вы ставите мне шах!',
          'И вы ставите шах моему королю!',
          'Вы поставили мне шах!',
          'Шах моему королю!',
          'И это шах моему королю!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static checkToPlayer(): string {
    return rand(
      ({
        en: [
          'Check to your king!',
          'I set check to you, by the way.',
          'Check to your king!',
          "And it's a check to your king!",
          'Your king in check now.',
          "I'm check your king!",
        ],
        ru: [
          'Вам шах.',
          'Между делом, вам шах.',
          'И я ставлю шах вашему королю.',
          'Я ставлю вам шах!',
          'Шах вашему королю!',
          'И это шах вашему королю.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static stalemateToEnemy(): string {
    return rand(
      ({
        en: [
          "It's a stalemate situation!",
          'Stalemate! I have nothing to move.',
          'You set me in a stalemate!',
          'Oops, stalemate!',
          "I'm at a dead end. This is a stalemate!",
          "You drove me into a stalemate!",
        ],
        ru: [
          'Патовая ситуация!',
          'Пат! Мне нечем ходить.',
          'Вы поставили мне пат!',
          'Я в тупике. Это пат.',
          'Вы загнали меня в тупик. Пат.',
          'Пат! Я не могу сделать ход.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static stalemateToPlayer(): string {
    return rand(
      ({
        en: [
          "It's a stalemate situation!",
          "Stalemate! You don't have any piece to legal move.",
          'I put you into a stalemate!',
          "I don't see a better way. Stalemate.",
          "And it's a stalemate to you.",
          "It's a stalemate.",
        ],
        ru: [
          'Что ж, вам пат.',
          'У вас больше нет доступных ходов. Это пат.',
          'Похоже, я поставил вам пат.',
          'Я не вижу лучшего сценария... Вам пат.',
          'Я не знаю, что ещё можно сделать. Вам пат.',
          'И это патовая ситуация.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static fiftymove(): string {
    return rand(
      ({
        en: [
          "It's a 50 move rule!",
          'For 50 moves in a row there was not a single capture of any piece or pawn movement.',
          'Well well. Our game is extremely delayed. The 50 move rule comes into effect.',
        ],
        ru: [
          'Правило 50 ходов!',
          'Уже 50 ходов подряд не было ни одного взятия фигуры или передвижения пешки!',
          'Так-так. Наша игра чрезвычайно затянулась. В действие вступает правило 50 ходов.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static squareIsEmpty(square: string, pieceCode?: string): string {
    if (pieceCode) {
      return rand(
        ({
          en: [
            `There is no ${Voc.piece(pieceCode)} on ${Voc.square(square)}! It's empty.`,
            `${upFirst(Voc.piece(pieceCode))} from ${Voc.square(square)}? Are you sure? ${upFirst(Voc.square(square))} is empty!`,
            `You confused something. There is no chess pieces on ${Voc.square(square)}.`,
          ],
          ru: [
            `Но клетка ${char(square)} пустая. На ней нет ${Voc.piece(pieceCode, 'rod')}!`,
            `${upFirst(Voc.piece(pieceCode))} ${Voc.on(square)}? Но ${Voc.on(square)} ничего нет.`,
            `${upFirst(Voc.on(square))} нет ${Voc.piece(pieceCode, 'rod')}. На ней вообще нет фигур - это свободная клетка.`,
          ],
        } as rLangs)[this.lang]
      );
    } else {
      return rand(
        ({
          en: [
            `But ${Voc.square(square)} is empty. There are no pieces!`,
            `Sorry, but there are no pieces on ${Voc.square(square)}.`,
            `The position is incorrect. ${upFirst(Voc.square(square))} is empty!`,
          ],
          ru: [
            `Но клетка ${char(square)} пустая. На ней нет фигур.`,
            `${upFirst(Voc.on(square))} нет фигур.`,
            `Это некорректная позиция. ${upFirst(Voc.on(square))} ничего нет.`,
          ],
        } as rLangs)[this.lang]
      );
    }
  }
  static piecesDontMatch(playerPiece: string, actualPiece: string, square: string): string {
    return rand(
      ({
        en: [
          `But ${Voc.on(square)} is not a ${Voc.piece(playerPiece)}, but a ${Voc.piece(actualPiece)}.`,
          `${upFirst(Voc.on(square))} is a ${Voc.piece(actualPiece)}, not a ${Voc.piece(playerPiece)}.`,
          `${upFirst(Voc.on(square))} is not a ${Voc.piece(playerPiece)}, but a ${Voc.piece(actualPiece)}.`,
        ],
        ru: [
          `Но ${Voc.on(square)} стоит не ${Voc.piece(playerPiece)}, a ${Voc.piece(actualPiece)}.`,
          `Только ${Voc.on(square)} находится ${Voc.piece(actualPiece)}, а не ${Voc.piece(playerPiece)}.`,
          `${upFirst(Voc.on(square))} не ${Voc.piece(playerPiece)}, а ${Voc.piece(actualPiece)}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static promotion(from: string, to: string): string {
    return rand(
      ({
        en: [
          `Your pawn reaches the last rank! Now you need to use promotion!`,
          `When your pawn moves ${Voc.fromTo(from, to)}, there will be a promotion!`,
          `It is time to Pawn promotion!`,
          `Pawn promotion!`,
        ],
        ru: [
          `Ваша Пешка дошла до последнего ряда. Теперь её можно превратить в другую фигуру!`,
          `При переходе Пешки ${Voc.fromTo(from, to)} происходит превращение!`,
          `Время превращения пешки!`,
          `Повышение пешки!`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static moveWithPromotion(pieceCode: string): string {
    return rand(
      ({
        en: [
          `And pawn transforms to ${Voc.piece(pieceCode)}!`,
          `And now it\'s a ${Voc.piece(pieceCode)}!`,
          `Pawn promotes into a ${Voc.piece(pieceCode)}!`,
        ],
        ru: [
          `И пешка становится ${Voc.piece(pieceCode, 'tvr')}!`,
          `Теперь это ${Voc.piece(pieceCode)}!`,
          `Пешка превратилась в ${Voc.piece(pieceCode, 'vin')}!`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static itsAll(): string {
    return rand(
      ({
        en: [
          "It's all.",
          'And it is the end.',
          'And that was the last item.',
        ],
        ru: [
          'И это всё.',
          'Все, это конец.',
          'Это всё, что есть.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static emptyHistory(): string {
    return rand(
      ({
        en: [
          'There is no story here, we just started a new game!',
          'The history of moves is empty, we are just started.',
          "History is empty, we didn't make any move yet.",
        ],
        ru: [
          'Какая история? Мы только начали новую игру!',
          'В истории нет ни одного хода, мы только начали.',
          'Никакой истории нет, ещё не было сделано ни одного хода',
        ],
      } as rLangs)[this.lang]
    );
  }
  static invalidMovesNumber(invNum: number): string {
    return rand(
      ({
        en: [
          'This value is invalid!',
          `The number of moves can't be equal to ${invNum}.`,
        ],
        ru: [
          'Вы назвали некорректное число.',
          `Количество ходов не может быть равно ${invNum}!`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static moreMovesThanWeHave(invNum: number, num: number): string {
    return rand(
      ({
        en: [
          `We didn't do so many moves! Only ${num}:`,
          `We have only ${num} moves in the history of the game:`,
          `${invNum} it is too many. We played only 3 moves.`,
          'This is more than we played in the whole game! I will show you everything that we have in the history of moves:',
          `We have not played ${invNum} moves throughout the game. I can tell you only ${num} moves:`,
        ],
        ru: [
          `Но мы не сделали столько ходов. Лишь ${num}:`,
          `У нас всего ${num} ходов в истории:`,
          `${invNum} ходов я физически не могу назвать, но вот ${num} - пожалуйста.`,
          'Это больше чем было за всю игру. Я перечислю вам всё, что есть.',
          `За всю игру было только ${num} ходов. Так что больше чем ${num} я вам не назову.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static wrongSide(playerSide: ChessSide, from: string, pieceCode: string): string {
    const enemySide = oppositeSide(playerSide);
    return rand(
      ({
        en: [
          `You play ${Voc.color(playerSide, 'plr')}, but ${Voc.on(from)} is ${Voc.myColoredPiece(pieceCode)}!`,
          `You cannot play ${Voc.coloredPiece(pieceCode)}, because it's mine!`,
          `You are for ${Voc.color(playerSide, 'plr')}, I am for ${Voc.color(enemySide, 'plr')}. The ${Voc.piece(pieceCode)} ${Voc.on(from)} is ${Voc.color(enemySide)}, thus mine.`,
        ],
        ru: [
          `Вы играете за ${Voc.color(playerSide, 'plr/rod')}, а ${Voc.on(from)} стоит ${Voc.myPiece(pieceCode)}!`,
          `Вы не можете играть за ${Voc.piece(pieceCode, 'rod')} ${Voc.on(from)}, она моя.`,
          `Вообще то за ${Voc.color(enemySide, 'plr/rod')} играю я. Вы не можете ходить моими фигурами.`,
          `Вы за ${Voc.color(playerSide, 'plr/rod')}, я за ${Voc.color(enemySide, 'plr/rod')}. Следите за фигурами. ${upFirst(Voc.on(from))} ${Voc.myColoredPiece(pieceCode)}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static confirmEnabled(): string {
    return rand(
      ({
        en: [
          'Okay, move confirmation is now activated!',
          'Ok, now I will ask for confirmation of each your move!',
        ],
        ru: [
          'Хорошо, подтверждение ходов теперь включено.',
          'Принято! Теперь я буду спрашивать у вас подтверждение ходов.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static confirmDisabled(): string {
    return rand(
      ({
        en: [
          'Okay, confirmation of moves in now disabled.',
          'Ok, I will no longer ask you for confirmation.',
        ],
        ru: [
          'Окей, подтверждение ходов выключено.',
          'Хорошо, я больше не буду спрашивать подтверждения для ваших ходов.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static doNotHurry(): string {
    return rand(
      ({
        en: [
          'You can think about your move, no need to rush.',
          'Ok, I will no longer ask you for confirmation.',
          'You can think well and answer me later.',
          'You can think well and answer me later. Just don\'t forget to say "Okay, Google!".',
        ],
        ru: [
          'Вы можете подумать над своим ходом, я никуда не тороплюсь.',
          'Вы можете подумать и ответить позже, я пока ещё не планирую разряжаться.',
          'Можете подумать и ответить позже, только не забудьте сказать "Ok, Google!".',
        ],
      } as rLangs)[this.lang]
    );
  }
  static adviseMove(from: string, to: string, pieceCode: string): string {
    return rand(
      ({
        en: [
          `I can advise you to make a ${Voc.piece(pieceCode)} move ${Voc.fromTo(from, to)}.`,
          `If I were you, I would move a ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}.`,
          `The ${Voc.piece(pieceCode)} move ${Voc.fromTo(from, to)} seems pretty good!`,
          `What about ${Voc.piece(pieceCode)} ${Voc.fromTo(from, to)}?`,
        ],
        ru: [
          `Могу посоветовать вам походить ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Я бы на вашем месте походил ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}.`,
          `Вы можете сыграть ${Voc.piece(pieceCode, 'tvr')} ${char(from)} ${char(to)}.`,
          `Что насчёт хода ${Voc.piece(pieceCode, 'tvr')} ${Voc.fromTo(from, to)}?`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static playerAutoMove(): string {
    return rand(
      ({
        en: [
          'As you wish. I make a move instead of you.',
          'Ok, I make your move instead of you.',
          "Okay, I'll make a move for you.",
          'Move instead of you? Easy!',
          'If you sure, I can do it.',
        ],
        ru: [
          'Ну, раз вы так хотите, я могу сделать ход за вас.',
          'Хорошо, сейчас я похожу за вас.',
          'Хорошо, я похожу за вас.',
          'Ладно, я сделаю ваш ход вместо вас.',
          'Походить за вас? Запросто!',
        ],
      } as rLangs)[this.lang]
    );
  }
  static noMoveToCorrect(): string {
    return rand(
      ({
        en: [
          'To change the last move, you need to have the last move.',
          'You just started a new game. What are you talking about?',
          'You have not made any move yet!',
          "But you just started a new game. You don't made a first move yet!",
          'First make at least one move, to have something to change.',
        ],
        ru: [
          'Чтобы изменить предыдущий ход, нужно чтобы предыдущий ход был!',
          'Мы только начали новую игру. О чём речь?',
          'Вы ещё не сделали ни одного хода.',
          'В этой игре вы ещё не сделали ни одного хода.',
          'Сначала сделайте хоть один ход, чтобы было что исправлять.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static cantCastling(): string {
    return rand(
      ({
        en: [
          "You can't castling now!",
          'For castling you need untouched king and rock and no pieces between them.',
          "You can't castling from the current position!",
          "Castling? But you can't castling now!",
        ],
        ru: [
          'Вы не можете сыграть рокировку сейчас!',
          'Для рокировки у вас должны быть нетронутые король и ладья, между которыми не должно быть ни одной фигуры.',
          'Вы не можете сделать рокировку из такой позиции!',
          'Рокировка? Но вы не можете сейчас сделать рокировку.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static twoTypesOfCastling(king: string, to1: string, to2: string): string {
    let result = `${Phr.canMakeCastling(king)} ${Phr.castlingTo(to1)}`;
    result += ` ${Voc.and()} ${Phr.castlingTo(to2)}.`;
    return result;
  }
  static emptyPosition(pos: string): string {
    return rand(
      ({
        en: [
          `${upFirst(Voc.square(pos))} is free.`,
          `${upFirst(Voc.square(pos))} is empty!`,
          `There is no piece ${Voc.on(pos)}.`,
          `${upFirst(Voc.square(pos))} is not occupied by anyone.`,
        ],
        ru: [
          `${upFirst(Voc.square(pos))} свободна.`,
          `${upFirst(Voc.square(pos))} никем не занята.`,
          `${upFirst(Voc.on(pos))} ничего нет.`,
          `${upFirst(Voc.square(pos))} пустая.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static hereIsPieceOnPosition(pos: string, pieceCode: string, side: ChessSide): string {
    const whose = getSide(pieceCode) === side ? WhoseSide.PLAYER : WhoseSide.ENEMY;
    return rand(
      ({
        en: [
          `${upFirst(Voc.on(pos))} is ${Voc.someonesColoredPiece(pieceCode, side)}.`,
          `${upFirst(Voc.on(pos))} is the ${Voc.someonesPiece(whose, pieceCode)}.`,
          `${upFirst(Voc.square(pos))} is occupied by ${Voc.someonesColoredPiece(pieceCode, side)}.`,
          `Here is ${Voc.someonesColoredPiece(pieceCode, side)}.`,
          `${upFirst(Voc.square(pos))} stands ${Voc.someonesColoredPiece(pieceCode, side)}.`,
        ],
        ru: [
          `${upFirst(Voc.on(pos))} ${Voc.someonesColoredPiece(pieceCode, side)}.`,
          `${upFirst(Voc.on(pos))} стоит ${Voc.someonesColoredPiece(pieceCode, side)}.`,
          `${upFirst(Voc.square(pos))} занята ${Voc.someonesPiece(whose, pieceCode, 'tvr')}.`,
          `Здесь находится ${Voc.someonesPiece(whose, pieceCode)}.`,
          `${upFirst(Voc.on(pos))} находится ${Voc.someonesPiece(whose, pieceCode)}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static noSuchPieces(pieceCode: string, who?: WhoseSide): string {
    const pNum = Voc.pieceMaxNumber(pieceCode);
    if (!!who) {
      return rand(
        ({
          en: [
            `${upFirst(Voc.youOrMe(who))} have no more ${Voc.piece(pieceCode, pNum)} left.`,
            `${upFirst(Voc.yourOrMy(pieceCode, who, pNum))} ${Voc.piece(pieceCode, pNum)} are no longer on the board.`,
            `${upFirst(Voc.youOrMe(who))} no longer have ${Voc.piece(pieceCode, pNum)}.`,
            `${upFirst(Voc.allYourOrMy(pieceCode, who, pNum))} ${Voc.piece(pieceCode, pNum)} are already captured.`,
          ],
          ru: [
            `У ${Voc.youOrMe(who)} не осталось ${Voc.piece(pieceCode, `${pNum}/rod`)}.`,
            `${upFirst(Voc.whosePiece(pieceCode, who, `${pNum}/rod`))} больше нет на поле.`,
            `У ${Voc.youOrMe(who)} больше нет ${Voc.piece(pieceCode, `${pNum}/rod`)}.`,
            `${upFirst(Voc.allYourOrMy(pieceCode, who, pNum))} ${Voc.piece(pieceCode, `${pNum}/rod`)} уже захвачены.`,
          ],
        } as rLangs)[this.lang]
      );
    } else {
      return rand(
        ({
          en: [
            `There is no ${Voc.coloredPiece(pieceCode, pNum)}.`,
            `There is no ${Voc.coloredPiece(pieceCode, pNum)} on the board.`,
            `No one ${Voc.coloredPiece(pieceCode)} left.`,
            `There is no ${Voc.coloredPiece(pieceCode, pNum)} left in the game.`,
          ],
          ru: [
            `На поле не осталось ${Voc.coloredPiece(pieceCode, `${pNum}/rod`)}.`,
            `На доске нет ${Voc.coloredPiece(pieceCode, `${pNum}/rod`)}.`,
            `Здесь больше нет ${Voc.coloredPiece(pieceCode, `${pNum}/rod`)}.`,
            `${upFirst(Voc.coloredPiece(pieceCode, `${pNum}/rod`))} не осталось в игре.`,
          ],
        } as rLangs)[this.lang]
      );
    }
  }
  static noCapturedPieces(): string {
    return rand(
      ({
        en: [
          'We have no captured pieces at all!',
          'This game has not been a single capture yet!',
          'We just started, and have not eaten yet a single piece.',
          'Neither you nor I, no captured pieces.',
        ],
        ru: [
          'Ещё не было захвачено ни одной фигуры!',
          'В текущей игре ещё не было ни одного захвата!',
          'Мы только начали, ещё не было съедено ни одной фигуры!',
          'Ни у вас, ни у меня, ещё нет съеденных фигур.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static wtfYouAreJustStartedANewGame(): string {
    return rand(
      ({
        en: [
          "But the game has just begun! It's early to throw up your hands!",
          "Seriously? We just started! It's too Early to give up!",
          "But it's a beginning of the game! You can't surrender now!",
          "What? Resign now? This is too early! We haven't even played out yet!",
        ],
        ru: [
          'Вы смеётесь? Игра только началась! Рано опускать руки.',
          'Серьёзно? Мы только начали! Ещё рано сдаваться!',
          'Что это за выкрутасы? Мы не успели начать, а вы уже наровите от меня смыться. Нет уж, продолжайте играть!',
          'Да мы же только в самом начале! У вас ещё есть все шансы победить - продолжайте игру.',
          'Ты сможешь сдаться только когда я разрешу. Понял?',
        ],
      } as rLangs)[this.lang]
    );
  }
  static fullmoveNumber(num: number): string {
    return rand(
      ({
        en: [
          `${num} full moves passed from the beggining of the game.`,
          `Only ${num} full moves were made.`,
          `We have played ${num} full moves since the beginning of the game.`,
          `${num} full game moves passed during this time.`,
          `During the game, we have done ${num} full moves.`,
        ],
        ru: [
          `С момента начала игры ${Voc.nPassed(num)} ${num} ${Voc.nFullMoves(num)}.`,
          `Эта игра насчитывает ${num} ${Voc.nFullMoves(num)}.`,
          `За эту игру мы сделали ${num} ${Voc.nFullMoves(num)}.`,
          `Пока что мы успели сделать только ${num} ${Voc.nFullMoves(num)}.`,
          `У нас за спиной уже ${num} ${Voc.nFullMoves(num)}.`,
          `Эта игра насчитывает ${num} ${Voc.nFullMoves(num)} с момента старта.`,
          `От начала игры ${Voc.nPassed(num)} ${num} ${Voc.nFullMoves(num)}.`,
        ],
      } as rLangs)[this.lang]
    );
  }
  static noFullmoves(): string {
    return rand(
      ({
        en: [
          'We just started a new game.',
          'We have not had time to make a single full move, and you are already asking!',
          'But we just started a new game.',
          'We have just begun, we have not had a single full move.',
          'Make your move, and we will have the first full move.',
        ],
        ru: [
          'Мы только что начали игру.',
          'Мы ещё не успели сделать ни одного полного хода, а вы уже спрашиваете!',
          'Мы же только что начали новую игру.',
          'Мы только начали, у нас ещё не было ни одного полного хода.',
          'Сделайте свой ход, и у нас появится первых полный ход.',
        ],
      } as rLangs)[this.lang]
    );
  }
  static error(msg: string): string {
    return rand(
      ({
        en: [
          `Error: ${msg}`,
          `Sorry, but something went wrong: ${msg}`,
          `Sorry, there was a problem: ${msg}`,
          `The Problem occurred: ${msg}`,
          `An error has occurred: ${msg}`,
        ],
        ru: [
          `Ошибка: ${msg}`,
          `Простите, что-то пошло не так. ${msg}`,
          `Простите, у меня возникла проблема: ${msg}`,
          `Упс, у нас неприятности: ${msg}`,
          `Извините, произошла ошибка: ${msg}`,
        ],
      } as rLangs)[this.lang]
    );
  }
}
