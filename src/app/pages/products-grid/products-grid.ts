import { Component, computed, input } from '@angular/core';
import { signal } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductCard } from "../../components/product-card/product-card";
@Component({
  selector: 'app-products-grid',
  imports: [ProductCard],
  template: `
    <div class="bg gray-100 p-6" h-full>
     <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ category() }}</h1>
     <div class="responsive-grid">
     @for (product of filteredProducts(); track product.id) {
      <app-product-card [product]="product" (addToCartClicked)="addToCart($event)"/>
     }
    </div>
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
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
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
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
      rating: 4.8,
      reviewCount: 200,
      inStock: false,
      category: 'electronics'
    },
    {
      id: '4',
      name: 'Classic Denim Jacket',
      description: 'Ergonomic wireless mouse with high precision sensor.',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
      rating: 4.3,
      reviewCount: 60,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '5',
      name: 'Cotton T-Shirt Pack',
      description: 'Set of 3 premium cotton t-shirts in essential colors',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
      rating: 4.6,
      reviewCount: 95,
      inStock: true,
      category: 'clothing'
    },
    {
      id: '6',
      name: 'Fitness Tracker Watch',
      description: 'Water-resistant watch with heart rate & sleep monitoring.',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1519750157634-1299e72dce98?auto=format&w=400',
      rating: 4.4,
      reviewCount: 40,
      inStock: false,
      category: 'wearables'
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
}