/**
 * @file Environment / Commonjs module
 * @module environment
 * @author GuoGuang <https://github.com/GuoGuang>
 */

const environment = process.env
const NODE_ENV = environment.NODE_ENV
const isDevMode = Object.is(NODE_ENV, 'development')
const isProdMode = Object.is(NODE_ENV, 'production')

const isStatic = process && process.static
const isServer = process && process.server
const isBrowser = process && process.browser
const isModern = process && process.modern

module.exports = {
  NODE_ENV,
  environment,
  isDevMode,
  isProdMode,
  isStatic,
  isServer,
  isBrowser,
  isModern
}
