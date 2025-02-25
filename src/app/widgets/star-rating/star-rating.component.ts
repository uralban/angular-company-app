import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'star-rating',
  imports: [
    NgStyle
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating: number = 0;

  stars = new Array(5).fill(0);

  getFillPercentage(index: number): number {
    const starValue = (index + 1) / 5;
    if (this.rating >= starValue) return 100;
    if (this.rating <= index / 5) return 0;
    return (this.rating * 5 - index) * 100;
  }
}
