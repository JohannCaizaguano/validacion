const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres.ujqowspcdlgysklffcar:Immorally2-Prancing0-Scam9-Treachery6-Keenness2@aws-1-us-east-2.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

console.log('Connecting...');

client.connect()
    .then(() => {
        console.log('Connected successfully!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Time:', res.rows[0]);
        client.end();
    })
    .catch(err => {
        console.error('Connection error:', err);
        client.end();
    });
