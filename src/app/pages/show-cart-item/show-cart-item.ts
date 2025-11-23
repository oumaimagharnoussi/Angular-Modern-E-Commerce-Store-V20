import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIconButton, MatIcon, RouterLink],
  template: `
    <div class="grid grid-cols-3 grid-cols-[3fr_1fr_1fr]">
      
      <div class="flex items-center gap-4">
        
        <!-- IMAGE cliquable -->
        <img 
          [src]="item().product.imageUrl"
          class="w-24 h-24 rounded-lg object-cover cursor-pointer"
          [style.viewTransitionName]="'product-image-' + item().product.id"
          [routerLink]="['/product', item().product.id]"
        />

        <div>
          <!-- NAME cliquable -->
          <div 
            class="text-gray-900 text-lg font-semibold cursor-pointer"
            [routerLink]="['/product', item().product.id]">
            {{ item().product.name }}
          </div>

          <!-- PRICE cliquable -->
          <div 
            class="text-gray-600 text-lg cursor-pointer"
            [routerLink]="['/product', item().product.id]">
            \${{ item().product.price }}
          </div>
        </div>

      </div>

      <app-qty-selector 
        [quantity]="item().quantity"
        (qtyUpdated)="store.setItemQuantity({ productId: item().product.id, quantity: $event })"
      />

      <div class="flex flex-col items-end">
        <div class="text-right font-semibold text-lg">
          \${{ total() }}
        </div>

        <div class="flex -me-3">
          <button matIconButton (click)="store.moveToWishlist(item().product)">
            <mat-icon>favorite_border</mat-icon>
          </button>
          <button matIconButton class="danger" (click)="store.removeFromCart(item().product)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>

    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(EcommerceStore);

  total = computed(() =>
    (this.item().product.price * this.item().quantity).toFixed(2)
  );
}
