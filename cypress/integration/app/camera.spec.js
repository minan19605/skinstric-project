['/camera', '/camera/capture'].forEach((path) => {
  describe(`${path} page`, () => {
    const fakeServerData = {
      race: { asian: 0.72, white: 0.28 },
      age: { '28': 0.82, '35': 0.18 },
      gender: { female: 0.65, male: 0.35 },
    };

    const visitCameraPage = () => {
      cy.visit(path, {
        onBeforeLoad(win) {
          const track = { stop: cy.stub().as('stopTrack') };
          const fakeStream = {
            getTracks: () => [track],
          };

          Object.defineProperty(win.navigator, 'mediaDevices', {
            writable: true,
            value: {
              getUserMedia: cy.stub().resolves(fakeStream),
            },
          });

          Object.defineProperty(win.HTMLVideoElement.prototype, 'videoWidth', {
            configurable: true,
            get() {
              return 640;
            },
          });
          Object.defineProperty(win.HTMLVideoElement.prototype, 'videoHeight', {
            configurable: true,
            get() {
              return 480;
            },
          });
          win.HTMLCanvasElement.prototype.getContext = () => ({
            drawImage: () => {},
          });
          win.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/jpeg;base64,ZmFrZS1pbWFnZQ==';

          cy.stub(win, 'alert').as('alert');
          cy.stub(win, 'fetch')
            .as('uploadPhoto')
            .resolves({
              ok: true,
              json: () => Promise.resolve({ success: true, data: fakeServerData }),
            });
        },
      });
    };

    it('captures a preview and supports retaking the photo', () => {
      visitCameraPage();

      cy.contains('TAKE PICTURE').scrollIntoView().click({ force: true });
      cy.contains('GREATE SHOT!').should('be.visible');
      cy.get('img[alt="Preview"]').should('exist');

      cy.contains('Retake').click();
      cy.contains('TAKE PICTURE').should('be.visible');
    });

    it('uploads the captured image and moves to the selection step', () => {
      visitCameraPage();

      cy.contains('TAKE PICTURE').scrollIntoView().click({ force: true });
      cy.contains('Use This Photo').click({ force: true });

      cy.get('@uploadPhoto').should('have.been.calledOnce');
      cy.get('@uploadPhoto').then((stub) => {
        const [url, options] = stub.getCall(0).args;

        expect(url).to.eq('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo');
        expect(options.method).to.eq('POST');
        expect(JSON.parse(options.body)).to.deep.eq({ image: 'ZmFrZS1pbWFnZQ==' });
      });

      cy.get('@alert').should('have.been.calledWith', 'Image analyzed successfully!');
      cy.url().should('include', '/select');
    });
  });
});
