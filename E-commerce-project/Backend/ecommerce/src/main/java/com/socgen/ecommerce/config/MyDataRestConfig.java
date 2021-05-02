package com.socgen.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.socgen.ecommerce.Entity.Product;
import com.socgen.ecommerce.Entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
	
	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		this.entityManager= theEntityManager;
	}
	
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
		
		// call an internal helper method to expose the ids while retrieving entities
		exposeIds(config);
		
		
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		//get all the enities from jpa's entityManager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		List<Class> entityClasses = new ArrayList<>();
		
		//get entity types for the entities
		for( EntityType tempEntity : entities) {
			entityClasses.add(tempEntity.getJavaType());
		}
		
		// expose the entity ids for entitys domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
 		
		
	}

}
