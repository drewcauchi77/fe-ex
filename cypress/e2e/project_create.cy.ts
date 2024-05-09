describe('Project Creation & Management', () => {
  describe('Can create a new project', () => {
    beforeEach(() => {
      cy.visit('/projects/create')
      cy.get('input[name="projectName"]').type('Coca-Cola Can Failures')
      cy.get('button.create-project').click()
      cy.contains('Connect Feed').should('be.visible')
      cy.get('button.play-button').click()
      cy.get('button.capture-frame').click()
      cy.get('button.capture-frame').click()
      cy.get('button.stop-feed').click()
    })

    afterEach(() => {
      cy.get('button.save-project').click()
      cy.url().should('include', '/projects')
    })

    it('Can capture frames', () => {
      cy.contains('Captured Frames').should('be.visible')
      cy.get('tr.frame-row').should('have.length', 2)
    })

    it('Can delete a captured frame', () => {
      cy.get('button.delete-frame').first().click()
      cy.get('tr.frame-row').should('have.length', 1)
    })

    it('Can enter tags for a captured frame', () => {
      cy.get('button.edit-frame').first().click()
      cy.get('div[role="dialog"]').should('be.visible')

      cy.get('input[name="frameTags"]').type('Minor dent{enter}')
      cy.get('input[name="frameTags"]').type('Bad lighting{enter}')
      cy.get('input[name="frameTags"]').type('Discoloured can{enter}')

      cy.get('button').contains('Dismiss').click()
      cy.get('.frame-tags').contains('span', 'Minor dent').should('be.visible')
      cy.get('.frame-tags').contains('span', 'Bad lighting').should('be.visible')
      cy.get('.frame-tags').contains('span', 'Discoloured can').should('be.visible')
    })
  })

  it('Cannot create a new project', () => {
    cy.visit('/projects/create')
    cy.get('button.create-project').should('be.disabled')
  })
})
