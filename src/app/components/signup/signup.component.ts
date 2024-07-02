import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/models';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  emailPattern = '[a-zA-Z0-9.-_]{2,}@(gmail|yahoo)[.]{1}[a-zA-Z]{2,}';
  user: User = {
    name: '',
    email: '',
    password: '',
    tasks: [],
  };
  confirmPassword = '';
  passNotMatch!: boolean;
  emailExists!: boolean;

  constructor(
    private validationService: ValidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  handleEmail() {
    this.validationService.checkEmail(this.user.email).subscribe((result) => {
      if (result.length > 0) {
        this.emailExists = true;
      } else {
        this.emailExists = false;
      }
    });
  }

  handlePass() {
    if (this.user.password != this.confirmPassword) {
      this.passNotMatch = true;
    } else {
      this.passNotMatch = false;
    }
  }

  handleSubmit() {
    this.validationService.insertUser(this.user).subscribe((result) => {
      if (result) {
        this.router.navigate(['/login'], {
          queryParams: { registration: 'success' },
        });
      }
    });
  }
}
