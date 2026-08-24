const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Secure session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'lax',
        maxAge: 3600000 
    }
}));

// 1. Redirect User to Discord Login
app.get('/api/auth/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    req.session.oauthState = state;

    const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID.trim(),
        redirect_uri: process.env.DISCORD_REDIRECT_URI.trim(),
        response_type: 'code',
        scope: 'identify',
        state: state,
        prompt: 'consent'
    });

    res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
});

// 2. OAuth2 Callback Endpoint
app.get('/api/auth/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!state || state !== req.session.oauthState) {
        return res.status(403).send('Security check failed: Invalid state parameter (CSRF protection).');
    }

    delete req.session.oauthState;

    if (!code) {
        return res.status(400).send('Authorization code missing.');
    }

    try {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.DISCORD_REDIRECT_URI
            })
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return res.status(400).json({ error: 'Failed to retrieve access token', details: tokenData });
        }

        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${tokenData.token_type} ${tokenData.access_token}` }
        });

        const userData = await userResponse.json();

        req.session.user = {
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar
        };

        res.redirect('/profile.html');

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Internal server error during authentication.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ShadowCraft auth server running on http://localhost:${PORT}`);
});