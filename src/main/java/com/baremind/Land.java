package com.baremind;

import javax.ws.rs.Path;

/**
 * Created by lenovo on 2016/8/18.
 */
@Path("land")
public class Land {
	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response land(){
		
	}
}
