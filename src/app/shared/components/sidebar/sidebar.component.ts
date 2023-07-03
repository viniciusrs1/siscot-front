import { Component } from '@angular/core';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

constructor(private cookieService: CookieService) { }

isAdmin(): boolean {
  return this.cookieService.get('cargo') === 'ADMIN';
}

}
