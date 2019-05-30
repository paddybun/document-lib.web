import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { SelectorDataItem } from '../selector-data-item';

@Component({
  selector: 'app-generic-selector',
  templateUrl: './generic-selector.component.html',
  styleUrls: ['./generic-selector.component.css']
})
export class GenericSelectorComponent implements OnInit, OnChanges {
  @Output() selectionChanged = new EventEmitter<string>();
  @Input() datasource: SelectorDataItem[];
  constructor() { }

  ngOnInit() {
  }

  onChange(event: any): void {
    const selectedItem = this.datasource.filter((item: SelectorDataItem) => {
      return item.id === event.target.value;
    })[0];

    this.selectionChanged.emit(selectedItem.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
