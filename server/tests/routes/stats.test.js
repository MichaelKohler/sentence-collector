import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import sentences from '../../lib/sentences';

const allStats = {
  'en': {
    added: 5,
    validated: 3,
  },
  total: 5,
  languages: 1,
};

const userStats = {
  'en': {
    total: 5,
    validated: 3,
  },
};

const userUnreviewedStats = {
  'en': 2,
};

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(sentences, 'getStats').resolves(allStats);
  t.context.sandbox.stub(sentences, 'getUserAddedSentencesPerLocale').resolves(userStats);
  t.context.sandbox.stub(sentences, 'getUnreviewedByYouCountForLocales').resolves(userUnreviewedStats);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get stats', async (t) => {
  const response = await request(app)
    .get('/stats?user=foo&locales=en,de');

  t.is(response.status, 200);
  t.deepEqual(response.body, {
    all: allStats,
    user: userStats,
    userUnreviewed: userUnreviewedStats,
  });
});

test.serial('should pass on error message', async (t) => {
  sentences.getUserAddedSentencesPerLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/stats?user=foo&locales=en,de');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});