package de.imedia24.shop.controller

import de.imedia24.shop.db.entity.ProductEntity
import de.imedia24.shop.db.repository.ProductRepository
import de.imedia24.shop.domain.product.ProductPatchRequest
import de.imedia24.shop.domain.product.ProductRequest
import de.imedia24.shop.domain.product.ProductResponse
import de.imedia24.shop.service.ProductService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.Instant
import java.time.ZonedDateTime
import javax.websocket.server.PathParam

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService, private val productRepository: ProductRepository) {

    private val logger = LoggerFactory.getLogger(ProductController::class.java)!!

    @GetMapping("/{sku}", produces = ["application/json;charset=utf-8"])
    fun findProductsBySku(
            @PathVariable("sku") sku: String
    ): ResponseEntity<ProductResponse> {
        logger.info("Request for product $sku")

        val product = productService.findProductBySku(sku)

        return if (product == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(product)
        }
    }

    @GetMapping("")
    fun getProductsList(
            @RequestParam("skus") skus: List<String>
    ): ResponseEntity<List<ProductResponse>> {

        val products = productService.findProductsList(skus)

        return if (products.isEmpty()) {
            println("test fail")
            ResponseEntity.notFound().build()
        } else {
            println("test ok")
            ResponseEntity.ok(products)
        }
    }

    @GetMapping("/all", produces = ["application/json;charset=utf-8"])
    fun getAll(): MutableIterable<ProductEntity> {
        return productRepository.findAll();
    }

    @PostMapping
    fun addProduct(@RequestBody request: ProductRequest): ResponseEntity<ProductResponse> {
        val product = ProductEntity(
                sku = request.sku,
                name = request.name,
                description = request.description,
                price = request.price,
                stock = request.stock
        )

        val response = productService.saveProduct(product)

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{sku}")
    fun patchProduct(
            @PathVariable sku : String,
            @RequestBody request : ProductPatchRequest
    ) : ResponseEntity<ProductResponse> {

        val response = productService.patchProduct(sku, request);

        return if (response == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(response)
        }
    }
}
