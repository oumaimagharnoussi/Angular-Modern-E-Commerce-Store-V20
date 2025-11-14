import { Component, computed, input } from '@angular/core';
import { signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatListItemTitle, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
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
        TitleCasePipe
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
          {{ filteredProducts().length}} products found
        </p>
      <div class="responsive-grid">
      @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" (addToCartClicked)="addToCart($event)"/>
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
  products = signal<Product[]>([
    {
      id: '1',
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400',
      rating: 4.8,
      reviewCount: 120,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '2',
      name: 'Smart 4K TV"',
      description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400',
      rating: 4.6,
      reviewCount: 85,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '3',
      name: 'Professional Camera',
      description: 'Mirrorless digital camera with 4K video capabilities',
      price: 899.99,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400',
      rating: 4.7,
      reviewCount: 200,
      inStock: true,
      category: 'electronics'
    },
    {
      id: '4',
      name: 'Classic Denim Jacket',
      description: 'Vintage-style denim jacket with modern fit',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400',
      rating: 4.5,
      reviewCount: 60,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '5',
      name: 'Cotton T-Shirt Pack',
      description: 'Set of 3 premium cotton t-shirts in essential colors.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400',
      rating: 4.6,
      reviewCount: 95,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '6',
      name: 'Wool Winter Coat',
      description: 'Water-resistant watch with heart rate & sleep monitoring.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400',
      rating: 4.6,
      reviewCount: 40,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '7',
      name: 'Leather Watch',
      description: 'Classic analog watch with genuine leather strap.',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400',
      rating: 4.7,
      reviewCount: 40,
      inStock: true,
      category: 'accessories'
    },
    {
      id: '8',
      name: 'Designer Sunglasses',
      description: 'UV-protected polarized sunglasses with premium frame.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400',
      rating: 4.6,
      reviewCount: 50,
      inStock: true,
      category: 'accessories'
    },
    {
      id: '9',
      name: 'Leather Wallet',
      description: 'Handcrafted leather wallet with RFID protection.',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400',
      rating: 4.5,
      reviewCount: 5,
      inStock: true,
      category: 'accessories'
    },
    {
      id: '10',
      name: 'Smart Coffee Maker',
      description: 'WiFi-enabled coffee maker with programmable brewing.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400',
      rating: 4.7,
      reviewCount: 50,
      inStock: true,
      category: 'home'
    },
    {
      id: '11',
      name: 'Air Purifier',
      description: 'HEPA air purifier with air quality monitoring.',
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400',
      rating: 4.8,
      reviewCount: 30,
      inStock: true,
      category: 'home'
    },
    {
      id: '12',
      name: 'Robot Vacuum',
      description: 'Smart robot vacuum with mapping and scheduling.',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400',
      rating: 4.6,
      reviewCount: 40,
      inStock: false,
      category: 'home'
    }
  ]);
  filteredProducts = computed(() => {

    if (this.category() === 'all') 
      return this.products();
    
    return this.products().filter(p => p.category === this.category().toLowerCase());
});
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
}