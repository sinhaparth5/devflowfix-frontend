import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbBadgeModule,
  NbActionsModule,
} from '@nebular/theme';


interface Feature {
  icon: string;
  title: string;
  description: string;
  status: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface Integration {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbBadgeModule,
    NbActionsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  features: Feature[] = [
    {
      icon: 'flash-outline',
      title: 'Real-Time Detection',
      description: 'Instantly detects CI/CD failures from GitHub Actions, ArgoCD, and Kubernetes webhooks with millisecond precision.',
      status: 'primary',
    },
    {
      icon: 'bulb-outline',
      title: 'AI-Powered Analysis',
      description: 'Uses NVIDIA NIM and RAG to intelligently analyze failure root causes with 95% accuracy.',
      status: 'info',
    },
    {
      icon: 'settings-2-outline',
      title: 'Automatic Remediation',
      description: 'Safely executes fixes like workflow reruns, pod restarts, and sync operations without human intervention.',
      status: 'success',
    },
    {
      icon: 'trending-up-outline',
      title: 'Continuous Learning',
      description: 'Learns from every outcome to improve confidence scoring and fix accuracy over time.',
      status: 'warning',
    },
    {
      icon: 'shield-outline',
      title: 'Safe Operations',
      description: 'Confidence-based execution ensures only high-probability fixes are applied automatically.',
      status: 'danger',
    },
    {
      icon: 'clock-outline',
      title: 'Lightning Fast',
      description: 'Resolves 75% of failures in under 8 minutes, keeping your deployments moving.',
      status: 'info',
    },
  ];

  stats: Stat[] = [
    { value: '75%', label: 'Failures Auto-Fixed', icon: 'checkmark-circle-2-outline' },
    { value: '< 8min', label: 'Average Fix Time', icon: 'clock-outline' },
    { value: '24/7', label: 'Autonomous Operation', icon: 'sync-outline' },
    { value: '99.9%', label: 'System Uptime', icon: 'activity-outline' },
  ];

  steps: Step[] = [
    {
      number: 1,
      title: 'Receive Webhooks',
      description: 'Integrates with GitHub Actions, ArgoCD, and Kubernetes to receive real-time failure notifications.',
      icon: 'inbox-outline',
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Uses NVIDIA NIM and RAG to analyze logs, identify root causes, and determine optimal solutions.',
      icon: 'bulb-outline',
    },
    {
      number: 3,
      title: 'Safe Remediation',
      description: 'Executes fixes like workflow reruns, pod restarts, and ArgoCD sync operations with confidence scoring.',
      icon: 'settings-outline',
    },
    {
      number: 4,
      title: 'Learn & Improve',
      description: 'Continuously learns from outcomes to improve accuracy and build knowledge base for future failures.',
      icon: 'trending-up-outline',
    },
  ];

  integrations: Integration[] = [
    { name: 'GitHub Actions', icon: 'github-outline' },
    { name: 'ArgoCD', icon: 'arrow-circle-right-outline' },
    { name: 'Kubernetes', icon: 'cube-outline' },
    { name: 'NVIDIA NIM', icon: 'layers-outline' },
    { name: 'Docker', icon: 'archive-outline' },
    { name: 'Jenkins', icon: 'options-2-outline' },
  ];

  constructor(private router: Router) {}

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
