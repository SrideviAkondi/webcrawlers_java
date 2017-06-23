package osm.services;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/hello")
public class CrawlerService {
	
	@GET
	@Path("/{test}")
	public Response getMsg(@PathParam("test") String test) {

		String output = "Jersey say : " + test;

		return Response.status(200).entity(output).build();

	}
}
