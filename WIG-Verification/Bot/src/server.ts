import Fastify, {FastifyInstance, FastifyRequest} from 'fastify';
import Config from "./config";
import Student from "./models/Student";

export default class Server {
  private readonly server: FastifyInstance;

  constructor() {
    this.server = Fastify();

    this.server.post('/verify_user', async (request: FastifyRequest<{
        Body: {
            username: string;
        }
    }>, reply) => {
      const { username } = request.body;
      if(!username) return reply.status(400).send({ error: 'Bad Request' });

      const student = await Student.findOne({ minecraft_username: username.toLowerCase() });
      if (!student) return reply.status(404).send({ verified: false });

      return reply.status(200).send({ verified: student.verified });
    });
  }

  public async start(): Promise<void> {
    await this.server.listen({
        port: Config.PORT,
        host: '0.0.0.0'
    });
  }
}