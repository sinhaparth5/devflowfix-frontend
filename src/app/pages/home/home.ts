import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('lottieHero', { static: false }) lottieHeroCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lottieProcess', { static: false }) lottieProcessCanvas!: ElementRef<HTMLCanvasElement>;

  private dotLottieHero: DotLottie | null = null;
  private dotLottieProcess: DotLottie | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initLottieAnimations();
  }

  ngOnDestroy(): void {
    if (this.dotLottieHero) {
      this.dotLottieHero.destroy();
      this.dotLottieHero = null;
    }

    if (this.dotLottieProcess) {
      this.dotLottieProcess.destroy();
      this.dotLottieProcess = null;
    }
  }

  private initLottieAnimations(): void {
    if (this.lottieHeroCanvas?.nativeElement) {
      this.dotLottieHero = new DotLottie({
        canvas: this.lottieHeroCanvas.nativeElement,
        src: 'assets/animations/hero.lottie',
        loop: true,
        autoplay: true,
      });
    }

    if (this.lottieProcessCanvas?.nativeElement) {
      this.dotLottieProcess = new DotLottie({
        canvas: this.lottieProcessCanvas.nativeElement,
        src: 'assets/animations/process.lottie',
        loop: true,
        autoplay: true,
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
