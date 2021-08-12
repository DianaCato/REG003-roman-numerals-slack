const request =require('supertest');
const {app,server} = require ('../src/index');

const api = request(app);
const data = {
  "name": "roman-numerals-slack",
  "version": "1.0.0"
  };

test ('request get in root returned as json', async () => {
    await api
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200)
});

test('request get in root returned name and version', async()=>{
    const response = await api.get('/');
    expect(response.body).toStrictEqual(data)
})

test('post request returned value in_channel for key response_type', async()=>{
    const response = await api
        .post('/')
        .send({'text': 'CI'})
        .expect(200)

    expect(response.body.response_type).toContain('in_channel')
})

test('post request returned XXX when send 30', async()=>{
    const response = await api
        .post('/')
        .send({'text': 30 })
        .expect(200)

    expect(response.body.text).toContain('XXX')
})

test('post request returned 1999 when send MCMXCIX', async()=>{
    const response = await api
        .post('/')
        .send({'text': 'MCMXCIX' })
        .expect(200)

    expect(response.body.text).toBe(1999)
})

afterAll(()=>{
    server.close()
});