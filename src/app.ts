import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import fjwt from "@fastify/jwt";
import { userSchemas } from "./modules/user/user.schema";

export const server = Fastify({
  logger: true,
});

server.register(fjwt, {
  secret: "1234567ihhdhfahf",
});

server.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get("/healthcheck", async function () {
  return { status: "okay" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  await server.listen({ port: 3000 }, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log("server running at http://localhost:3000");
    }
  });
}

main();
