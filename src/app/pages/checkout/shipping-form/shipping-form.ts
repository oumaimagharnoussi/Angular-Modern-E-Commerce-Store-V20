import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { EcommerceStore } from '../../../ecommerce-store';


@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatFormField, MatInput, FormsModule],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <mat-icon>local_shipping</mat-icon>
        Shipping Information
      </h2>

      <form class="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <mat-form-field>
          <input matInput placeholder="First Name" required
                 [ngModel]="store.shippingForm().firstName"
                 (ngModelChange)="store.updateShippingForm('firstName', $event)"
                 name="firstName" />
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="Last Name" required
                 [ngModel]="store.shippingForm().lastName"
                 (ngModelChange)="store.updateShippingForm('lastName', $event)"
                 name="lastName" />
        </mat-form-field>

        <mat-form-field class="col-span-2">
          <input matInput placeholder="Address" required
                 [ngModel]="store.shippingForm().address"
                 (ngModelChange)="store.updateShippingForm('address', $event)"
                 name="address" />
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="City" required
                 [ngModel]="store.shippingForm().city"
                 (ngModelChange)="store.updateShippingForm('city', $event)"
                 name="city" />
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="State" required
                 [ngModel]="store.shippingForm().state"
                 (ngModelChange)="store.updateShippingForm('state', $event)"
                 name="state" />
        </mat-form-field>

        <mat-form-field class="col-span-2">
          <input matInput placeholder="Zip" required
                 [ngModel]="store.shippingForm().zip"
                 (ngModelChange)="store.updateShippingForm('zip', $event)"
                 name="zip" />
        </mat-form-field>

      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {
  store = inject(EcommerceStore);
}
