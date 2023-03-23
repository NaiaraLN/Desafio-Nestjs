import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Array<Product>;
  constructor(){
    this.products = [];
  }
  create(createProductDto: CreateProductDto) {
    const id = this.generateId()
    const newProduct = {id, ...createProductDto}
    this.products.push(newProduct)
    return newProduct
  }

  findAll(): Array<Product> {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((prod) => prod.id === id);
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    this.products = this.products.map((prod) => {
      if (prod.id === id) {
        return {...prod, ...updateProductDto};
      }
      return prod;
    });
    return this.findOne(+id)
  }

  remove(id: number) {
    this.products = this.products.filter((prod) => prod.id !== id);
    return this.products
  }
  private generateId(): number {
    return this.products.length === 0
      ? 1
      : this.products[this.products.length - 1].id + 1;
  }
}
