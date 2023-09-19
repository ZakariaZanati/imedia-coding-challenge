package de.imedia24.shop.service

import de.imedia24.shop.db.entity.ProductEntity
import de.imedia24.shop.db.repository.ProductRepository
import de.imedia24.shop.domain.product.ProductPatchRequest
import de.imedia24.shop.domain.product.ProductResponse
import de.imedia24.shop.domain.product.ProductResponse.Companion.toProductResponse
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.ZonedDateTime

@Service
class ProductService(private val productRepository: ProductRepository) {

    fun findProductBySku(sku: String): ProductResponse? {

        val productEntity = productRepository.findBySku(sku);

        return productEntity?.toProductResponse()
    }

    fun findProductsList(skus : List<String>) : List<ProductResponse> {

        val products = productRepository.findAllBySkuIn(skus)

        return ProductResponse.productsList(products);

    }

    fun saveProduct( product : ProductEntity) : ProductResponse {

        val newProduct = productRepository.save(product);

        return newProduct.toProductResponse();
    }

    fun patchProduct(sku: String, request: ProductPatchRequest): ProductResponse? {
        val product = productRepository.findBySku(sku)

        if (product != null) {
            var updated = false // Track if any updates were made

            request.name?.let {
                product.name = it
                updated = true
            } // the name should never be null

            if (request.description != product.description) {
                product.description = request.description
                updated = true
            }

            request.price?.let {
                if (it >= BigDecimal.ZERO) { // Assuming price cannot be negative
                    product.price = it
                    updated = true
                }
            }

            if (updated) {
                product.updatedAt = ZonedDateTime.now()
                return saveProduct(product)
            }
        }

        return null // Return null if the product doesn't exist or no updates were made
    }

}
