package com.dimotim.spring.content.app.config;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@WebFilter(urlPatterns = "/api/files/*")
public class ContentFilter implements Filter {
    public static final int MAX_CONTENT_LENGTH = 1024 * 1024 * 2;
    private final Pattern pattern = Pattern.compile("^bytes=(?<start>\\d+)-$");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String range = req.getHeader(HttpHeaders.RANGE);

        if (!req.getRequestURI().endsWith("content") || range == null) {
            chain.doFilter(request, response);
            return;
        }

        Matcher matcher = pattern.matcher(range);

        if (!matcher.matches()) {
            chain.doFilter(request, response);
            return;
        }

        int start = Integer.parseInt(matcher.group("start"));
        int end = start + MAX_CONTENT_LENGTH;

        String header = "bytes=" + start + "-" + end;

        HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(req) {
            @Override
            public String getHeader(String name) {
                if (HttpHeaders.RANGE.equalsIgnoreCase(name)) {
                    return header;
                } else {
                    return super.getHeader(name);
                }
            }

            @Override
            public Enumeration<String> getHeaders(String name) {
                if (HttpHeaders.RANGE.equalsIgnoreCase(name)) {
                    return new Enumeration<>() {
                        boolean hasMore = true;

                        @Override
                        public boolean hasMoreElements() {
                            return hasMore;
                        }

                        @Override
                        public String nextElement() {
                            hasMore = false;
                            return header;
                        }
                    };
                } else {
                    return super.getHeaders(name);
                }
            }
        };


        chain.doFilter(wrapper, response);
    }

}
