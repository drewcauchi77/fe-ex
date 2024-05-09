import type { Project } from '../../src/definitions/interfaces'

describe('Past Projects', () => {
  it('Can navigate to project creation page', () => {
    cy.visit('/projects')
    cy.get('a.create-project').click()
    cy.url().should('include', '/projects/create')
  })

  describe('Can handle actions on past projects', () => {
    beforeEach(() => {
      let loadedProjects: Project[] | null = null
      cy.fixture('projects.json').then((projects) => {
        loadedProjects = projects
      })
      cy.window().then((win) => {
        win.localStorage.setItem('projectList', JSON.stringify(loadedProjects))
      })
      cy.visit('/projects')
    })

    it('Can open a project', () => {
      cy.get('tr.project-row').should('have.length', 2)
      cy.get('tr.project-row').first().should('contain', 'Coca-Cola Can Failures')
      cy.get('tr.project-row').eq(1).should('contain', 'Broken Speculoos Biscuits')

      cy.get('button.open-project').first().click()
      cy.get('h1').contains('Project: Coca-Cola Can Failures')
    })

    it('Can delete a project', () => {
      cy.get('button.delete-project').first().click()
      cy.get('tr.project-row').should('have.length', 1)
      cy.get('tr.project-row').first().should('contain', 'Broken Speculoos Biscuits')
      cy.window().then((win) => {
        const projectListJSON: string | null = win.localStorage.getItem('projectList')
        const projectList: Project[] = projectListJSON ? JSON.parse(projectListJSON) : []
        expect(projectList).to.have.length(1)
      })
    })
  })
})
