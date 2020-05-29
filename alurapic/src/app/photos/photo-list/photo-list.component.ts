import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/Photo';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PhotoService } from '../photo/photo.service';
 
@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentePage: number = 1;
  userName: string = '';

  constructor(
      private activetedRoute: ActivatedRoute,
      private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.userName = this.activetedRoute.snapshot.params.userName;
    this.photos = this.activetedRoute.snapshot.data['photos'];
    this.debounce
    .pipe(debounceTime(300))
    .subscribe( filter => this.filter  = filter );
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load(){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentePage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
      if(!photos.length) this.hasMore = false;
      });
  }
}