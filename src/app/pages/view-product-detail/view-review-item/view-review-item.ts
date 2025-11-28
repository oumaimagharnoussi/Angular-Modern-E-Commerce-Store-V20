import { Component, input } from '@angular/core';
import { UserReview } from '../../../../models/user-review';
import { ViewPanel } from "../../../directives/view-panel";
import { StarRating } from "../../../components/star-rating/star-rating";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [ViewPanel, StarRating, DatePipe],
  template: `
    <div appViewPanel class="p-4">
      <div class="flex items-start gap-4">

        
        <img 
          [src]="review().userImageUrl" 
          [alt]="review().userName" 
          class="w-12 h-12 rounded-full object-cover"
        />

        
        <div class="flex-1">

         
          <div class="text-lg font-semibold">
            {{ review().userName }}
          </div>

         
          <div class="flex items-center gap-2 mb-1">
            <app-star-rating [rating]="review().rating" />
            <span class="text-sm text-gray-500">
              {{ review().reviewDate | date: 'MMM d, yyyy' }}
            </span>
          </div>

         
          <div class="text-base font-semibold mb-1">
            {{ review().title }}
          </div>

         
          <div class="text-sm text-gray-600 leading-relaxed">
            {{ review().comment }}
          </div>

        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ViewReviewItem {
  review = input.required<UserReview>();
}
