/* (C)2022 */
package com.dimotim.spring.content.app.entities;

import java.util.Date;
import java.util.UUID;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;
import org.springframework.content.commons.annotations.MimeType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "UniqFileName",
                    columnNames = {"parent_id", "name"})
        })
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;
    private Date created = new Date();
    private String summary;

    @ContentId private UUID contentId;

    @ContentLength private long contentLength;

    @MimeType private String contentMimeType = "text/plain";

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Folder parent;
}
