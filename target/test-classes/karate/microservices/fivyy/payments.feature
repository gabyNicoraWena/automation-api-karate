@payment @smoke
Feature: Payment data

  Scenario: Create incorrect path
    Given url apiUrl2
    And path '/payment-datas/token/link/create?platform=android'
    When method Post
    Then status 403

  Scenario: Create token link incorrect method
    Given url apiUrl2
    And path '/payment-data/token/link/create?platform=android'
    When method Get
    Then status 404

  Scenario: Create token link incorrect params
    Given url apiUrl2
    And path '/payment-data/token/link/create?platform=androids'
    When method Get
    Then status 404

  Scenario: Create token link
    Given url apiUrl2
    And path '/payment-data/token/link/create?platform=android'
    When method Post
    Then status 404
