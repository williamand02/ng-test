import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy{


  @Output() public liked: EventEmitter<void> = new EventEmitter<void>();
  @Input() public src = "";
  @Input() public description = "";
  @Input() public likes = 0;
  private debouceSubject: Subject<void> = new Subject<void>();
  private unsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.debouceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.liked.emit());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public like(): void {
    this.debouceSubject.next();
  }
}
