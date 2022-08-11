package com.dimotim.spring.content.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.tuckey.web.filters.urlrewrite.Conf;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;

@Component
public class AppUrlRewriteFilter extends UrlRewriteFilter {

    private static final String CONFIG_LOCATION = "classpath:/urlrewrite.xml";

    @Value(CONFIG_LOCATION)
    private Resource resource;

    @Override
    protected void loadUrlRewriter(FilterConfig filterConfig) throws ServletException {
        try (InputStream is = resource.getInputStream()) {
            Conf conf = new Conf(filterConfig.getServletContext(), is, resource.getFilename(), "@@yourOwnSystemId@@");
            checkConf(conf);
        } catch (IOException ex) {
            throw new ServletException("Unable to load URL rewrite configuration file from " + CONFIG_LOCATION, ex);
        }
    }
}
