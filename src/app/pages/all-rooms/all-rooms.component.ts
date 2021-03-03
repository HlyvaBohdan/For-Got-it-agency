import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss']
})
export class AllRoomsComponent implements OnInit {
  allRoomsArray: Array<any> = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.allRooms();
  }

  private allRooms(): void {
    this.generalService.getJSONRooms().subscribe(data => {
      this.allRoomsArray = data
    })
  }
  
}
