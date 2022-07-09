/* (C)2022 */
package com.dimotim.spring.content.app.repositories;

import com.dimotim.spring.content.app.entities.File;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "files", collectionResourceRel = "files")
public interface FileRepository extends JpaRepository<File, UUID> {
    List<File> findAllByNameLike(@Param("name") String name);
}
