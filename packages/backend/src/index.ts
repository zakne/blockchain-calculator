import 'dotenv/config';
import { Server } from './Server';

const HTTP_PROVIDER = process.env.HTTP_PROVIDER_URL || '';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
const PORT = parseInt(process.env.PORT || '5000');

new Server(HTTP_PROVIDER, CONTRACT_ADDRESS).start(PORT);