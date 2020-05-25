import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css']
})
export class TagSelectComponent implements OnInit {
  @ViewChild('tagInput', { static: false })
  tagInput: ElementRef;

  @Input()
  public tags: string[] = [];
  @Output()
  tagsChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  public addTag(event: Event) {
    this.tags.push(this.tagInput.nativeElement.value);
    this.tagInput.nativeElement.value = '';
    event.stopPropagation();
    this.tagsChange.emit(this.tags);
  }
}
