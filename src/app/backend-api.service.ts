import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { environment } from './../environments/environment';
import { Game } from './game/game.component';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http:HttpClient) { }
  
  getlocations(lat:number,lon:number){
    return this.http.get<Game[]>(environment.apiUrl+'/jumbo/api/stores/getNearestStores?longitude='+lon+'&latitude='+lat);
  }

  play(gameId:string, playerName:string, index:number){
    return this.http.patch<Game>(environment.apiUrl+'/bol/api/game/'+gameId+'/play?playerName='+playerName+'&index='+index,null);
  }

  getGame(gameId:string){
    return this.http.get<Game>(environment.apiUrl+'/bol/api/game/'+gameId);
  }

  createGame(player1Name:string, player2Name:string){
    return this.http.post<Game>(environment.apiUrl+'/bol/api/game?player1Name='+player1Name+'&player2Name='+player2Name,null);
  }

  stratGame(gameId:string, playerName:string){
    return this.http.patch<Game>(environment.apiUrl+'/bol/api/game/'+gameId+'start?playerName='+playerName,null);
  }
}
