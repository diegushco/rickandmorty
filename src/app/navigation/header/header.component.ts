import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  @Output() readonly darkModeSwitched = new EventEmitter<boolean>();
  isDarkMode = false;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeSwitched.emit(this.isDarkMode);
  }
}
