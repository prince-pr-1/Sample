import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  successMsg = '';
  errMsg = '';

  constructor(
    private validation: ValidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
    this.route.queryParams.subscribe((params) => {
      if (params['registration'] == 'success') {
        this.successMsg = 'Registration success. You can now login';
        setTimeout(() => {
          this.successMsg = '';
        }, 5000);
      } else {
        this.successMsg = '';
      }
    });
  }

  simplifier(data: string) {
    return this.loginForm.controls[data];
  }

  handleLogin() {
    this.validation
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((result) => {
        if (result.length > 0) {
          this.router.navigate(['/dashboard']);
          localStorage.setItem("user", JSON.stringify(result[0]));
        } else {
          this.errMsg = 'Invalid credentials';
          setTimeout(() => {
            this.errMsg = '';
          }, 5000);
        }
      });
  }
}
