@fivvy
Feature: fivvy

  Background:
    * url fivvyURL
  Scenario: Log in with Google incorrect path
    Given path '/auths'
    When method Get
    Then status 404

  Scenario: Log in with Google incorrect method
    Given path '/auth'
    When method Post
    Then status 415

  Scenario: Log in with Google correct status method
    And path '/auth'
    When method Get
    Then status 200