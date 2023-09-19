package de.imedia24.shop.db.entity

import org.hibernate.annotations.Type
import org.hibernate.annotations.UpdateTimestamp
import java.math.BigDecimal
import java.time.ZonedDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "products")
data class ProductEntity(

        @Id
        @Column(name = "sku")
        val sku: String,

        @Column(name = "name", nullable = false)
        var name: String,

        @Column(name = "description")
        var description: String? = null,

        @Column(name = "price", nullable = false)
        var price: BigDecimal,

        @Column(name = "stock", nullable = false)
        var stock: Int = 0,

        @UpdateTimestamp
        @Column(name = "created_at", nullable = false, updatable = false)
        val createdAt: ZonedDateTime = ZonedDateTime.now(),

        @UpdateTimestamp
        @Column(name = "updated_at", nullable = false)
        var updatedAt: ZonedDateTime = ZonedDateTime.now()
){
        constructor() : this("", "", "", BigDecimal(0), 0) {

        }
}
