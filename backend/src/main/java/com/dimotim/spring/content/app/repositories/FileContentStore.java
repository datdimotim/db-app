/* (C)2022 */
package com.dimotim.spring.content.app.repositories;

import com.dimotim.spring.content.app.entities.File;
import java.util.UUID;
import org.springframework.content.commons.repository.ContentStore;
import org.springframework.content.rest.StoreRestResource;

@StoreRestResource
public interface FileContentStore extends ContentStore<File, UUID> {}
