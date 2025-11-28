import { computed, inject } from "@angular/core";
import { Product } from "../models/product"
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals'
import { produce } from 'immer';
import { Toaster } from "./services/toaster";
import { CartItem } from "../models/cart";
import { P } from "@angular/cdk/keycodes";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "../models/user";
import { Router } from "@angular/router";
import { Order } from "../models/order";
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from "../models/user-review";
export type EcommerceState = {
    products : Product [];
    category : string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;

    shippingForm: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };

};
export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState ({
        products:[
            {
      id: '1',
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400',
      rating: 4.8,
      reviewCount: 120,
      inStock: true,
      category: 'electronics',
      reviews:[{
        id: '1-1',
        productId: '1',
        userName: 'Nova Wilson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        title: 'Amazing sound quality',
        comment:
          'Crystal clear audio with deep bass. Noise cancellation works perfectly even in busy environments.',
        reviewDate: new Date('2024-01-14'),
      },
      {
        id: '1-2',
        productId: '1',
        userName: 'Liam Carter',
        userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4,
        title: 'Very comfortable',
        comment:
          'I use them for long work sessions and they remain super comfortable. Battery lasts a long time.',
        reviewDate: new Date('2024-02-03'),
      },
      {
        id: '1-3',
        productId: '1',
        userName: 'Ava Mitchell',
        userImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
        rating: 5,
        title: 'Perfect for travel',
        comment:
          'Used them on a long flight, the noise cancellation is exceptional. Highly recommended!',
        reviewDate: new Date('2024-03-12'),
      },
        
      ]
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
      category: 'electronics',
      reviews: [
      {
        id: '2-1',
        productId: '2',
        userName: 'Ethan Parker',
        userImageUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
        rating: 5,
        title: 'Stunning picture quality',
        comment:
          'The OLED blacks are incredible and HDR looks beautiful. Movies feel cinematic at home.',
        reviewDate: new Date('2024-01-28'),
      },
      {
        id: '2-2',
        productId: '2',
        userName: 'Sophia Turner',
        userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
        rating: 4,
        title: 'Easy to use',
        comment:
          'The built-in apps are fast and responsive. Setup took only a few minutes.',
        reviewDate: new Date('2024-02-17'),
      },
      {
        id: '2-3',
        productId: '2',
        userName: 'Oliver Brown',
        userImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        title: 'Great for gaming',
        comment:
          'Low latency and vibrant colors. PS5 games look absolutely stunning on this TV.',
        reviewDate: new Date('2024-03-08'),
      },
    ],
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
      category: 'electronics',
      reviews: [
      {
        id: '3-1',
        userName: 'Daniel Harris',
        userImageUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
        rating: 5,
        title: 'Incredible image quality',
        comment:
          'Photos are super sharp even in low light. Perfect for professional work.',
        reviewDate: new Date('2024-03-01'),
      },
      {
        id: '3-2',
        userName: 'Ella Rose',
        userImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        rating: 4,
        title: 'Great for video',
        comment:
          '4K footage looks amazing, autofocus is fast and reliable during shoots.',
        reviewDate: new Date('2024-02-10'),
      },
    ],
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
      category: 'clothing',
    reviews: [
      {
        id: '4-1',
        userName: 'Mia Thompson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        rating: 5,
        title: 'Very stylish',
        comment: 'Fits perfectly and looks great with almost any outfit.',
        reviewDate: new Date('2024-01-20'),
      },
      {
        id: '4-2',
        userName: 'James Hunt',
        userImageUrl: 'https://randomuser.me/api/portraits/men/61.jpg',
        rating: 4,
        title: 'Good quality',
        comment: 'Material feels durable, color is exactly like photos.',
        reviewDate: new Date('2024-02-05'),
      },
      ],
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
      category: 'clothing',
    reviews: [
      {
        id: '5-1',
        userName: 'Lucas Martin',
        userImageUrl: 'https://randomuser.me/api/portraits/men/80.jpg',
        rating: 5,
        title: 'Great value',
        comment: 'Soft fabric and perfect fit. Excellent for daily wear.',
        reviewDate: new Date('2024-02-15'),
      },
      {
        id: '5-2',
        userName: 'Chloe Adams',
        userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
        rating: 4,
        title: 'Good quality shirts',
        comment: 'Comfortable and breathable. Colors hold well after washing.',
        reviewDate: new Date('2024-01-28'),
      },
    ],
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
      category: 'clothing',
    reviews: [
      {
        id: '6-1',
        userName: 'Emma Rivera',
        userImageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
        rating: 5,
        title: 'Warm and elegant',
        comment: 'Perfect for winter. Keeps me warm without feeling heavy.',
        reviewDate: new Date('2024-01-10'),
      },
      {
        id: '6-2',
        userName: 'Noah Jackson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/14.jpg',
        rating: 4,
        title: 'Good material',
        comment: 'Quality wool and comfortable fit. Worth the price.',
        reviewDate: new Date('2024-03-02'),
      },
    ],
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
      category: 'accessories',
    reviews: [
      {
        id: '7-1',
        userName: 'Ryan Coleman',
        userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        rating: 5,
        title: 'Elegant and durable',
        comment: 'Looks classy and the leather strap feels premium.',
        reviewDate: new Date('2024-02-08'),
      },
      {
        id: '7-2',
        userName: 'Sophia Brooks',
        userImageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
        rating: 4,
        title: 'Nice watch',
        comment: 'Great build quality but the strap is a bit stiff at first.',
        reviewDate: new Date('2024-01-22'),
      },
    ],
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
      category: 'accessories',
    reviews: [
      {
        id: '8-1',
        userName: 'Zoe Carter',
        userImageUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
        rating: 5,
        title: 'Stylish and comfortable',
        comment: 'Perfect fit and great sun protection.',
        reviewDate: new Date('2024-01-27'),
      },
      {
        id: '8-2',
        userName: 'Jacob Gray',
        userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        rating: 4,
        title: 'Good sunglasses',
        comment: 'Very comfortable but the case could be better.',
        reviewDate: new Date('2024-02-14'),
      },
    ],
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
      category: 'accessories',
    reviews: [
      {
        id: '9-1',
        userName: 'Patrick Meyer',
        userImageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
        rating: 5,
        title: 'Top-notch leather',
        comment: 'Feels premium and smells like real leather. Lots of space.',
        reviewDate: new Date('2024-03-05'),
      },
      {
        id: '9-2',
        userName: 'Amelia Scott',
        userImageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
        rating: 4,
        title: 'Good wallet',
        comment: 'Compact and elegant. Could use an extra slot though.',
        reviewDate: new Date('2024-02-12'),
      },
    ],
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
      category: 'home',
    reviews: [
      {
        id: '10-1',
        userName: 'Emily Fox',
        userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        rating: 5,
        title: 'Love the automation',
        comment: 'Brews coffee automatically when I wake up. Amazing!',
        reviewDate: new Date('2024-01-19'),
      },
      {
        id: '10-2',
        userName: 'Luke Harper',
        userImageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
        rating: 4,
        title: 'Good but noisy',
        comment: 'Coffee tastes great but the machine is a little loud.',
        reviewDate: new Date('2024-02-02'),
      },
    ],
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
      category: 'home',
    reviews: [
      {
        id: '11-1',
        userName: 'Olivia Bennett',
        userImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
        title: 'Huge difference',
        comment: 'Air feels fresher and my allergies are much better.',
        reviewDate: new Date('2024-01-14'),
      },
      {
        id: '11-2',
        userName: 'Henry Lewis',
        userImageUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
        rating: 4,
        title: 'Quiet and efficient',
        comment: 'Works well and very silent at night.',
        reviewDate: new Date('2024-02-20'),
      },
    ],
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
      category: 'home',
    reviews: [
      {
        id: '12-1',
        userName: 'Leo Anderson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/94.jpg',
        rating: 5,
        title: 'Cleans very well',
        comment: 'Picks up pet hair and dust easily. Great mapping.',
        reviewDate: new Date('2024-01-23'),
      },
      {
        id: '12-2',
        userName: 'Sienna White',
        userImageUrl: 'https://randomuser.me/api/portraits/women/55.jpg',
        rating: 4,
        title: 'Good robot vacuum',
        comment:
          'Cleans efficiently but sometimes gets stuck under low furniture.',
        reviewDate: new Date('2024-02-11'),
      },
    ],
    }
        ],
        category:'all',
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading:false,
        selectedProductId: undefined,
        writeReview:false,

        shippingForm: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          zip: '',
        }

    } as EcommerceState),
    withStorageSync({ key: 'modern-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user})}),
    withComputed(({category, products, wishlistItems, cartItems, selectedProductId}) => ({
        filteredProducts: computed(()=>{
            if (category() === 'all') 
      return products();
    
    return products().filter(p => p.category === category().toLowerCase());

        }),
        wishlistCount : computed(() => wishlistItems().length),
        cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId())),
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) =>({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store,{category});
        }),
        setProductId: signalMethod<string>((productId: string) => {
          patchState(store, { selectedProductId: productId });
        }),
        addToWishlist: (product: Product) => {
          const updateWishlistItems = produce (store.wishlistItems(), (draft) => {
            if (!draft.find(p => p.id === product.id)) {
              draft.push(product);
            }
          });
          patchState(store, {wishlistItems: updateWishlistItems});
          toaster.success("Product added to wishlist");
        },
        removeFromWishlist: (product: Product) => {
          patchState(store, {
            wishlistItems: store.wishlistItems().filter((p) =>p.id !== product.id),
          });
          toaster.success('Product removed from wishlist');
        },
        clearWishlist: () => {
          patchState(store, { wishlistItems: []});
        },
        addToCart: (product: Product, quantity = 1) => {
          const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
          const updatedCartItems = produce(store.cartItems(), (draft) => {
           if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
           }
           draft.push({
            product, quantity
           })
          });
          patchState(store, { cartItems: updatedCartItems})
          toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart')
        },
        setItemQuantity(params: { productId: string, quantity: number}) {
          const index = store.cartItems().findIndex(c => c.product.id === params.productId);
          const updated = produce(store.cartItems(), (draft) => {
            draft[index].quantity = params.quantity
          });
          patchState(store, { cartItems: updated});
        },
        addAllWishlistToCart: () => {
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            store.wishlistItems().forEach(p => {
              if(!draft.find(c => c.product.id === p.id)){
                draft.push({ product: p, quantity : 1});

              }
            })
          })
          patchState(store, { cartItems: updatedCartItems, wishlistItems: []})
        },
        moveToWishlist: (product: Product) => {
          const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id));
          const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
            if (!draft.find(p => p.id === product.id)) {
              draft.push(product)
            }
          });
          patchState(store, { cartItems: updatedCartItems, wishlistItems: updateWishlistItems});   
        },
        removeFromCart: (product: Product) => {
          patchState(store, {cartItems:store.cartItems().filter((c) => c.product.id !== product.id),
        });
        },
        proceedToCheckout: () => {

          const total = Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          );

          if (total <= 0) {
            toaster.error('Your cart is empty');
            return;
          }


          if (!store.user()){
            matDialog.open(SignInDialog, {
              disableClose: true,
              data: { checkout: true }
            });
            return;
          }

          
          router.navigate(['/checkout']);
        },


        updateShippingForm: (field: string, value: string) => {
          patchState(store, {
            shippingForm: {
              ...store.shippingForm(),
              [field]: value
            }
          });
        },

        placeOrder: async () => {
          patchState(store, { loading: true });
    
          const user = store.user();
          if (!user) {
            toaster.error('Please login before placing order');
            patchState(store, { loading: false });
            return;
          }
    
          const f = store.shippingForm();
    
          
          if (!f.firstName || !f.lastName || !f.address || !f.city || !f.state || !f.zip) {
            toaster.error("Please complete all shipping information");
            patchState(store, { loading: false });
            return;
          }
    
          const order: Order = {
            id: crypto.randomUUID(),
            userId: user.id,
            total: Math.round(
              store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
            ),
            items: store.cartItems(),
            paymentStatus: 'success',
          };
    
          await new Promise(res => setTimeout(res, 1000));
    
          patchState(store, { loading: false, cartItems: [] });
          router.navigate(['order-success']);
        },


        signIn:({ email, password, checkout, dialogId }: SignInParams) => {
          patchState(store, {
            user: {
              id: '1',
              email,
              name:'John Doe',
              imageUrl:'https://randomuser.me/api/portraits/men/1.jpg',
            },
          });
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }

        },
        signUp:({ email, password, name, checkout, dialogId }: SignUpParams) => {
          patchState(store, {
            user: {
              id: '1',
              email,
              name:'John Doe',
              imageUrl:'https://randomuser.me/api/portraits/men/1.jpg',
            },
          });
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }

        },
        signOut: () => {
          patchState(store, { user: undefined });
        },
        showWriteReview: () => {
          patchState(store, {writeReview: true});
        },
        hideWriteReview: () => {
          patchState(store, {writeReview: false});
        },
        addReview: async ({ title, comment, rating }: AddReviewParams) => {
          patchState(store, { loading: true });
          const product = store.products().find((p) => p.id === store.selectedProductId());
          if(!product){
            
            patchState(store, { loading: false });
            return;
          }
          const review: UserReview = {
            id: crypto.randomUUID(),
            title,
            comment,
            rating,
            productId: product.id,
            userName : store.user()?.name || '',
            userImageUrl : store.user()?.imageUrl || '',
            reviewDate: new Date(),
          };
          const updatedProducts = produce(store.products(), (draft) => {
  const index = draft.findIndex((p) => p.id === product.id);

  draft[index].reviews.push(review);

  draft[index].rating =
    Math.round(
      (
        draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
        draft[index].reviews.length
      ) * 10
    ) / 10;

  draft[index].reviewCount = draft[index].reviews.length;
});
await new Promise((resolve) => setTimeout(resolve, 1000));
patchState(store, { loading: false, products: updatedProducts, writeReview: false});
        },
    }))
); 