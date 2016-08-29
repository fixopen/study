package com.baremind.utils;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import java.io.IOException;

public class CharacterEncodingFilter implements ContainerRequestFilter {
    @Context
    HttpServletRequest request;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        request.setCharacterEncoding("UTF-8");
    }
}
