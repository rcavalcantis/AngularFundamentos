import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/Photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  constructor(
      private photoService: PhotoService,
      private activateRoute: ActivatedRoute
  ) {

  }
  photos: Photo[] = [];

  ngOnInit(): void {
    const username = this.activateRoute.snapshot.params.username;
    this.photoService
    .listFromUser(username)
    .subscribe(photos => this.photos = photos);
  }

}
