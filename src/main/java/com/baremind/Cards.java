package com.baremind;

import com.baremind.data.Card;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("cards")
public class Cards {
    @POST //import
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Produces(MediaType.APPLICATION_JSON)
    public Response importCardsViaBareContent(@CookieParam("sessionId") String sessionId, byte[] contents) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            String uploadedFileLocation = "tempFilename.csv";
            writeToFile(contents, uploadedFileLocation);
            parseAndInsert(uploadedFileLocation);
            result = Response.status(200).build();
        }
        return result;
    }

    @POST //import
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response importCardsViaFormData(@CookieParam("sessionId") String sessionId, @FormDataParam("file") InputStream uploadedInputStream, @FormDataParam("file") FormDataContentDisposition fileDetail) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            String uploadedFileLocation = "d://uploaded/" + fileDetail.getFileName();
            writeToFile(uploadedInputStream, uploadedFileLocation);
            parseAndInsert(uploadedFileLocation);
            result = Response.status(200).build();
        }
        return result;
    }

    @POST //import
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Response importCardsViaText(@CookieParam("sessionId") String sessionId, byte[] contents) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            String uploadedFileLocation = "tempFilename.csv";
            writeToFile(contents, uploadedFileLocation);
            parseAndInsert(uploadedFileLocation);
            result = Response.status(200).build();
        }
        return result;
    }

    @POST //import
    @Consumes("text/csv")
    @Produces(MediaType.APPLICATION_JSON)
    public Response importCardsViaCsv(@CookieParam("sessionId") String sessionId, byte[] contents) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            String uploadedFileLocation = "tempFilename.csv";
            writeToFile(contents, uploadedFileLocation);
            parseAndInsert(uploadedFileLocation);
            result = Response.status(200).build();
        }
        return result;
    }

    // save uploaded file to new location
    private void writeToFile(byte[] data, String uploadedFileLocation) {
        try {
            OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
            out.write(data);
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // save uploaded file to new location
    private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation) {
        try {
            //OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
            while ((read = uploadedInputStream.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void parseAndInsert(String csvFilename) {
        try {
            EntityManager em = JPAEntry.getEntityManager();
            em.getTransaction().begin();
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(csvFilename)));
            String record;
            while ((record = br.readLine()) != null) {
                String[] fields = record.split(",");
                String command = "INSERT INTO cards (no, password) VALUES ('" + fields[0] + "', '" + fields[1] + "')";
                Query q = em.createNamedQuery(command);
                q.executeUpdate();
            }
            em.getTransaction().commit();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCards(@CookieParam("sessionId") String sessionId, Card card) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			card.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(card);
			em.getTransaction().commit();
			result = Response.ok(card).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@GET // 根据条件查询
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCards(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = null;
			if (filter != "") {
				String rawFilter = URLDecoder.decode(filter);
				filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
				}.getType());
			}
			List<Cards> cards = JPAEntry.getList(Cards.class, filterObject);
			result = Response.ok(new Gson().toJson(cards)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@GET // 根据条件查询
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCards(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Card> cards = JPAEntry.getList(Card.class, filterObject);
			result = Response.ok(new Gson().toJson(cards)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@PUT // 根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Card card) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Card> cards = JPAEntry.getList(Card.class, filterObject);
			if (cards.size() == 1) {
				Card existcard = cards.get(0);

				String duration = existcard.getDuration();
				if (duration != null) {
					existcard.setDuration(duration);
				}

				Date activeTime = existcard.getActiveTime();
				if (activeTime != null) {
					existcard.getActiveTime();
				}

				Date endTime = existcard.getEndTime();
				if (endTime != null) {
					existcard.setEndTime(endTime);
				}

				String no = existcard.getNo();
				if (no != null) {
					existcard.setNo(no);
				}

				String password = existcard.getPassword();
				if (password != null) {
					existcard.setPassword(password);
				}

				Long subject = existcard.getSubject();
				if (subject != null) {
					existcard.setSubject(subject);
				}

				Long userId = existcard.getUserId();
				if (userId != null) {
					existcard.setUserId(userId);
				}

				Double amount = existcard.getAmount();
				if (amount != null) {
					existcard.setAmount(amount);
				}
				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existcard);
				em.getTransaction().commit();
				result = Response.ok(existcard).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
