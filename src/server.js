import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const Filestore = new sessionFileStore(session);

export default polka() // You can also use Express
	.use(json())
	.use(session({
		secret: 'dfsdng3i9htw48fndubg3w04wr-32r2obf43g-qwrfdfvnberog',
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new Filestore({
			path: `.sessions`
		})
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				token: req.session.token
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
