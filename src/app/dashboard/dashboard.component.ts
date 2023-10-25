import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from "../shared/select/select.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
  public testControl: FormControl = new FormControl();
  public testModel: number | null = null;
  public testGroup = new FormGroup({
    testGroupControl: new FormControl()
  });
  public items: {name: string, id: number}[] = [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
    {id: 4, name: 'fourth'},
    {id: 5, name: 'fifth'},
    {id: 6, name: 'sixth'},
    {id: 7, name: 'seventh'},
    {id: 8, name: 'eight'},
    {id: 9, name: 'ninth'},
    {id: 10, name: 'tenth'},
  ]

  ngOnInit(): void {
    this.testControl.valueChanges.subscribe((id: number): void => {
      console.log(id);
    });
    // this.testGroup.get('testGroupControl')?.valueChanges.subscribe(value => {
      // console.log(value);
    // });
  }

  public valueChanged(id: number): void {
    // console.log(this.testModel)
    // console.log(id);
  }

  public searchValueChanged(search: string): void {
    // console.log(search);
  }
}
