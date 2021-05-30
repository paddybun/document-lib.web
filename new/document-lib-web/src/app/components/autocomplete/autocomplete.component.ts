import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() options: string[] = [];
  @Input() selectedCategory: string = "";
  @Input() placeholder: string = "";
  @Input() label: string = "";

  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  public myControl = new FormControl();
  public filteredOptions!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public handleChange(event: any) {
    this.categoryChange.emit(event.target.value);
  }

}
