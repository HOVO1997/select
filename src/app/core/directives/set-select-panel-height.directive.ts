import {Directive, HostListener, Input, Optional, Renderer2} from '@angular/core';
import {MatSelect} from "@angular/material/select";

@Directive({
  selector: '[appSetSelectPanelHeight]',
  standalone: true,
})
export class SetSelectPanelHeightDirective {
  @Input() visibleItemsCount: number | null = null;
  constructor(
    @Optional() private matSelect: MatSelect,
    private renderer: Renderer2) {}

  @HostListener("click", ["$event"])
  changeSelectHeight(): void {
    if (this.visibleItemsCount && this.matSelect) {
      this.renderer.setStyle(this.matSelect.panel.nativeElement, "max-height", (this.visibleItemsCount * 50) + "px");
    }
  }
}
