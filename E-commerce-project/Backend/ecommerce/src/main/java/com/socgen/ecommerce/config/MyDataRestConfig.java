package com.socgen.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.socgen.ecommerce.Entity.Product;
import com.socgen.ecommerce.Entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};
		
		//disable write operations and make it only read only
		config.getExposureConfiguration()
				.forDomainType(Product.class)
				.withItemExposure((metadata, httMethods)-> httMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportedActions));
		
		//disable write operations and make it only read only
		config.getExposureConfiguration()
				.forDomainType(ProductCategory.class)
				.withItemExposure((metadata, httMethods)-> httMethods.disable(theUnsupportedActions))
				.withCollectionExposure((metadata, httpMethods)-> httpMethods.disable(theUnsupportedActions));
		
	}

}
