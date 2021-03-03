import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRoomsComponent } from './pages/all-rooms/all-rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'allrooms', pathMatch: 'full' },
  { path: 'allrooms', component: AllRoomsComponent },
  { path: 'allrooms/:code', component: RoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
