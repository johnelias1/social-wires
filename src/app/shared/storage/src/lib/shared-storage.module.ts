import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from './session-storage.service';

@NgModule({
  imports: [CommonModule],
})
export class SharedStorageModule {
  static forRoot(): ModuleWithProviders<SharedStorageModule> {
    return {
      ngModule: SharedStorageModule,
      providers: [SessionStorageService],
    };
  }
}
