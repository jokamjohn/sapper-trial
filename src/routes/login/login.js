import token from './_login';

export async function post(req, res, next) {
    try {

        const { email, password } = req.body;

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })

        req.session.token = token;
        res.end(JSON.stringify({ token }));
    } catch (e) {
        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({error: e.message}))
    }
}