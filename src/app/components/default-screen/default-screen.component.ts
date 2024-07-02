import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-default-screen',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './default-screen.component.html',
  styleUrl: './default-screen.component.css',
})
export class DefaultScreenComponent implements OnInit {
  data = {
    id: '0000',
    name: 'offline user',
    email: 'abc@123',
    password: '123',
    tasks: [],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  continue() {
    localStorage.setItem('user', JSON.stringify(this.data));
  }
}
