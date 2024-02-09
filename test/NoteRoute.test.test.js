
const sinon = require('sinon');
const Note = require('../models/Note');
const noteController = require('../controllers/noteController');

// This is a sample Test for juniors to duplicate on other files
describe('Note Controller', () => {
  const req = { params: {}, body: {} };
  const res = {
    json: sinon.stub(),
    status: sinon.stub().returns({ json: sinon.stub() }),
  };

  afterEach(() => {
    sinon.restore();
  });


  describe('getNotesByUserId', () => {
    it('should get notes by user ID', async () => {
      req.params.userId = 'sampleUserId';

      const expectedNotes = [{ content: 'Note 1' }, { content: 'Note 2' }];
      sinon.stub(Note, 'find').resolves(expectedNotes);

      await noteController.getNotesByUserId(req, res);

      sinon.assert.calledWithExactly(Note.find, { userId: 'sampleUserId' });
      sinon.assert.calledWithExactly(res.json, expectedNotes);
    });

    it('should handle errors', async () => {
      req.params.userId = 'sampleUserId';
      sinon.stub(Note, 'find').rejects(new Error('Internal Server Error'));

      await noteController.getNotesByUserId(req, res);

      sinon.assert.calledWithExactly(res.status, 500);
    });
  });

  describe('getNotesByVideoId', () => {
    it('should get notes by video ID and user ID', async () => {
      req.params.videoId = 'sampleVideoId';
      req.params.userId = 'sampleUserId';

      const expectedNotes = [{ content: 'Note 1' }, { content: 'Note 2' }];
      sinon.stub(Note, 'find').resolves(expectedNotes);

      await noteController.getNotesByVideoId(req, res);

      sinon.assert.calledWithExactly(Note.find, { videoId: 'sampleVideoId', userId: 'sampleUserId' });
      sinon.assert.calledWithExactly(res.json, expectedNotes);
    });

    it('should handle errors', async () => {
      req.params.videoId = 'sampleVideoId';
      req.params.userId = 'sampleUserId';
      sinon.stub(Note, 'find').rejects(new Error('Internal Server Error'));

      await noteController.getNotesByVideoId(req, res);

      sinon.assert.calledWithExactly(res.status, 500);
    });
  });

  describe('getNotesByCourseId', () => {
    it('should get notes by course ID', async () => {
      req.params.courseId = 'sampleCourseId';

      const expectedNotes = [{ content: 'Note 1' }, { content: 'Note 2' }];
      sinon.stub(Note, 'find').resolves(expectedNotes);

      await noteController.getNotesByCourseId(req, res);

      sinon.assert.calledWithExactly(Note.find, { courseId: 'sampleCourseId' });
      sinon.assert.calledWithExactly(res.json, expectedNotes);
    });

    it('should handle errors', async () => {
      req.params.courseId = 'sampleCourseId';
      sinon.stub(Note, 'find').rejects(new Error('Internal Server Error'));

      await noteController.getNotesByCourseId(req, res);

      sinon.assert.calledWithExactly(res.status, 500);
    });
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      req.body = { userId: 'sampleUserId', videoId: 'sampleVideoId', courseId: 'sampleCourseId', content: 'New Note' };

      const expectedNote = { _id: 'sampleNoteId', ...req.body };
      sinon.stub(Note, 'create').resolves(expectedNote);

      await noteController.createNote(req, res);

      sinon.assert.calledWithExactly(Note.create, req.body);
      sinon.assert.calledWithExactly(res.json, expectedNote);
    });

    it('should handle errors', async () => {
      req.body = { userId: 'sampleUserId', videoId: 'sampleVideoId', courseId: 'sampleCourseId', content: 'New Note' };
      sinon.stub(Note, 'create').rejects(new Error('Internal Server Error'));

      await noteController.createNote(req, res);

      sinon.assert.calledWithExactly(res.status, 500);
    });
  });
});
