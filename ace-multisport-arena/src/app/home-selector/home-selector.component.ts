import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../site-header/site-header.component';

@Component({
  selector: 'app-home-selector', standalone: true, imports: [RouterLink, SiteHeaderComponent],
  templateUrl: './home-selector.component.html', styleUrl: './home-selector.component.css'
})
export class HomeSelectorComponent {}
