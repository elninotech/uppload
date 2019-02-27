# Uppload Angular

Uppload Angular is the official Angular component for [Uppload](https://github.com/elninotech/uppload), the open-source file uploading widget.

## Installation

```bash
yarn add uppload-angular
```

## Usage

# Import module

```
import { UpploadModule } from 'uppload-angular';

@NgModule({
  imports: [
    ...
    UpploadModule,
  ]
})
export class AppModule {}
```

```typescript
import { Component } from '@angular/core';
import { UpploadEvents, UpploadSettings } from 'uppload-angular';

@Component({
  selector: 'app-root',
  template: `
    <uppload [settings]="settings" (event)="handleEvent($event)">
      <button class="btn" data-uppload-button>Upload</button>
    </uppload>
  `,
})
export class AppComponent {
  public settings: UpploadSettings = {
    crop: { aspectRatio: 1 },
    uploadFunction: () => {
      return new Promise(resolve => {
        resolve('https://randomuser.me/api/portraits/men/18.jpg');
      });
    }
  };

  handleEvent({ event, payload }) {
    console.log(`Handle event`, { event, payload });
  }
}

```
