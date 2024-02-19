import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches';
import { app } from '../app';
import { allMatches } from './mocks/matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', () => {
    it('deve retornar todas as partidas', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    
        const { status, body } = await chai.request(app).get('/matches');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(allMatches);
      });


});