package de.imedia24.shop.domain.product

import de.imedia24.shop.db.entity.ProductEntity
import java.math.BigDecimal

data class ProductResponse(
        var sku: String,
        var name: String,
        var description: String,
        var price: BigDecimal,
        var stock: Int
) {
    companion object {
        fun ProductEntity.toProductResponse() = ProductResponse(
                sku = sku,
                name = name,
                description = description ?: "",
                price = price,
                stock = stock
        )

        fun productsList(products: List<ProductEntity>): List<ProductResponse> {

            return products.map {
                ProductResponse(
                        sku = it.sku,
                        name = it.name,
                        description = it.description ?: "",
                        price = it.price,
                        stock = it.stock
                )
            }
        }
    }
}
