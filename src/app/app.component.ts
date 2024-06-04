import { Component, OnInit } from '@angular/core';
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './helpers/particles';
import { ISourceOptions } from '@tsparticles/engine';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code_and_pepper';

  constructor(private _particlesService: NgParticlesService) { }

  particlesOptions: any = particlesOptions;

  ngOnInit(): void {
    this._loadParticles();
  }


  private _loadParticles(): void {
    this._particlesService.init(async (engine) => {
      await loadSlim(engine)
    })
  }
}
