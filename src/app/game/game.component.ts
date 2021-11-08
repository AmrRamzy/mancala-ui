import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../backend-api.service';

export interface Player {
  playerName: string;
  board: Array<number>;
  mancala: number;
}

export interface Game {
  gameId: string;
  currentPlayerName: string;
  gameInProgress: boolean;
  gamePlayable: boolean;
  gameWinnerPlayerName:string;
  gameBoardMap: Record<string, Player>;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  value = 'mancala-ui';
  gameId="";
  player1Name ="";
  player2Name ="";
  currentPlayerName = "";
  winnerPlayerName = "";
  game: Game[] = [];
  currentPlayerBoard: Array<number> = [6, 6, 6, 6, 6, 6];
  currentMancala: number = 0;
  otherPlayerBoard: Array<number> = [6, 6, 6, 6, 6, 6];
  otherMancala: number = 0;

  constructor(
    private api: BackendApiService
  ) { }

  ngOnInit(): void {
  }

  play(index:number) {
    this.api.play(this.gameId, this.currentPlayerName, index+1).subscribe(
      (data) => {
        this.game = [];
        this.game.push(data);
        console.log(this.game);
        this.currentPlayerName = this.game[0].currentPlayerName;
        this.winnerPlayerName = this.game[0].gameWinnerPlayerName;
        if(this.winnerPlayerName){
          window.alert(
            `${this.winnerPlayerName} is the game WINNER!!`);
        }
        this.currentPlayerBoard = this.game[0].gameBoardMap[this.currentPlayerName].board;
        this.currentMancala = this.game[0].gameBoardMap[this.currentPlayerName].mancala;
        for (let key in this.game[0].gameBoardMap) {
          if(this.game[0].gameBoardMap[key].playerName!=this.currentPlayerName){
            var otherPlayerGameBorad = this.game[0].gameBoardMap[key];
            this.otherPlayerBoard = [];
            for (const number of otherPlayerGameBorad.board.reverse()) {
              this.otherPlayerBoard.push(number);
            }
            this.otherMancala = otherPlayerGameBorad.mancala;
            break;
          }
      }
      },
      (error) => {
        console.log(`error status : ${error.status} ${error.statusText}`);
        console.log(`error error : ${error.error.message} //// ${error.message}`);
        window.alert(
          ` error status : ${error.status} ${error.statusText},\n error message : ${error.error.message}`);

      })
  }

  getGame() {
    this.api.getGame(this.gameId).subscribe(
      (data) => {
        this.game = [];
        this.game.push(data);
        console.log(this.game);
        this.currentPlayerBoard = this.game[0].gameBoardMap[this.currentPlayerName].board;
        this.currentMancala = this.game[0].gameBoardMap[this.currentPlayerName].mancala;
        for (let key in this.game[0].gameBoardMap) {
          if(this.game[0].gameBoardMap[key].playerName!=this.currentPlayerName){
            var otherPlayerGameBorad = this.game[0].gameBoardMap[key];
            this.otherPlayerBoard = [];
            for (const number of otherPlayerGameBorad.board.reverse()) {
              this.otherPlayerBoard.push(number);
            }
            this.otherMancala = otherPlayerGameBorad.mancala;
            break;
          }
      }
      },
      (error) => {
        console.log(`error status : ${error.status} ${error.statusText}`);
        console.log(`error error : ${error.error.message} //// ${error.message}`);
        window.alert(
          ` error status : ${error.status} ${error.statusText},\n error message : ${error.error.message}`);

      })
  }

  createGame() {
    this.api.createGame(this.player1Name, this.player2Name).subscribe(
      (data) => {
        this.game = [];
        this.game.push(data);
        console.log(this.game);
        this.gameId = this.game[0].gameId;
        this.currentPlayerName = this.game[0].currentPlayerName;
        this.currentPlayerBoard = this.game[0].gameBoardMap[this.currentPlayerName].board;
        this.currentMancala = this.game[0].gameBoardMap[this.currentPlayerName].mancala;
        for (let key in this.game[0].gameBoardMap) {
          if(this.game[0].gameBoardMap[key].playerName!=this.currentPlayerName){
            var otherPlayerGameBorad = this.game[0].gameBoardMap[key];
            this.otherPlayerBoard = [];
            for (const number of otherPlayerGameBorad.board.reverse()) {
              this.otherPlayerBoard.push(number);
            }
            this.otherMancala = otherPlayerGameBorad.mancala;
            break;
          }
      }
      },
      (error) => {
        console.log(`error status : ${error.status} ${error.statusText}`);
        console.log(`error error : ${error.error.message} //// ${error.message}`);
        window.alert(
          ` error status : ${error.status} ${error.statusText},\n error message : ${error.error.message}`);

      })
  }

}
