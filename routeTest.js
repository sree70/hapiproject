const server = require('./app.js'); // Import Server/Application
 

/*Pre Requisite Tasks*/
beforeAll((done) => {
    server.events.on('start', () => {
        done();
    });
});

/*Post Test Requisites*/
afterAll((done) => {
    server.events.on('stop', () => {
        done();
    });
    server.stop();
});

test('should success with server connection', async function () {
    const options = {
        method: 'GET',
        url: '/'
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
});

/*test('should success with server connection', async function () {
    const options = {
        method: 'GET',
        url: '/api/storeData'
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
});*/