import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: 'a[appExternalUrl]'
})
export class ExternalDirective {

  constructor(private el: ElementRef, private router: Router) {}

  @HostListener('click', ['$event'])
  clicked(event: Event) {
      const url = this.el.nativeElement.href || null;
      if (url != null ) {
          return;
      }

      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
          skipLocationChange: true,
      });

      event.preventDefault();
  }
}
