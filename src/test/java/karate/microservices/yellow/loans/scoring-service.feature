@regression_yellow @scoring-service
Feature: Solicitar una evaluacion crediticia a clientes de BDS.

Background:
    * url scoringBaseUrl
    * def scoringPath = 'offers/internal'

Scenario: Crear una simulacion de scoring exitosa de un cliente
    Given path scoringPath
    And header Content-Type = 'application/json'
    And request 
    """
{
    "cuil": "20256655854"
}
    """ 
    And method post
    Then status 200
    And match response.status == 'APROBADA'

Scenario Outline: Crear una simulacion de scoring a cliente con evaluacion con status rechazada.
    Given path scoringPath
    And header Content-Type = 'application/json'
    And request 
    """
{
    "cuil": "<cuil>"
}
    """ 
    And method post
    Then status 200
    And match response.status == '<status>'
    And match response.messages[0].id == '<id>'
    And match response.messages[0].description == '<description>'

 Examples:
|     cuil    | status          |   id   | description |
| 20174351776 | RECHAZADA       | POD01  | POD01       |
| 27322940519 | RECHAZADA       | POC02  | POC02       |
| 20363600752 | REVISION MANUAL | REV01  | REV01       |

Scenario: Crear una simulacion de scoring a cliente con evaluacion activa
    Given path scoringPath
    And header Content-Type = 'application/json'
    And request 
    """
{
    "cuil": "20174351776"
}
    """ 
    And method post
    Then status 200

Scenario: Enviar una solicitud de scoring con problemas en el json body obtiendo bad request como respuesta
    Given path scoringPath
    And request 
    """
{
    "cui": "20174351776"
}
    """ 
    And method post
    Then status 400
    And match response.error == 'Bad Request'

Scenario: Enviar una solicitud de scoring con el cuil vacio y obtener obtener mensaje de error cuil should not be empty
    Given path scoringPath
    And request 
    """
{
    "cuil": ""
}
    """ 
    And method post
    Then status 400
    And match response.message[0] == 'cuil should not be empty'

Scenario Outline: Crear scoring desde BFF con resultado rechazado y aprobado
    * url bffmobileIntegration
    Given path 'api/auth/link-account-token'
    And header Content-Type = 'application/json'
    And header bds-device = '33333'
    And header bds-ip = '10.224.0.229'
    And header bds-device-model = 'model'
    And header bds-device-os = 'android'
    And request 
    """
{
  "deviceId": "33333",
  "email": "<email>",
  "appBundleId": "ar.com.bdsol.bds.squads.int"
}
    """
    When method post
    Then status 201
    * def actionToken = response.actionToken
    And path 'api/auth/link-account'
    And header Content-Type = 'application/json'
    And header bds-device = '33333'
    And header bds-ip = '10.224.0.229'
    And header bds-device-model = 'model'
    And header bds-device-os = 'android'
    And request 
    """
{
  "passcode": "192837",
  "actionToken": "#(actionToken)",
  "device": {
    "uid": "33333",
    "model": "model",
    "name": "name",
    "ipAddress": "10.224.0.229"
    }
}
    """
    When method post
    Then status 201
    * def offlineToken = response.offlineToken
    And path 'api/auth/sign-in'
    And header Content-Type = 'application/json'
    And header bds-device = '33333'
    And header bds-ip = '10.224.0.229'
    And header bds-device-model = 'model'
    And header bds-device-os = 'android'
    And request 
    """
{
    "offlineToken": "#(offlineToken)",
    "passcode": "192837",
    "email": "<email>",
    "deviceId": "33333"
}
    """
    When method post
    Then status 201
    * def accessToken = response.accessToken
    * url 'http://bff-mobile-int.bdsdigital.com.ar'
    Given path 'api/loan/scoring'
    And header Authorization = 'Bearer ' + accessToken
    And header bds-device = '33333'
    And header bds-ip = '10.224.0.229'
    And header Content-Type = 'application/json'
    And header bds-device-model = 'model'
    And header bds-device-os = 'android'
    And header Content-Length = '0'
    And method post
    Then status 200
    And match response[0].status == '<status>'
 Examples:
| email                           | status  |
|    bdsolqe3eab7ecb1b@gmail.com  | APROBADA |
|  bdsolqe0fd71c2@gmail.com       | RECHAZADA |