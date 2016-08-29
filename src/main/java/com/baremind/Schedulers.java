package com.baremind;

import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.baremind.data.Scheduler;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;



//GET /api/schedulers/this-week
//GET /api/schedulers/34
//GET /api/schedulers?filter={"week":34,"year":2014}

@Path("schedulers")
public class Schedulers {
	@GET//查询课表
	@Path("this-week")
	@Produces(MediaType.APPLICATION_JSON)
    public Response getThisWeekScheduler(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
    		Calendar cal = Calendar.getInstance();//创建一个日期实例
    		cal.setTime(new Date());//实例化一个日期
    		int year = cal.get(Calendar.YEAR);
    		int weekNo = cal.get(Calendar.WEEK_OF_YEAR);
    		
            Map<String, Object> filterObject = new HashMap<>(2);
            filterObject.put("year", year);
            filterObject.put("week", weekNo);
//            if (filter != "") {
//                String rawFilter = URLDecoder.decode(filter);
//                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
//                }.getType());
//            }
            List<Scheduler> schedulers = (List) JPAEntry.getList(Scheduler.class, filterObject);
            result = Response.ok(new Gson().toJson(schedulers)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
	}

	@GET//根据周查询课表
	@Path("{week}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getWeekScheduler(@CookieParam("sessionId") String sessionId, @PathParam("week") Integer week) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
    		Calendar cal = Calendar.getInstance();//创建一个日期实例
    		cal.setTime(new Date());//实例化一个日期
    		int year = cal.get(Calendar.YEAR);
            Map<String, Object> filterObject = new HashMap<>(2);
            filterObject.put("year", year);
            filterObject.put("week", week);
//            if (filter != "") {
//                String rawFilter = URLDecoder.decode(filter);
//                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
//                }.getType());
//            }
            List<Scheduler> schedulers = (List) JPAEntry.getList(Scheduler.class, filterObject);
            result = Response.ok(new Gson().toJson(schedulers)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
	}
/*	@GET//根据id查询课表
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getWeekScheduler(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = null;
            if (filter != "") {
                String rawFilter = URLDecoder.decode(filter);
                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
                }.getType());
            }
			List<Scheduler> schedulers =  JPAEntry.getList(Scheduler.class, filterObject);
			result = Response.ok(new Gson().toJson(schedulers)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}
	*/

	@POST//添加课表
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createScheduler(@CookieParam("sessionId") String sessionId, Scheduler scheduler) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
        	scheduler.setId(IdGenerator.getNewId());
            EntityManager em = JPAEntry.getEntityManager();
            em.getTransaction().begin();
            em.persist(scheduler);
            em.getTransaction().commit();
            result = Response.ok(scheduler).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
	}

	@PUT//修改课表
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateScheduler(@CookieParam("sessionId") String sessionId, @PathParam("id") Integer id, Scheduler scheduler) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Scheduler> schedulers = JPAEntry.getList(Scheduler.class, filterObject);
            if (schedulers.size() == 1) {
            	Scheduler existScheduler = schedulers.get(0);
            	
            	String description = scheduler.getDescription();
            	if(description!=null){
            		existScheduler.setDescription(description);
            	}
            	Integer duration = scheduler.getDuration();
            	if(duration!=null){
            		existScheduler.setDuration(duration);
            	}
            	
            	Date endTime = scheduler.getEndTime();
            	if(endTime!=null){
            		existScheduler.setEndTime(endTime);
            	}
            	
            	int grade = scheduler.getGrade();
            	if(grade!=0){
            		existScheduler.setGrade(grade);
            	}
            	
            	Date startTime = scheduler.getStartTime();
            	if(startTime!=null){
            		existScheduler.setStartTime(startTime);
            	}
            	
            	int state = scheduler.getState();
            	if(state!=0){
            		existScheduler.setState(state);
            	}
            	
            	int day = scheduler.getDay();
            	if(day!=0){
            		existScheduler.setDay(day);
            	}
            	
            	Long subjectId = scheduler.getSubjectId();
            	if(subjectId!=null){
            		existScheduler.setSubjectId(subjectId);
            	}
            	
            	
            	String teacher = scheduler.getTeacher();
            	if(teacher!=null){
            		existScheduler.setTeacher(teacher);
            	}
            	
            	String teacherDescription = scheduler.getTeacherDescription();
            	if(teacherDescription!=null){
            		existScheduler.setTeacherDescription(teacherDescription);
            	}
            	
            	String title = scheduler.getTitle();
            	if(title!=null){
            		existScheduler.setTitle(title);
            	}
            	
            	int week = scheduler.getWeek();
            	if(week!=0){
            		existScheduler.setWeek(week);
            	}
            	
            	int year = scheduler.getYear();
            	if(year!=0){
            		existScheduler.setYear(year);
            	}
            	
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existScheduler);
                em.getTransaction().commit();
                result = Response.ok(existScheduler).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
