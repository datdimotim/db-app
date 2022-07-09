/* (C)2022 */
package com.dimotim.spring.content.app;

import static com.github.paulcwarren.ginkgo4j.Ginkgo4jDSL.*;
import static com.jayway.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

import com.dimotim.spring.content.app.entities.File;
import com.dimotim.spring.content.app.repositories.FileContentStore;
import com.dimotim.spring.content.app.repositories.FileRepository;
import com.github.paulcwarren.ginkgo4j.Ginkgo4jSpringRunner;
import com.jayway.restassured.RestAssured;
import java.io.ByteArrayInputStream;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpStatus;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@RunWith(Ginkgo4jSpringRunner.class)
public class GettingStartedTest extends BaseTest {

    @Autowired private FileRepository fileRepo;
    @Autowired private FileContentStore fileContentStore;

    @Value("${local.server.port}")
    private int port;

    private File file;

    {
        Describe(
                "File Tests",
                () -> {
                    BeforeEach(
                            () -> {
                                RestAssured.port = port;
                            });

                    Context(
                            "Given a File Entity",
                            () -> {
                                BeforeEach(
                                        () -> {
                                            File f = new File();
                                            f.setName("test-file");
                                            f.setContentMimeType("text/plain");
                                            f.setSummary("test file summary");
                                            file = fileRepo.save(f);
                                        });

                                It(
                                        "should be able to associate content with the Entity",
                                        () -> {
                                            UUID fid = file.getId();

                                            given().multiPart(
                                                            "file",
                                                            "file",
                                                            new ByteArrayInputStream(
                                                                    "This is plain text content!"
                                                                            .getBytes()),
                                                            "text/plain")
                                                    .when()
                                                    .put("/files/" + fid + "/content")
                                                    .then()
                                                    .statusCode(HttpStatus.SC_CREATED);

                                            Optional<File> file = fileRepo.findById(fid);
                                            assertThat(
                                                    IOUtils.toString(
                                                            fileContentStore.getContent(
                                                                    file.get())),
                                                    is("This is plain text content!"));
                                        });

                                Context(
                                        "with existing content",
                                        () -> {
                                            BeforeEach(
                                                    () -> {
                                                        fileContentStore.setContent(
                                                                file,
                                                                new ByteArrayInputStream(
                                                                        "Existing content"
                                                                                .getBytes()));
                                                        fileRepo.save(file);
                                                    });

                                            It(
                                                    "should return the content",
                                                    () -> {
                                                        given().header("accept", "text/plain")
                                                                .when()
                                                                .get(
                                                                        "files/"
                                                                                + file.getId()
                                                                                + "/content")
                                                                .then()
                                                                .assertThat()
                                                                .contentType(
                                                                        Matchers.startsWith(
                                                                                "text/plain"))
                                                                .body(
                                                                        Matchers.equalTo(
                                                                                "Existing"
                                                                                    + " content"));
                                                    });
                                        });
                            });
                });
    }

    @Test
    public void noop() {}
}
