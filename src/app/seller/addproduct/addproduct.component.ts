import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from 'src/app/authentication/seller.service';
import { mimeType } from './image-validator';
import { ProductsService } from 'src/app/Shared/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  constructor(
    private sellerservice: SellerService,
    private productservice: ProductsService,
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public router : Router
  ) {}

  private mode = 'create';
  private id: string;
  private product: any;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      subcategory: new FormControl(null, { validators: [Validators.required] }),
      quantity: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      productspecifications: new FormControl(null, {
        validators: [Validators.required],
      }),
      productdescription: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(20)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((obj: ParamMap) => {
      if (obj.has('id')) {
        this.mode = 'edit';
        this.id = obj.get('id');
        this.productservice.getproduct(this.id);
        this.productservice.getproducts().subscribe((res) => {
          this.product = res[0];
          this.form.setValue({
            name: this.product.name,
            price: this.product.price,
            category: this.product.category,
            subcategory: this.product.subcategory,
            quantity: this.product.quantity,
            productspecifications: this.product.productspecifications,
            productdescription: this.product.Productdescription,
            image: this.product.imagepath,
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
    this.sellerid = this.sellerservice.getdecodedtoken();
  }
  sellerid: any;
  imagepreview;
  Category: Array<any> = [
    {
      name: 'Home & Furniture',
      subcat: ['Decor', 'Chairs', 'Boxes', 'Paintings'],
    },
    {
      name: 'Stationery',
      subcat: ['Notebooks', 'Envelopes', 'Pens & Pencils', 'Gift Cards'],
    },
    {
      name: 'Clothing',
      subcat: ['stoles', 'socks', 'mufflers', 'caps', 'Garments'],
    },
    {
      name: 'Jewelry',
      subcat: ['Earrings', 'Necklaces', 'Bangles & Bracelets'],
    },
    {
      name: 'Accesories',
      subcat: ['Bags & Wallets', 'Footwear', 'Key Chains'],
    },
    { name: 'Pottery', subcat: ['Mugs & Cups', 'Crockery'] },
  ];
  jwtdata = this.sellerservice.getdecodedtoken();
  form: FormGroup;
  Subcat: Array<any>;
  changesubcat(name) {
    this.Subcat = this.Category.find((cat) => cat.name == name).subcat;
  }

  onaddproduct() {
    if (this.form.valid) {
      if (this.mode == 'create') {
        this.productservice.uploadproduct(
          this.form,
          this.sellerid.userid,
          this.form.value.image
        );
      this.openSnackBar('Product Updated successfully', 'Hurray!!!');
      this.router.navigateByUrl('/seller/modifyproduct')
      } else {
        this.productservice.updateproduct(
          this.form,
          this.id,
          this.form.value.image
        );
      this.openSnackBar('Product added successfully', 'Hurray!!!');
      }
      this.form.reset();
    }
  }

  onimageselected(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagepreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
