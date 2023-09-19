package de.imedia24.shop

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@EnableSwagger2
class ShopApplication

fun main(args: Array<String>) {
	runApplication<ShopApplication>(*args)
}
