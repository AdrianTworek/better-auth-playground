import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  session = this.authService.session;
  registerMode = signal(false);

  ngOnInit() {
    this.authService.getSession();
  }

  constructor() {
    effect(() => {
      if (this.registerMode()) {
        this.loginForm.reset();
      } else {
        this.registerForm.reset();
      }
    });
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerMode()) {
      if (this.registerForm.valid) {
        this.authService.signUp(
          this.registerForm.value.name!,
          this.registerForm.value.email!,
          this.registerForm.value.password!,
        );
      }
    } else if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email!, this.loginForm.value.password!);
    }
  }

  signOut() {
    this.authService.signOut();
  }

  toggleRegisterMode() {
    this.registerMode.set(!this.registerMode());
  }
}
