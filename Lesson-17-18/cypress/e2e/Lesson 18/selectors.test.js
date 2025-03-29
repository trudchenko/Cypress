
   

describe('Selectors tests', () => {
  
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                 username: 'guest',
                 password: 'welcome2qauto'
            }
        })
    })

    it('First header button', () => {
        cy.contains('Guest log in')
          .not('.hidden')
          .should('exist');
    })

    it('Second header button', () => {
        cy.get('.header_signin')
          .should ('have.text', 'Sign In');
    })

    it('Social media buttons', () => {
        cy.get('span')
          .filter('.socials_icon')
          .should('have.length', 5);

        cy.get('span')
          .filter('.socials_icon').eq(0)
          .parent()
          .should('have.attr', 'href', 'https://www.facebook.com/Hillel.IT.School');
                  
        cy.get('a')
            .filter('.socials_link').eq(1)
            .children().eq(0)
            .should('have.class', 'icon-telegram');

        cy.get(`a[href='https://www.instagram.com/hillel_itschool/']`)
           .children()
           .should('have.class', 'icon-instagram');

        cy.get('a')
          .find('span')
          .should('have.length', 5);
        
        cy.get('a')
        .find('.icon-youtube')
        .should('be.visible');
    
        cy.get('span')
          .filter('.icon-linkedin')
          .closest('a')
          .should('have.attr', 'href', 'https://www.linkedin.com/school/ithillel/');

    }) 

    it('Headr tabs', () => {
       cy.get('a')
         .contains('Home')
         .should ('have.class', '-active');

        cy.get('button')
         .contains('About')
         .should ('not.have.class', '-active');
    
    })
    it('Other buttons', () => {
        cy.get('button')
          .filter('.hero-descriptor_btn')
          .should('exist')
          .should('have.text', 'Sign up');
    })
})

          
    