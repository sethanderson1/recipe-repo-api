const AuthService = require('../auth/auth-service');

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || '';
    // console.log('req.get(\'Authorization\')', req.get('Authorization'))
    // console.log('authToken', authToken)
    let bearerToken;

    if (!authToken.toLowerCase().startsWith('bearer')) {
        return res.status(401).json({ error: 'Missing bearer token' });
    } else {
        bearerToken = authToken.slice(7, authToken.length);
        console.log('bearerToken', bearerToken)

    }

    try {
        const payload = AuthService.verifyJwt(bearerToken);

        AuthService.getUserWithUsername(
            req.app.get('db'),
            payload.sub
        )
            .then(user => {
                if (!user)
                    return res.status(401).json({
                        error: 'Unauthorized request'
                    });
                req.user = user;
                next();
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    } catch (error) {
        console.log('Unauthorized request')
        res.status(401).json({ error: 'Unauthorized request' });
    }
}

module.exports = {
    requireAuth,
};