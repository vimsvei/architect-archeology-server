import * as neo4j from 'neo4j-driver';
import config from '../config';

const host = 'bolt://' + config.neo4j.host + ':' + config.neo4j.port;

const auth = neo4j.v1.auth.basic(config.neo4j.username, config.neo4j.password);

export default neo4j.v1.driver(host, auth);
