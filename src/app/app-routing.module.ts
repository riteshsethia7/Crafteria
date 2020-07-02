import { NgModule, Component, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './ProductsShowcase/home/home.component';
import { SellerregisterComponent } from './authentication/sellerregister/sellerregister.component';
import { SellerloginComponent } from './authentication/sellerlogin/sellerlogin.component';
import { HomepageComponent } from './seller/homepage/homepage.component';
import { AddproductComponent } from './seller/addproduct/addproduct.component';
import { ProfileComponent } from './seller/profile/profile.component';
import { EarningsComponent } from './seller/earnings/earnings.component';
import { StartupComponent } from './startup/startup.component';
import { ModifyproductComponent } from './seller/modifyproduct/modifyproduct.component';
import { DisplayproductComponent } from './ProductsShowcase/displayproduct/displayproduct.component';
import { ProductspecificationComponent } from './ProductsShowcase/productspecification/productspecification.component';
import { CartComponent } from './ProductsShowcase/cart/cart.component';
import { BlankComponent } from './Shared/blank/blank.component';
import { AuthguardGuard } from './authentication/authguard.guard';
import { CheckoutComponent } from './ProductsShowcase/checkout/checkout.component';
import { AddressComponent } from './Shared/address/address.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { OrderedComponent } from './ProductsShowcase/ordered/ordered.component';
import { ViewordersComponent } from './ProductsShowcase/vieworders/vieworders.component';
import { SellerauthGuard } from './authentication/sellerauth.guard';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  {
    path: 'user/checkout',
    component: CheckoutComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'user/home',
    component: HomeComponent,
    children: [
      { path: 'displayproduct', component: DisplayproductComponent },
      { path: 'displayproduct/:cat/:sort', component: DisplayproductComponent },
      {
        path: 'displayproduct/:cat/:subcat/:sort',
        component: DisplayproductComponent,
      },
      { path: 'productdetails/:id', component: ProductspecificationComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthguardGuard] },
      { path: 'address', component: AddressComponent , canActivate:[AuthguardGuard]},
      {
        path: 'profile',
        component: UserprofileComponent,
        canActivate: [AuthguardGuard],
      },
      {
        path: 'vieworders' , component:ViewordersComponent , canActivate:[AuthguardGuard]
      },
      { path:'ordered',component:OrderedComponent}
    ],
  },
  { path: 'seller/register', component: SellerregisterComponent },
  { path: 'seller/login', component: SellerloginComponent },
  {
    path: 'seller',
    component: HomepageComponent,
    children: [
      { path: 'addproduct', component: AddproductComponent ,canActivate:[SellerauthGuard]},
      { path: 'editproduct/:id', component: AddproductComponent ,canActivate:[SellerauthGuard]},
      { path: 'profile', component: ProfileComponent,canActivate:[SellerauthGuard] },
      { path: 'earnings', component: EarningsComponent ,canActivate:[SellerauthGuard]},
      { path: 'modifyproduct', component: ModifyproductComponent,canActivate:[SellerauthGuard] },
    ],
  },
  {
    path: '',
    component: StartupComponent,
    pathMatch: 'full',
  },
  { path: 'blank', component: BlankComponent },
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    component: CheckoutComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
