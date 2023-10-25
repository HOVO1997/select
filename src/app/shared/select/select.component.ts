import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef, Inject,
  Input,
  numberAttribute,
  OnInit,
  Output
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs";
import {SetSelectPanelHeightDirective} from "../../core/directives/set-select-panel-height.directive";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {VisibleItemsCountToken} from "../../core/tokens/visibleItemsCount.token";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    SetSelectPanelHeightDirective,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {provide: VisibleItemsCountToken, useValue: 5}
],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input({required: true}) items: { id: number, name: string }[] = [];
  @Input({transform: numberAttribute}) visibleItemsCount: number | null = null;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchValueChanged: EventEmitter<string> = new EventEmitter<string>();
  public searchControl: FormControl = new FormControl('');
  public filteredOptions: { id: number, name: string }[] = [];
  public autoCompleteSelectedValue: {id: number, name: string} | null = null;
  public selectedValue: number | null = null;

  constructor(@Inject(VisibleItemsCountToken) visibleItemsCountToken: number) {
    this.visibleItemsCount = visibleItemsCountToken;
  }
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value === null) return;
        this.searchValueChanged.emit(value);
        this.filteredOptions = this.items.filter(option =>
          option.name.toLowerCase().includes(typeof value === 'string' ? value.toLowerCase() : value.name)
        );
      }),
    ).subscribe();
  }

  public displayFn(option: { id: number, name: string }): string {
    return option && option.name ? option.name : '';
  }

  public get heightSetter(): number {
    if (!this.visibleItemsCount) return 250;
    if (this.filteredOptions.length < this.visibleItemsCount) {
      return this.filteredOptions.length * 50;
    } else {
      return this.visibleItemsCount * 50;
    }
  }

  public selectionChanged(event: MatSelectChange): void {
    this.valueChanged.emit(event.value);
    this.onChange(event.value);
    this.onTouched();
  }

  public autocompleteChanged(event: MatAutocompleteSelectedEvent): void {
    this.valueChanged.emit(event.option.value.id);
    this.onChange(event.option.value.id);
    this.onTouched();
  }

  private onChange = (arg: number): void => {
  };
  private onTouched = (): void => {
  };

  registerOnChange(fn: (arg: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: unknown): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
