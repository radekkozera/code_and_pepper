import { Component, OnInit } from '@angular/core';
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './helpers/particles';
import { Engine } from '@tsparticles/engine';
import { Observable } from 'rxjs';
import { PersonSummary } from './models/person-summary';
import { ApiService } from './services/api.service';
import { GameType } from './helpers/game-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code_and_pepper';

  public selectedGameType?: GameType = undefined;

  constructor(private _particlesService: NgParticlesService, private _apiService: ApiService) { }

  public particlesOptions: any = particlesOptions;

  public gameType = GameType;

  ngOnInit(): void {
    this._loadParticles();
  }


  private _loadParticles(): void {
    this._particlesService.init(async (engine: Engine) => {
      await loadSlim(engine)
    })
  }

  public getAllPeople(): any {
    return this._apiService.getPeople().subscribe(v => console.log(v));
  }

  public setGameType(gameType: GameType): void {
    this.selectedGameType = gameType;
  }


}
