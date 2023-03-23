import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productsService.create(createProductDto);
    if (product) {
      return {message:'Producto creado', product}
    } else {
      return {message:'No se pudo crear el producto'}
    }
  }
    

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return {message: 'Productos encontrados', products};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (product) {
      return {message: 'Producto encontrado', product}
    } else {
      return {message: 'Producto no encontrado'}
    }
    
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = this.productsService.update(+id, updateProductDto);
    if (product) {
      return {message: 'Producto actualizado', product}
    } else {
      return {message: 'No se pudo actualizar el producto'}
    }
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const products = this.productsService.remove(+id);
    if (products) {
      return {message:'Producto eliminado', products}
    } else {
      return {message:'No se pudo eliminar el producto'}
    }
    
  }
}
