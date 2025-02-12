import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.css',
  imports: [CommonModule, NgClass],
})
export class NavLinkComponent {
  @Input()
  label: string = '';

  @Input()
  routerLink?: string;

  @Input()
  queryParams?: Params | undefined;

  @Input()
  primeIcon?: string;

  @Input()
  isCollapsed?: boolean;

  @Input()
  isActive?: boolean = false;
}
