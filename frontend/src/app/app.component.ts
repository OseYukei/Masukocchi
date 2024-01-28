import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition(
        'top => user-regist, user-regist => character-select, character-select => discssion, discssion => result, result => top',
        [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
            }),
          ]),
          query(':enter', [style({ opacity: 0 })]),
          query(':leave', animateChild()),
          group([
            query(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
            query(':enter', [animate('400ms ease-out', style({ opacity: 1 }))]),
          ]),
          query(':enter', animateChild()),
        ]
      ),
    ]),
  ],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
