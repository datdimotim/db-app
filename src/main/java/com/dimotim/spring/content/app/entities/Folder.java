/* (C)2022 */
package com.dimotim.spring.content.app.entities;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;
    private Date created = new Date();
    private String summary;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private Set<Folder> childs;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private Set<File> files;
}
