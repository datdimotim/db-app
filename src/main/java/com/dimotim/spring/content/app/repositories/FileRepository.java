package com.dimotim.spring.content.app.repositories;

import com.dimotim.spring.content.app.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="files", collectionResourceRel="files")
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findAllByNameLike(@Param("name") String name);

}
