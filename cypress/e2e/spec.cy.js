describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.fixture("data").then((data) => {
      data.forEach((h) => {
        cy.get('[name="selected-horoscope"]').select(h.horoscope);
        cy.get('[name="selected-horoscope-type"]').select(h.type);
        cy.get('[name="horoscope-text"]').type(h.text);
        cy.get("#download-btn").click();
      });
    });
  });
});
