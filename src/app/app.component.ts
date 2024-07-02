import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultScreenComponent } from './components/default-screen/default-screen.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent,DefaultScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
