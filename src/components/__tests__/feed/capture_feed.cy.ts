import CaptureFeed from '../../feed/capture_feed.vue'

describe('components/feed/capture_feed.vue', () => {
  it('Can mount properly', () => {
    cy.mount(CaptureFeed)
    cy.get('video').should('exist')
    cy.get('.play-button').should('be.visible')
    cy.get('.stop-feed').should('be.disabled')
  })
})
