export default {
  app: {
    log: {
      level: process.env.APP_LOG_LEVEL
	}
  },
  api: {
	name: "Architect Archeology's REST API server",
	port: process.env.APP_PORT || 51081,
	path: ""
  },
  token: {
	secret: "secretapplication",
	expiresIn: "8h"
  },
  neo4j: {
	host: "192.168.99.100",
	port: "32768",
	database: "graph.db",
	username: "neo4j",
	password: "o441yk190RU$!"
  }
};
