import { chessBoardSize } from './chess';
import { ChessSide, getSide, oppositeSide } from './chessUtils';
import { rookMoveForCastlingMove, isMoveSuitableForCastling } from './castling';

export interface ChessSquareData {
  pos: string;
  val: string;
}

export interface PieceTypeData {
  piece: string;
  count: number;
}

export interface Captured {
  white: PieceTypeData[];
  black: PieceTypeData[];
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const piecesPriority = 'kqrbnp';

export class ChessBoard {
  private board: Map<string, string>;
  private fen: string;
  private side: string;
  private castling: string;
  private enpsnt: string;
  private counter: number;
  private fullmove: number;

  constructor(fen: string) {
    this.board = new Map();
    this.fen = fen;
    this.parseFen();
  }

  private parseFen(): void {
    const fenParts = this.fen.split(/[// ]/);
    for (let i = 1; i <= chessBoardSize; i++) {
      let j = 0;
      for (const code of fenParts[chessBoardSize - i]) {
        const int = Number(code);
        if (isNaN(int)) {
          this.board.set(files[j] + i, code);
          ++j;
        } else {
          for (let k = 0; k < int; ++k, ++j) {
            this.board.set(files[j] + i, null);
          }
        }
      }
    }
    this.side = fenParts[chessBoardSize];
    this.castling = fenParts[chessBoardSize + 1];
    this.enpsnt = fenParts[chessBoardSize + 2];
    this.counter = Number(fenParts[chessBoardSize + 3]);
    this.fullmove = Number(fenParts[chessBoardSize + 4]);
  }

  pos(pos: string): string {
    if (!this.board.has(pos)) {
      return null;
    } else {
      return this.board.get(pos);
    }
  }

  rank(i: number): ChessSquareData[] {
    if (i < 1 || i > chessBoardSize) {
      return null;
    }
    return files
      .map<ChessSquareData>(file => ({
        pos: file + i,
        val: this.board.get(file + i),
      }))
      .filter(sqr => sqr.val !== null);
  }

  allPiecesByType(piece: string): string[] {
    const ret = [] as string[];
    let i = 0;
    let rank = 8;
    let file = 1;
    do {
      if (this.fen[i] === '/') {
        rank--;
        file = 1;
      } else {
        const int = Number(this.fen[i]);
        if (isNaN(int)) {
          if (this.fen[i] === piece) {
            ret.push(`${files[file - 1]}${rank}`);
          }
          file++;
        } else {
          file += int;
        }
      }
      i++;
    } while (this.fen[i] !== ' ');
    return ret;
  }

  allPiecesBySide(side: ChessSide): ChessSquareData[] {
    const data = [] as ChessSquareData[];
    for (const square of this.board.keys()) {
      const piece = this.board.get(square);
      if (piece && getSide(piece) === side) {
        data.push({ pos: square, val: piece });
      }
    }
    data.sort(
      (sqr1, sqr2): number => {
        const p1 = sqr1.val.toLowerCase();
        const p2 = sqr2.val.toLowerCase();
        if (p1 === p2) return 0;
        else if (piecesPriority.indexOf(p1) > piecesPriority.indexOf(p2)) {
          return 1;
        } else {
          return -1;
        }
      }
    );
    return data;
  }

  capturedPieces(): Captured {
    // prettier-ignore
    const allPieces = [
      'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
      'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
      'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
      'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    ];
    let i = 0;
    while (this.fen[i] !== ' ') {
      const index = allPieces.findIndex(val => val === this.fen[i]);
      if (index !== -1) {
        allPieces.splice(index, 1);
      }
      i++;
    }
    const ret = { white: [] as PieceTypeData[], black: [] as PieceTypeData[] };
    for (const piece of allPieces) {
      if (getSide(piece) === ChessSide.WHITE) {
        const same = ret.white.find(el => el.piece === piece);
        if (same) {
          same.count++;
        } else {
          ret.white.push({ piece, count: 1 });
        }
      } else {
        const same = ret.black.find(el => el.piece === piece);
        if (same) {
          same.count++;
        } else {
          ret.black.push({ piece, count: 1 });
        }
      }
    }
    return ret;
  }

  getAvailableCastlingMoves(side: ChessSide): string[] {
    const availableCastling = [] as string[];
    const rank = side === ChessSide.WHITE ? '1' : '8';
    const c = (p: string): string => {
      return side === ChessSide.WHITE ? p.toUpperCase() : p.toLowerCase();
    };
    if (this.castling.includes(c('Q'))) {
      if (
        this.board.get(`a${rank}`) === c('R') &&
        this.board.get(`b${rank}`) === null &&
        this.board.get(`c${rank}`) === null &&
        this.board.get(`d${rank}`) === null &&
        this.board.get(`e${rank}`) === c('K')
      ) {
        availableCastling.push(`e${rank}c${rank}`);
      }
    }
    if (this.castling.includes(c('K'))) {
      if (
        this.board.get(`e${rank}`) === c('K') &&
        this.board.get(`f${rank}`) === null &&
        this.board.get(`g${rank}`) === null &&
        this.board.get(`h${rank}`) === c('R')
      ) {
        availableCastling.push(`e${rank}g${rank}`);
      }
    }
    return availableCastling;
  }

  isMoveCastling(move: string): boolean {
    const cstlWhite = this.getAvailableCastlingMoves(ChessSide.WHITE);
    if (cstlWhite.indexOf(move) !== -1) {
      return true;
    }
    const cstlBlack = this.getAvailableCastlingMoves(ChessSide.BLACK);
    if (cstlBlack.indexOf(move) !== -1) {
      return true;
    }
    return false;
  }

  extract(move: string, captured?: string, enPassantPawnPos?: string): boolean {
    const from = move.slice(0, 2);
    const to = move.slice(2, 4);
    const movedPiece = this.board.get(to);
    // TODO: Adequate correct moves validation for every type of piece
    if (
      this.board.get(from) ||
      !movedPiece ||
      getSide(movedPiece) !== oppositeSide(this.moveSide)
    ) {
      return false;
    }
    let piece;
    const itIsMoveBlack = this.side === 'w';
    if (move.length === 5) {
      piece = itIsMoveBlack ? 'p' : 'P';
    } else {
      piece = this.board.get(to);
    }
    this.board.set(from, piece);
    if (captured && !enPassantPawnPos) {
      this.board.set(to, captured);
    } else {
      this.board.set(to, null);
    }
    if (enPassantPawnPos) {
      const enemyPawn = this.side === 'w' ? 'P' : 'p';
      this.board.set(enPassantPawnPos, enemyPawn);
      this.enpsnt = to;
    } else {
      this.enpsnt = '-';
    }
    const isCastling = isMoveSuitableForCastling(piece, move);
    if (isCastling) {
      const rookMove = rookMoveForCastlingMove(move);
      const rookFrom = rookMove.slice(0, 2);
      const rookTo = rookMove.slice(2, 4);
      const rook = this.board.get(rookTo);
      this.board.set(rookTo, null);
      this.board.set(rookFrom, rook);
      const cstlStr = itIsMoveBlack ? 'kq' : 'KQ';
      if (this.castling === '-') {
        this.castling = cstlStr;
      } else {
        if (itIsMoveBlack) {
          this.castling += cstlStr;
        } else {
          this.castling = cstlStr + this.castling;
        }
      }
    }
    if (this.side === 'w') {
      this.side = 'b';
      this.fullmove--;
    } else {
      this.side = 'w';
    }
    if (this.counter !== 0) {
      this.counter--;
    }
    return true;
  }

  loadNonRecoverableInfo(castlFen?: string, countFen?: number): void {
    if (castlFen) {
      this.castling = castlFen;
    }
    if (countFen) {
      this.counter = countFen;
    }
  }

  convertToFen(): string {
    let fen = '';
    for (let i = 8; i > 0; --i) {
      let emptyCount = 0;
      for (let j = 0; j < chessBoardSize; ++j) {
        const square = files[j] + i;
        const piece = this.board.get(square);
        if (piece) {
          if (emptyCount) {
            fen += emptyCount;
            emptyCount = 0;
          }
          fen += piece;
        } else {
          emptyCount++;
        }
      }
      if (emptyCount) {
        fen += emptyCount;
      }
      if (i !== 1) {
        fen += '/';
      }
    }
    fen += ` ${this.side}`;
    fen += ` ${this.castling} ${this.enpsnt}`;
    fen += ` ${this.counter} ${this.fullmove}`;
    this.fen = fen;
    return fen;
  }

  isEnPassant(piece: string, move: string): boolean {
    piece = piece.toLowerCase();
    const to = move.slice(2, 4);
    if (piece === 'p' && to === this.enPassant) {
      return true;
    } else {
      return false;
    }
  }

  isCapturing(move: string): boolean {
    const to = move.slice(2, 4);
    return this.pos(to) !== null;
  }

  totalPiecesCount(): number {
    let n = 0;
    this.board.forEach(val => (val !== null ? n++ : void 0));
    return n;
  }

  get enPassant(): string {
    return this.enpsnt;
  }

  get castlingFen(): string {
    return this.castling;
  }

  get counterFen(): number {
    return this.counter;
  }

  get movesNumber(): number {
    return this.fullmove;
  }

  get moveSide(): ChessSide {
    if (this.side === 'w') {
      return ChessSide.WHITE;
    } else {
      return ChessSide.BLACK;
    }
  }
}
