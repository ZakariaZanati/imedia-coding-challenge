package de.imedia24.shop.domain.product

import java.math.BigDecimal

data class ProductPatchRequest(
        var name: String?,
        var price: BigDecimal? = null,
        var description: String? = null
)
