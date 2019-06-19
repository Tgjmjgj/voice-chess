import { MockBoard } from '../../../mocks/mockBoard';
jest.doMock('../../../../src/chess/chessboard', () => {
  return { ChessBoard: MockBoard };
});
import { GameHandlers } from '../../../../src/handlers/private/game';
import { Env } from './_env';
import { Chess } from '../../../../src/chess/chess';
import { ChessSide } from '../../../../src/chess/chessUtils';
import { initLanguage } from '../../../../src/locales/initLang';

describe('Tests for game handlers', () => {

  const locale = 'ru';
  beforeAll(() => {
    initLanguage(locale);
  });

  let env: Env;
  beforeEach(() => {
    env = new Env();
    GameHandlers.load(
      env.toOutput.bind(env),
      env.contexts,
      env.convData,
      env.userStorage,
      env.endConversation.bind(env)
    );
  });

  test('Creating new game', () => {
    GameHandlers.createNewGame();
    expect(env.userStorage.fen).toBe(Chess.initialFen);
    expect(env.userStorage.history).toEqual([]);
    expect(env.output).toHaveLength(2);
    expect(env.contexts.is('ask-side')).toBeTruthy();
  });

  describe('New game handler', () => {

    test('When there is no running game', () => {
      GameHandlers.newGame();
      expect(env.userStorage.fen).toBe(Chess.initialFen);
      expect(env.userStorage.history).toEqual([]);
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-side')).toBeTruthy();
    });

    test('When there is a running game', () => {
      const fen = 'Fenstring';
      env.userStorage.fen = fen;
      GameHandlers.newGame();
      expect(env.output).toHaveLength(1);
      expect(env.contexts.is('ask-to-new-game')).toBeTruthy();
      expect(env.contexts.is('confirm-new-game')).toBeTruthy();
    });
    
    test('When there is a confirming context', () => {
      env.contexts.set('confirm-new-game', 1);
      GameHandlers.newGame();
      expect(env.userStorage.fen).toBe(Chess.initialFen);
      expect(env.userStorage.history).toEqual([]);
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-side')).toBeTruthy();
    });
  });

  describe('Continue game handler', () => {

    test('Without running game', () => {
      GameHandlers.continueGame();
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-to-new-game')).toBeTruthy();
    });

    test('With running game', () => {
      const fen = 'Just fenstring';
      const playerSide = ChessSide.WHITE;
      env.userStorage.fen = fen;
      env.userStorage.side = playerSide;
      GameHandlers.continueGame();
      expect(env.contexts.is('game')).toBeTruthy();
      expect(env.contexts.is('turn-showboard')).toBeTruthy();
      expect(env.output).toHaveLength(2);
    });
  });

  describe('Resign handler', () => {

    afterEach(() => {
      MockBoard.resetMockedData();
    });

    describe('Instead ask to reduce difficulty', () => {

      test('With a lowest 0 difficulty', () => {
        const difficulty = 0;
        const fen = 'Fen for test';
        env.userStorage.options = { difficulty };
        env.userStorage.fen = fen;
        MockBoard.movesNumber = 2;
        GameHandlers.resign(1);
        expect(env.output).toHaveLength(2);
      });

      test('Not with lowest difficulty', () => {
        const difficulty = 13;
        env.userStorage.options = { difficulty };
        GameHandlers.resign(1);
        expect(env.output).toHaveLength(1);
        expect(env.contexts.is('reduce-difficulty-instead-of-resign')).toBeTruthy();
      });

    });

    test('When total number of moves less than 5', () => {
      const fen = 'Fen';
      env.userStorage.fen = fen;
      MockBoard.movesNumber = 4;
      GameHandlers.resign(0);
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-to-resign')).toBeFalsy();
    });

    test('With more than 5 moves behind', () => {
      const fen = 'Test fen';
      env.userStorage.fen = fen;
      MockBoard.movesNumber = 19;
      GameHandlers.resign(0);
      expect(env.output).toHaveLength(1);
      expect(env.contexts.is('ask-to-resign')).toBeTruthy();
    });
  });

  describe('Welcome handler', () => {

    test('When a player starts the game for the first time', () => {
      const initOpts = {
        difficulty: 2,
        confirm: true,
      };
      GameHandlers.welcome();
      expect(env.convData.fallbackCount).toBe(0);
      expect(env.userStorage.options).toEqual(initOpts);
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-to-new-game')).toBeTruthy();
    });

    test("When a player doesn't have a running game", () => {
      env.userStorage.options = { difficulty: 10 };
      GameHandlers.welcome();
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-to-new-game')).toBeTruthy();
    });

    test('When a player has a running game', () => {
      const fen = 'Fen for the tes';
      env.userStorage.options = { difficulty: 10 };
      env.userStorage.fen = fen;
      GameHandlers.welcome();
      expect(env.output).toHaveLength(2);
      expect(env.contexts.is('ask-to-continue')).toBeTruthy();
    });
  });

  test('End the game', () => {
    const fen = 'Test fen';
    env.userStorage.fen = fen;
    env.contexts.set('game', 5);
    GameHandlers.dropGame();
    expect(env.contexts.is('game')).toBeFalsy();
    expect(env.contexts.is('ask-to-new-game')).toBeTruthy();
    expect(env.userStorage.fen).toBeNull();
    expect(env.output).toHaveLength(0);
  });
});