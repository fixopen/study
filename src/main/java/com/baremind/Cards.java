package com.baremind;

import com.baremind.data.Card;
import com.baremind.utils.CharacterEncodingFilter;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

//import com.sun.jersey.core.header.FormDataContentDisposition;
//import com.sun.jersey.multipart.FormDataParam;

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
            final ClientConfig clientConfig = new ClientConfig();
            clientConfig.register(MultiPartFeature.class);
            Client client = ClientBuilder.newClient(clientConfig);
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
            JPAEntry.genericPost(card);
            result = Response.ok(card).build();
        }
        return result;
    }

    @GET //根据条件查询
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCards(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            result = Response.status(404).build();
            Map<String, Object> filterObject = CharacterEncodingFilter.getFilters(filter);
            List<Cards> cards = JPAEntry.getList(Cards.class, filterObject);
            if (!cards.isEmpty()) {
                result = Response.ok(new Gson().toJson(cards)).build();
            }
        }
        return result;
    }

    @GET //根据id查询
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCardById(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            result = Response.status(404).build();
            Card card = JPAEntry.getObject(Card.class, "id", id);
            if (card != null) {
                result = Response.ok(new Gson().toJson(card)).build();
            }
        }
        return result;
    }

    @PUT //根据id修改
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateCard(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Card card) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            result = Response.status(404).build();
            Card existcard = JPAEntry.getObject(Card.class, "id", id);
            if (existcard != null) {
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
                JPAEntry.genericPut(existcard);
                result = Response.ok(existcard).build();
            }
        }
        return result;
    }
}
