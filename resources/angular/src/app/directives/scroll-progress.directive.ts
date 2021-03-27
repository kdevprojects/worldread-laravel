import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollProgress]',
})
export class ScrollProgressDirective {
  constructor(private hostElement: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const winScroll =
      event.target.documentElement.scrollTop ||
      event.currentTarget.scrollTop ||
      document.body.scrollTop;
    const height = this.hostElement.nativeElement.scrollHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollBar').style.width = scrolled + '%';
  }
}
