import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  room: any;
  moreInformation: any;

  formsArray: Array<any>;
  checkboxArray: Array<any> = [];
  tabsArray: Array<any> = [];

  statusSign: boolean;
  statusTabs: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const roomCode = +this.actRoute.snapshot.paramMap.get('code');
        this.roomDetails(roomCode);
      }
    })
  }

  ngOnInit(): void {
    this.getForms();
  }

  private roomDetails(roomCode): void {
    this.generalService.getJSONRooms().subscribe(data => {
      this.room = data.filter((elem) => elem.code == roomCode)[0];
    })
  }

  private getForms(): void {
    this.generalService.getJSONForms().subscribe(data => {
      this.formsArray = data;
    })
  }

  selectAll(status) {
    let checkboxes = document.querySelectorAll('.form-control') as any;
    status
      ? checkboxes.forEach(element => { element.checked = true }, this.statusSign = true, this.checkboxArray = ["sinus_lift", "bone_graft", "extraction", "implant"])
      : checkboxes.forEach(element => { element.checked = false }, this.statusSign = false, this.checkboxArray = [])
  }

  chooseForm(value) {
    let checkboxesActive = document.querySelectorAll('input:checked') as any
    checkboxesActive.length > 0
      ? this.statusSign = true
      : this.statusSign = false
    if (this.checkboxArray.some(elem => elem === value)) {
      const index = this.checkboxArray.findIndex(elem => elem === value);
      this.checkboxArray.splice(index, 1);
    }
    else {
      this.checkboxArray.push(value);
    }
  }

  showMoreInformation(item?) {
    this.statusTabs = true;
    if (item) {
      this.moreInformation = [];
      this.generalService.getJSONTabs(item).subscribe(data => {
        this.moreInformation = data;
      })
    }
    else {
      this.generalService.getJSONTabs(this.checkboxArray[0]).subscribe(data => {
        this.moreInformation = data;
      })
    }
  }

  changeCheckbox() {
    let checkboxesActive = document.querySelectorAll('input:checked') as any
    checkboxesActive.forEach(elem => { elem.style.display = "none", elem.nextSibling.style.display = "inline" })
  }

}
