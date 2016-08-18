package com.baremind;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("schedulers")
public class Schedulers {
	/*@GET//查询课表
	@Path("this-week")
	@Produces(MediaType.APPLICATION_JSON)
    public Response getThisWeekScheduler() {

	}*/

	@GET//根据周查询课表
	@Path("{week}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getWeekScheduler(@PathParam("week") Integer week) {
		return null;
	}

	/*@POST//添加课表
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createScheduler(Scheduler scheduler) {
		//
	}

	@PUT//修改课表
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateScheduler(Scheduler scheduler) {
		//
	}*/
}

