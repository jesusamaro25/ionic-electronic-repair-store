import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';


@NgModule({
  declarations: [FilterPipe, ImageSanitizerPipe],
  exports: [ FilterPipe, ImageSanitizerPipe ]
})
export class PipesModule { }
