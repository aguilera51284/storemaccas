import ky from 'ky-universal';
import {API_URL} from '@/lib/const';

const http = ky.create({
  prefixUrl: API_URL
});

export default http;
