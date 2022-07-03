/* (C)2022 */
package com.dimotim.spring.content.app.repositories;

import com.dimotim.spring.content.app.entities.Folder;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "folders", collectionResourceRel = "folders")
public interface FolderRepository extends JpaRepository<Folder, UUID> {
    List<Folder> findAllByNameLike(@Param("name") String name);
}
