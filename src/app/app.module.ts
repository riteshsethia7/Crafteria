import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './ProductsShowcase/home/home.component';
import { SellerregisterComponent } from './authentication/sellerregister/sellerregister.component';
import { SellerloginComponent } from './authentication/sellerlogin/sellerlogin.component';
import { SellerInterceptor } from './authentication/seller.interceptor';
import { HomepageComponent } from './seller/homepage/homepage.component';
import { AddproductComponent } from './seller/addproduct/addproduct.component';
import { EarningsComponent } from './seller/earnings/earnings.component';
import { ProfileComponent } from './seller/profile/profile.component';
import { StartupComponent } from './startup/startup.component';
import { UserInterceptor } from './authentication/user.interceptor';
import { NavbarproductsComponent } from './Shared/navbarproducts/navbarproducts.component';
import { ModifyproductComponent } from './seller/modifyproduct/modifyproduct.component';
import { DisplayproductComponent } from './ProductsShowcase/displayproduct/displayproduct.component';
import { ProductspecificationComponent } from './ProductsShowcase/productspecification/productspecification.component';
import { CartComponent } from './ProductsShowcase/cart/cart.component';
import { BlankComponent } from './Shared/blank/blank.component';
import { CheckoutComponent } from './ProductsShowcase/checkout/checkout.component';
import { AddressComponent } from './Shared/address/address.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { ExternalDirective } from './Shared/external.directive';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OrderedComponent } from './ProductsShowcase/ordered/ordered.component';
import { ViewordersComponent } from './ProductsShowcase/vieworders/vieworders.component';
import { DummyComponent } from './Shared/dummy/dummy.component';


const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    SellerregisterComponent,
    SellerloginComponent,
    HomepageComponent,
    AddproductComponent,
    EarningsComponent,
    ProfileComponent,
    StartupComponent,
    NavbarproductsComponent,
    ModifyproductComponent,
    DisplayproductComponent,
    ProductspecificationComponent,
    CartComponent,
    BlankComponent,
    CheckoutComponent,
    AddressComponent,
    UserprofileComponent,
    ExternalDirective,
    OrderedComponent,
    ViewordersComponent,
    DummyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SellerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {

          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      },
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
