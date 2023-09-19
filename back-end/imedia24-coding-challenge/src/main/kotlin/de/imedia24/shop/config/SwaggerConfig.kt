package de.imedia24.shop.config

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class SwaggerConfig {

    @Bean
    open fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .components(Components())
            .info(Info().title("Product API").version("1.0"))
    }
}