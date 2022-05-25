import React from 'react'

const server = () => {
    const express = require('express');
    const next = require('next');

    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();
    const server = express();

    app.prepare()
        .then(() => {

            // Slug on url
            server.get('/post/:postId', (req: any, res: any) => {
                console.log(req.params.postId);
                return app.render(req, res, '/post', { postId: req.params.postId })
            });

            server.get('*', (req: any, res: any) => {
                return handle(req, res);
            });

            server.listen(3000, (err: any) => {
                if (err) console.log(err)
                console.log('> Ready on port 3000');
            })
        })
        .catch((err: any) => {
            console.log(err);
            process.exit();
        });

}

export default server