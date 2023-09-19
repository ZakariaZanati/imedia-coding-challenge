package de.imedia24.shop

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.type.TypeFactory
import de.imedia24.shop.db.entity.ProductEntity
import de.imedia24.shop.db.repository.ProductRepository
import de.imedia24.shop.domain.product.ProductPatchRequest
import de.imedia24.shop.domain.product.ProductResponse
import de.imedia24.shop.service.ProductService
import org.hamcrest.CoreMatchers
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import java.math.BigDecimal
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.junit.jupiter.api.Assertions.assertEquals
import org.mockito.ArgumentMatchers.eq
import org.mockito.BDDMockito.eq
import org.mockito.BDDMockito.given
import org.springframework.test.web.servlet.patch
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Autowired
    private lateinit var productRepository: ProductRepository

    @Autowired
    private lateinit var productService : ProductService

    @BeforeEach
    fun setup() {
        productRepository.deleteAll()
    }

    @Test
    fun `test get products by list of ids`() {


        val product1 = ProductEntity(sku = "1", price = BigDecimal(10), name = "Product 1", description = "Product description 1", stock = 10)
        val product2 = ProductEntity(sku = "2", price = BigDecimal(20), name = "Product 2", description = "Product description 2", stock = 20)
        val product3 = ProductEntity(sku = "3", price = BigDecimal(30), name = "Product 3", description = "Product description 3", stock = 30)

        productRepository.saveAll(listOf(product1, product2, product3))

        val ids = listOf(product1.sku, product3.sku)

        val response = mockMvc.perform(get("/products")
                .param("skus", ids.joinToString(","))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk)
                .andReturn()

        val productResponseList: List<ProductResponse> = objectMapper.readValue(
                response.response.contentAsString,
                TypeFactory.defaultInstance().constructCollectionType(List::class.java, ProductResponse::class.java)
        )

        assertEquals(2, productResponseList.size)
        assertEquals("1", productResponseList[0].sku)
        assertEquals("Product 1", productResponseList[0].name)
        assertEquals(BigDecimal(10), productResponseList[0].price)
        assertEquals("Product description 1", productResponseList[0].description)
        assertEquals(10, productResponseList[0].stock)
        assertEquals("3", productResponseList[1].sku)
        assertEquals("Product 3", productResponseList[1].name)
        assertEquals(BigDecimal(30), productResponseList[1].price)
        assertEquals("Product description 3", productResponseList[1].description)
        assertEquals(30, productResponseList[1].stock)
    }

    @Test
    fun `patchProduct returns 200 OK and updated product when the SKU exists`() {
        // Arrange

        val product = ProductEntity(sku = "123", price = BigDecimal(10), name = "Product 1", description = "Product description 1", stock = 10)
        productRepository.save(product)

        val sku = "123"
        val request = ProductPatchRequest(price = BigDecimal("19.99"))

        productService.patchProduct(sku, request)

        // Act
        val response = mockMvc.patch("/products/$sku") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(request)
        }

        // Assert
        response.andExpect {
            MockMvcResultMatchers.status().isOk
            MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON)
            MockMvcResultMatchers.jsonPath("$.sku").value(CoreMatchers.equalTo(sku))
            MockMvcResultMatchers.jsonPath("$.name").value(CoreMatchers.equalTo("Product 1"))
            MockMvcResultMatchers.jsonPath("$.price").value(CoreMatchers.equalTo(19.99))
            MockMvcResultMatchers.jsonPath("$.stock").value(CoreMatchers.equalTo(10))
        }
    }

    @Test
    fun `patchProduct returns 404 Not Found when the SKU does not exist`() {
        // Arrange
        val sku = "12345"
        val request = ProductPatchRequest(price = BigDecimal("19.99"))

        // Act
        val response = mockMvc.patch("/products/$sku") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(request)
        }

        // Assert
        response.andExpect {
            MockMvcResultMatchers.status().isNotFound
        }
    }

}