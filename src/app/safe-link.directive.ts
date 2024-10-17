import { Directive, input } from '@angular/core';

@Directive({
  // This selector will apply to any anchor element with appSafeLink attribute
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    // $event is a MouseEvent object automatically generated by browser itself when an anchor element is clicked!
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp');

  constructor() {
    console.log('SafeLink directive is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');
    if (wantsToLeave) {
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href =
        address + '?from=' + this.queryParam();
      return;
    }
    event?.preventDefault();
  }
}
