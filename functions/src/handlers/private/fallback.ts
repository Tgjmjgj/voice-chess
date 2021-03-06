import { HandlerBase } from '../struct/handlerBase';
import { Answer as Ans } from '../../locales/answer';
import { OtherHandlers } from './other';

const restorableContexts = [
  'ask-side',
  'rank-next',
  'difficulty-followup',
  'board-next',
  'ask-to-new-game',
  'ask-to-continue',
  'turn-intent',
  'turn-showboard',
  'confirm-move',
  'ask-to-promotion',
  'moves-next',
  'advice-made',
  'correct-last-move',
  'choose-castling',
  'confirm-new-game',
  'ask-to-resign',
  'reduce-difficulty-instead-of-resign',
  'rank-info',
];

export class FallbackHandlers extends HandlerBase {
  private static preserveContext(): void {
    for (const context of restorableContexts) {
      if (this.contexts.get(context)) {
        this.contexts.set(context, 1);
      }
    }
  }

  static fallback(): void {
    this.preserveContext();
    const fallbacks = this.short.fallbackCount;
    this.short.fallbackCount = fallbacks + 1;
    if (fallbacks < 3) {
      this.speak(Ans.firstFallback());
      OtherHandlers.helpSuggestions();
    } else if (fallbacks === 3) {
      if (this.contexts.is('game')) {
        this.speak(Ans.secondFallbackInGame());
      } else {
        this.speak(Ans.secondFallbackOutOfGame());
      }
      OtherHandlers.helpSuggestions();
    } else if (fallbacks === 4) {
      this.speak(Ans.thirdFallback());
      OtherHandlers.help();
      OtherHandlers.helpSuggestions(false);
    } else {
      this.end(Ans.confusedExit());
    }
  }
}
