import { Component, computed, inject, input } from '@angular/core';
import { signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";
@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatListItem,
    MatListItemTitle,
    MatNavList,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton
],
  template: `

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true"> 
          <div class="p-6">
            <h2 class="text-lg text-gray-900">Categories</h2>
            <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products', cat]">
              <span matListItemTitle class="font-medium" [class]="cat === category() ? '!text-white': null ">
                {{ cat | titlecase }}
              </span>
              </mat-list-item>
            }
            </mat-nav-list>
          </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg gray-100 p-6 h-full">
      <h1 class="text-2xl font-bold text-gray-900 mb-1 ">{{ category() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length}} products found
        </p>
      <div class="responsive-grid">
      @for (product of store.filteredProducts(); track product.id) {
        <app-product-card [product]="product">
          <app-toggle-wishlist-button class="!absolute z-10 top-3 right-3 !bg-white shadow-md rounded-md transition-all duration-200 hover:scale-110 hover:shadow-lg" 
          [product]="product"
          [style.viewTransitionName]="'wishlist-button-' + product.id"/>
        </app-product-card>
      }
      </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    
  
  <div class="bg gray-100 p-6 h-full">
     
    </div>
    
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
  store = inject(EcommerceStore);
  
addToCart(product: Product) {
  console.log('Adding to cart:', product);
}

categories = signal<string[]>([
  'all',
  'electronics',
  'clothing',
  'wearables',
  'accessories',
  'home'
]);
  constructor(){
    this.store.setCategory(this.category);
  }
}