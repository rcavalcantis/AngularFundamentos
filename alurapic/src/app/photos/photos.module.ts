import { NgModule } from '@angular/core';
import { PhotoModule } from './photo/photo.module';
import { PhotoFomrModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { SearchComponent } from './photo-list/search/search.component';


@NgModule({
    imports: [ 
        PhotoModule,
        PhotoFomrModule,
        PhotoListModule
    ]
})
export class PhotosModule {}