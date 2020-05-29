import { NgModule } from '@angular/core';
import { PhotoModule } from './photo/photo.module';
import { PhotoFomrModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';


@NgModule({
    imports: [ 
        PhotoModule,
        PhotoFomrModule,
        PhotoListModule
    ]
})
export class PhotosModule {}