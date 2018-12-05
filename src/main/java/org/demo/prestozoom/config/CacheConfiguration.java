package org.demo.prestozoom.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(org.demo.prestozoom.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Client.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.ClientLocation.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.ServiceRequestCart.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.ServiceRequest.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Department.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Task.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Employee.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Job.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.JobHistory.class.getName(), jcacheConfiguration);
            cm.createCache(org.demo.prestozoom.domain.Invoice.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
